<template>
<v-card outlined>
    <loader :onLoading="onLoading" />
    <v-card-title>
        <span class="overline">{{title}}</span>
    </v-card-title>
    <v-card-text class="text-center">
        <v-card outlined class="pa-2 mb-1">
            <v-img :src="imageDefault" alt="Logo Empresa" v-if="!imageUpload"></v-img>
            <cropper :src="imageUpload" ref="cropper" v-else />
        </v-card>
        <v-btn-toggle dense v-model="toggle_none">
            <v-tooltip bottom transition="none">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn @click="$refs.file.click()" v-bind="attrs" v-on="on">
                        <v-icon> mdi-camera-plus</v-icon>
                    </v-btn>
                </template>
                <span>Cargar imagen</span>
            </v-tooltip>
            <v-tooltip bottom transition="none">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn @click="crop" v-bind="attrs" v-on="on">
                        <v-icon>mdi-crop</v-icon>
                    </v-btn>
                </template>
                <span>Recortar</span>
            </v-tooltip>
            <v-tooltip bottom transition="none">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn @click="reset" v-bind="attrs" v-on="on">
                        <v-icon>mdi-reload</v-icon>
                    </v-btn>
                </template>
                <span>Reiniciar</span>
            </v-tooltip>
            <v-tooltip bottom transition="none">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" @click="uploadImage()" :loading="onLoading " :disabled="onLoading || !imageUpload" v-if="modeEdit==='update'">
                        <v-icon>mdi-content-save</v-icon>
                    </v-btn>
                </template>
                <span>Guardar</span>
            </v-tooltip>
        </v-btn-toggle>
        <input type="file" hidden ref="file" @change="loadImage($event)" accept="image/*">
    </v-card-text>
    <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack">
        <pre class="snackText">{{snackbar.message_snack}}</pre>
        <template v-slot:action="{ attrs }">
            <v-btn :color="snackbar.color_snack" text v-bind="attrs" @click="snackbar.show_snack = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
</v-card>
</template>

<script>
import {
    Cropper
} from 'vue-advanced-cropper'
export default {
    data() {
        return {
            toggle_none: null,
            imageDefault: require('@/assets/images/image_icon.svg'),
            imageUpload: null,
            imageResult: null,
            // path: process.env.VUE_APP_URL_MEDIA,
            onLoading: false,
            snackbar: {
                show_snack: false,
                message_snack: '',
                color_snack: 'light',
                timeout_snack: 3000
            },
            path: process.env.VUE_APP_URL_MEDIA + "/mobiliarios/",
        }
    },
    props: {
        currentImage: {
            default: null,
            required: true
        },
        modeEdit: {
            type: String,
            default: "",
            required: true
        },
        title: {
            type: String,
            default: "",
            required: true
        },
        idItem: {
            type: Number,
            default: 0,
            required: true
        },
        modelo: {
            type: String,
            default: "",
            required: true
        }
    },
    components: {
        Cropper
    },
    mixins: [],
    methods: {
        crop() {
            const {
                coordinates,
                canvas,
            } = this.$refs.cropper.getResult();
            this.coordinates = coordinates;
            this.imageUpload = canvas.toDataURL();
            this.showSnackbar(
                "Imagen recortada",
                true,
                ""
            );
            if (this.modeEdit === 'create') {
                const {
                    canvas
                } = this.$refs.cropper.getResult();
                canvas.toBlob((blob) => {
                    this.$emit('setImage', blob)
                }, "image/jpeg");
            } 
        },
        reset() {
            this.imageUpload = null;
        },

         
        loadImage(event) {
            var input = event.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.imageUpload = e.target.result;
                };
                reader.readAsDataURL(input.files[0]);
            }
        },
        updateParent() {
            
            this.$emit('updateParentForm');
        },
        uploadImage() {
            this.onLoading = true;
            const {
                canvas
            } = this.$refs.cropper.getResult();
            if (canvas) {
                // this.currentImage = canvas.toDataURL('image/jpeg');
                const form = new FormData();
                canvas.toBlob((blob) => {
                    form.append("image", blob);
                    form.append("idItem", this.idItem);
                    form.append("modelo", this.modelo);
                    this.axios
                        .post("/update-image", form)
                        .then(response => {
                            if (response.data.success) {
                                this.onLoading = false;
                                this.showSnackbar(
                                    response.data.message,
                                    true,
                                    "success"
                                );
                                setTimeout(() => {
                                    this.updateParent()
                                }, 600);
                            } else {
                                this.onLoading = false;
                                this.showSnackbar(
                                    response.data.validator,
                                    true,
                                    "error"
                                );
                            }
                        })
                        .catch(error => {
                            this.onLoading = false;
                            if (error.response) {
                                this.showSnackbar(
                                    error.response.data.message,
                                    true,
                                    "error"
                                );
                            } else if (error.request) {
                                this.showSnackbar(
                                    "No se puede conectar con el servidor",
                                    true,
                                    "error"
                                );
                            } else {
                                this.showSnackbar(error.message, true, "error");
                            }
                        });
                }, "image/jpeg");
            }
        },
    },
    watch: {
        modeEdit: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            handler(val) {
                if (val === "update") {
                    this.imageDefault = this.path + this.currentImage
                }
            }
        }
    }
}
</script>

<style>
</style>
