<template>
<v-container fill-height>
    <v-layout align-center justify-center>
        <v-card flat class="pa-5 text-center transparent" max-width="600">
            <div class="display-1 font-weight-bold ">
                <v-img src="@/assets/images/account_suspended.svg" width="400" class="mx-auto"></v-img>
                <h5 class="my-4">Contenido no disponible</h5>
            </div>
            <div class="mt-3 mb-4">
                <p>Lo sentimos, pero no posee los permisos necesarios para ver cierto contenido, por lo que el servidor está rechazando la solicitud.</p>
                <p>Verifique sus permisos con un administrador</p>
            </div>
            <v-btn large @click="$router.go(-1)">
                Volver a la pagina nterior
            </v-btn>
        </v-card>
    </v-layout>
</v-container>
</template>
<script>
 
export default {
    name: 'error-403',
    data() {
        return {
            loginRedirect: false
        }
    },
    mounted() {
        
    },
    methods: {
        
    }
}
</script>
