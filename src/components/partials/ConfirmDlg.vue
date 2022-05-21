<template>
<v-dialog v-model="dialog" :max-width="options.width" :style="{ zIndex: options.zIndex }" persistent>
    <v-card class="pb-3">
        <v-card-title>
            <span>
                {{ title }}
            </span>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="cancel">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>
        <v-card-text class="mb-2">
            <span v-show="!!message" v-html="message"></span>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-if="!options.noconfirm" text @click.native="cancel">Cancelar</v-btn>
            <v-btn depressed color="error" @click.native="agree" :disabled="onLoading" :loading="onLoading">Aceptar</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    name: "ConfirmDlg",
    data() {
        return {
            dialog: false,
            onLoading: false,
            resolve: null,
            reject: null,
            title: null,
            message: null,
            // message: '¿Esta seguro que quiere eliminar el registro?',
            // title: 'Confirmar',
            options: {
                color: "",
                width: 500,
                zIndex: 200,
                noconfirm: false,
            },
        };
    },
    methods: {
        open(title, message, options) {
            this.dialog = true;
            this.title = title;
            this.message = message;
            this.options = Object.assign(this.options, options);
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        },
        loading() {
            this.onLoading = false
            this.dialog = false;
            this.resolve(true);

        },
        agree() {
            this.onLoading = true
            this.resolve(true);
        },
        cancel() {
            this.resolve(false);
            this.dialog = false;
            this.onLoading = false
        },
    },
};
</script>
