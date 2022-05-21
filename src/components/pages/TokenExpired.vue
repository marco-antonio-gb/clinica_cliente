<template>
<v-container fill-height>
    <v-layout align-center justify-center>
        <v-card flat class="pa-5 text-center transparent" max-width="600">
            <div class="display-1 font-weight-bold ">
            <v-img src="@/assets/images/undraw_season_change_f99v.svg" width="400" class="mx-auto"></v-img>
             <h4 class="my-6">La sesión ha expirado</h4>
            </div>
            <div class="mt-3 mb-4">
                <p>Su sesión ha caducado.  Vuelva a iniciar sesión</p>
            </div>
            <v-btn  large depressed color="error" @click="$router.go(-1)" v-if="loginRedirect">
                Volver a la pagina anterior...
            </v-btn>
            <v-btn   large  color=" " to="/login" v-else>
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
