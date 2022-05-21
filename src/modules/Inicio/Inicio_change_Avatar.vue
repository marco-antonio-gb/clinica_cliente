<template>
<div>
    <image-input v-model="avatar">
        <div slot="activator">
            <v-avatar size="250px" v-ripple v-if="!avatar" class="grey lighten-3 mb-3">
                <span>Click to add avatar</span>
            </v-avatar>
            <v-avatar size="250px" v-ripple v-else class="mb-3">
                <img :src="avatar.imageURL" alt="avatar" />
            </v-avatar>
        </div>
    </image-input>
    <v-slide-x-transition>
        <div v-if="avatar && saved == false">
            <v-btn class="primary" @click="uploadImage" :loading="saving">Save Avatar</v-btn>
        </div>
    </v-slide-x-transition>
</div>
</template>

<script>
import ImageInput from "./ImageInput.vue";
export default {
    name: "app",
    data() {
        return {
            avatar: null,
            saving: false,
            saved: false,
        };
    },
    components: {
        ImageInput: ImageInput,
    },
    watch: {
        avatar: {
            handler: function () {
                this.saved = false;
            },
            deep: true,
        },
    },
    methods: {
        uploadImage() {
            this.saving = true;
            setTimeout(() => this.savedAvatar(), 1000);
        },
        savedAvatar() {
            var url = URL.createObjectURL(this.avatar.imageURL);
            console.log(url);
            this.saving = false;
            this.saved = true;
        },
    },
};
</script>
