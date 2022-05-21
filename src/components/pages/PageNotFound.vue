<template>
<v-container fill-height>
    <v-layout align-center justify-center>
        <v-card flat class="pa-5 text-center transparent" max-width="600">
            <div class="display-1 font-weight-bold">
                <v-img src="@/assets/images/undraw_page_not_found_re_e9o6.svg" width="400" class="mx-auto"></v-img>
                <h4 class="my-4">Página no encontrada...</h4>
            </div>
            <div class="mt-3 mb-4">
                <p>La página que busca no existe,
                        por favor verifique la direccion e intente nuevamente. </p>
            </div>
            <v-btn large  @click="$router.go(-1)">
                Volver a la pagina anterior...
            </v-btn>
        </v-card>
    </v-layout>
</v-container>
</template>

<script>
export default {
    name: 'error-403'
}
</script>
