<template>
<v-container fill-height>
    <v-layout align-center justify-center>
        <v-card flat class="pa-5 text-center transparent" max-width="600">
            <div class="display-1 font-weight-bold ">
                <v-img src="@/assets/images/unauthorizedEvent.svg"    width="100%"  contain class="mx-auto"></v-img>
                <h5 class="my-4">Evento no autorizado...</h5>
            </div>
            <div class="mt-3 mb-4">
                <p>Lo sentimos, usted no esta asignado a este evento, comuniquese con un administrador para ser asignado a este evento.</p>
            </div>
            <v-btn @click="$router.go(-1)" v-if="loginRedirect">
                Volver a la pagina anterior...
            </v-btn>
            <v-btn large to="/login" v-else>
                Iniciar sesion
            </v-btn>
        </v-card>
    </v-layout>
</v-container>
</template>
<script>
import store from "@/store";
export default {
    name: 'error-403',
    data() {
        return {
            loginRedirect: false
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            var logIn = store.getters["auth/authenticated"];
            if (logIn) {
                this.loginRedirect = true
            } else {
                this.loginRedirect = false
            }
        }
    }
}
</script>
