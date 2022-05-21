<template>
<div class="pa-5">
    <v-row no-gutters>
        <v-col cols="12" sm="6" md="6">
            <v-card class="pa-2" outlined>
                <div class="mx-auto text-center">
                    <img src="@/assets/images/logos/logo_empresa_default.svg" alt="John" class="profile-pic" v-if="!imagen.onFileChange">
                    <div class="center mb-2" v-else>
                        <figure class="img-fluid  image-cropper">
                            <img alt="Miniatura" :src="imagen.onFileChange" class="profile-pic">
                        </figure>
                    </div>
                    <img v-bind:src="imagePreview" width="100" height="100" v-show="showPreview" />

                    <form @submit.prevent="saveCredencial" enctype="multipart/form-data">
                        <input type="text" name="input" v-model="imagen.texto">
                        <input name="imagen" type="file" ref="fileupload" @change="obtenerImagen" />

                        <div class="btn-group" role="group" aria-label="Basic example" v-if="imagen.onFileChange">
                            <v-btn depressed color="primary" @click.prevent="EditarImegn()"> Editar
                            </v-btn>

                        </div>
                        <v-btn type="submit">GUARDAR</v-btn>
                    </form>
                </div>
            </v-card>
        </v-col>
    </v-row>
    <form @submit.prevent="submitForm">
        <div class="form-group">
            <label for="title">Post Title</label>
            <input type="text" name="title" class="form-control" id="title" placeholder="Enter Post Title" v-model="formFields.title">
        </div>

        <div class="form-group">
            <label for="description">Post Description</label>
            <textarea name="description" class="form-control" v-model="formFields.description"></textarea>
        </div>

        <div class="form-group">
            <label for="description">Picture</label>
            <input type="file" name="picture" class="form-control-file" id="picture" @change="onFileChange">
        </div>

        <div class="form-group">
            <input type="submit" class="btn btn-success" />
        </div>
    </form>

    <v-dialog v-model="dialog" persistent max-width="360">
        <v-card>
            <cropper class="cropper" :src="img" :stencil-props="{aspectRatio: 1}" ref="cropper" />
            <v-btn color="primary" @click.prevent="crop()">Recortar imagen</v-btn>
        </v-card>
    </v-dialog>
    <pre>{{imagen}}</pre>
    <hr>
    <pre>{{formFields}}</pre>
</div>
</template>

<script>
import {
    Cropper
} from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
export default {
    data() {
        return {
            imagePreview: null,
            showPreview: false,
            formFields: {
                title: null,
                description: null,
                picture: null
            },
            hidden: false,
            dialog: false,
            avatarImage: null,
            imagen: {
                texto: 'asssssssssssssssssssssssssssss',
                onFileChange: null
            },
            imagePreviewURL: null,
            imageCanvas: true,
            onSpinner: false,
            img: null,
            immageUniversal: null,
            editTools: false,
            video: {},
            canvas: {},
            captures: [],
            imagenMiniatura: false,
            crop_image: false,
        }
    },
    methods: {
        onFileChange(event) {
            /*
    Set the local file variable to what the user has selected.
    */
            this.formFields.picture = event.target.files[0];

            /*
            Initialize a File Reader object
            */
            let reader = new FileReader();

            /*
            Add an event listener to the reader that when the file
            has been loaded, we flag the show preview as true and set the
            image to be what was read from the reader.
            */
            reader.addEventListener("load", function () {
                this.showPreview = true;
                this.imagePreview = reader.result;
            }.bind(this), false);

            /*
            Check to see if the file is not empty.
            */
            if (this.formFields.picture) {
                /*
                    Ensure the file is an image file.
                */
                if (/\.(jpe?g|png|gif)$/i.test(this.formFields.picture.name)) {

                    console.log("here");
                    /*
                    Fire the readAsDataURL method which will read the file in and
                    upon completion fire a 'load' event which we will listen to and
                    display the image in the preview.
                    */
                    reader.readAsDataURL(this.formFields.picture);
                }
            }
        },
        submitForm() {
            let formData = new FormData();

            formData.append("picture", this.formFields.picture);
            formData.append("title", this.formFields.title);
            formData.append("description", this.formFields.description);

            this.axios.post('/image-upload', formData)
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        crop() {
            // this.$refs.modal_cropper.hide()
            this.dialog = false
            this.crop_image = false
            const {
                coordinates,
                canvas,
            } = this.$refs.cropper.getResult();
            this.coordinates = coordinates;
            // this.imagenMiniatura = canvas.toDataURL();
            this.imagen.onFileChange = canvas.toDataURL('image/jpeg');
            this.img = null
        },
        // obtenerImagen(file) {
        //     const {
        //         maxSize
        //     } = this
        //     if (file) {
        //         let size = file / maxSize / maxSize
        //         if (!file.type.match('image.*')) {
        //             console.log("Please choose an image file")
        //         } else if (size > 1) {
        //             console.log("Your file is too big, Please select an image under 1MB")
        //         } else {
        //             let formData = new FormData()
        //             formData.append(file.name, file)
        //             this.imagePreviewURL = URL.createObjectURL(file);
        //             URL.revokeObjectURL(file); 
        //             this.cargarImagen(file)
        //         }
        //     } else {
        //         this.imagen.onFileChange = null
        //     }
        // },
        // cargarImagen(file) {
        //     this.imageCanvas = false;
        //     this.imagenMiniatura = true;
        //     this.iconos = false;
        //     let reader = new FileReader();
        //     reader.onload = (e) => {

        //         this.imagen.onFileChange = e.target.result;
        //     }
        //     this.crop_image = true
        //     this.editTools = true
        //     reader.readAsDataURL(file)
        // },
        obtenerImagen(e) {
            let file = e.target.files[0];
            this.imagen.onFileChange = file;
            this.cargarImagen(file)
        },
        cargarImagen(file) {
            this.imageCanvas = false;
            let reader = new FileReader();
            reader.onload = (e) => {
                this.imagen.onFileChange = e.target.result;
            }
            reader.readAsDataURL(file)
        },
        reset() {
            this.img = null;
        },
        EditarImegn() {
            this.dialog = true
            this.img = this.imagen.onFileChange;
        },
        EditarCancelar() {
            // this.iconos = false
            // this.imagenMiniatura = false;
            this.imagen.onFileChange = null;
            // this.$refs.fileupload.value=null
            this.clear()
        },
        clear() {
            this.$nextTick(() => {
                const input = this.$refs.fileupload;
                // input.type = 'text';
                input.type = 'file';
            })
        },
        saveCredencial() {
            if (this.imagen.onFileChange == null) {
                console.log("Selecciona una imagen o Fotografia")
            } else {

                let formData = new FormData();
                formData.append('imagen', this.imagen.onFileChange);
                formData.append('texto', this.imagen.texto);
                console.log(formData)
                this.axios.post('/image-upload', formData)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(errors => {
                        console.log(errors)
                    });
            }
        },
    },
    components: {
        Cropper
    },
}
</script>

<style>
.profile-pic {
    vertical-align: middle;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #f9f9f9;
}

.camera-size {
    width: 80%;
    height: auto;
    /* border: 3px solid #ff003d; */
    border-radius: 15px;
}

.camera-size img {
    width: 100%;
    height: auto;
}

.center {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.content-video {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.cropper {
    height: 500px;
}
</style>
