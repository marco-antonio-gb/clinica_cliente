<template>
<div> 
    <v-card class="mx-auto text-center pa-2" max-width="300" flat>
        <loader :onLoading="onLoading" />
        <v-card-text style=" position: relative">
            <!-- <img :src="currentImage" alt="John" class="profile-pic" v-if="!imageUpload">
            <cropper stencil-component="circle-stencil" :src="imageUpload" ref="cropper" v-else />
            <v-btn absolute bottom small right fab @click="$refs.file.click()">
                <v-icon>mdi-camera</v-icon>
            </v-btn>
            <input type="file" hidden ref="file" @change="loadImage($event)" accept="image/*">
            <v-fab-transition>
                <v-btn color="primary" class="white--text" small :loading="onLoading" :disabled="onLoading" absolute bottom left fab @click="croopImage()" v-if="imageUpload">
                    <v-icon>mdi-image-size-select-large</v-icon>
                </v-btn>
            </v-fab-transition> -->
            <!-- <v-fab-transition>
                <v-btn color="primary" class="white--text" small :loading="onLoading" :disabled="onLoading" absolute bottom left fab @click="uploadImage()" v-if="imageUpload">
                    <v-icon>mdi-cloud-upload</v-icon>
                </v-btn>
            </v-fab-transition> -->
            <cropper stencil-component="circle-stencil" :src="imageUpload" ref="cropper" />
        </v-card-text>
    </v-card>
</div>
</template>
<script>
import {
    Cropper
} from 'vue-advanced-cropper'
export default {
    data: () => ({
        imageDefault: require('@/assets/images/logos/logo_empresa_default.svg'),
        imageUpload: null,
        path: process.env.VUE_APP_URL_MEDIA,
        onLoading: false,
        currentImage: '',
    }),
    components: {
        Cropper
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.currentImage = this.imageDefault
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
        croopImage() {
            const {
                canvas,
            } = this.$refs.cropper.getResult();
            if (canvas) {
                this.imageUpload = null
                this.currentImage = canvas.toDataURL('image/jpeg');
            }
        },
        uploadImage() {
            this.onLoading = true
            const {
                canvas
            } = this.$refs.cropper.getResult();
            if (canvas) {
                const form = new FormData();
                canvas.toBlob(blob => {
                    form.append('picture', blob);
                    this.axios.post('/image-upload', form)
                        .then((res) => {
                            this.onLoading = false
                            this.setImage(res.data.thumbnail)
                        })
                        .catch((error) => {
                            this.onLoading = false
                            console.log(error);
                        });
                }, 'image/jpeg');
            }
        },
        setImage(URL) {
            this.imageUpload = null
            this.currentImage = this.path + URL
        }
    },
};
</script>
