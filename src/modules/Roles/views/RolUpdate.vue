<template>
<div>
    <loader :onLoading="onLoading" />

    <goback class="mb-3" />
    <v-form @submit.prevent="updateRol($route.params.idRol)" lazy-validation ref="updateRolForm">
        <v-card outlined>
            <v-card-text class="pb-0">
                <v-row>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="rol.name" :rules="nameRules" label="Nombre rol" hide-details="auto" outlined dense required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="9">
                        <v-text-field v-model="rol.descripcion" :rules="descRules" label="Descripcion del rol" hide-details="auto" outlined dense required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-combobox v-model="rol.permisos" :items="permisos" item-text="name" label="Permisos" outlined multiple :rules="permisoRules" clearable hide-details="auto" chips></v-combobox>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="$router.go(-1)" text color="grey darken-1">
                    Cancelar
                </v-btn>
                <v-btn depressed :loading="onLoading" :disabled="onLoading" color="error" type="submit">
                    Actualizar informacion
                </v-btn>
                <!-- <v-btn color="error" @click="handleSaveRol">
                    Guardar
                </v-btn> -->
            </v-card-actions>
        </v-card>
    </v-form>
   
   <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack">
        <pre class="snackText">{{snackbar.message_snack}}</pre>
        <template v-slot:action="{ attrs }">
            <v-btn :color="snackbar.color_snack" text v-bind="attrs" @click="snackbar.show_snack = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
</div>
</template>

<script>
import moduleService from '@/mixins/modulesService'

import RolServices from '../services/RolService'
export default {
    data() {
        return {
            onLoading: false,
            idRole: this.$route.params.idRol,
            permisos_select: [],
            permisos: [],
            onButton: false,
            rol: {
                name: '',
                guard_name: 'api',
                descripcion: '',
                permisos: []
            },
            nameRules: [
                v => !!v || 'Nombre es obligatorio',
                v => (v && v.length <= 20) || 'El nombre debe contener menos de 10 caracteres',
            ],
            descRules: [
                v => (v && v.length <= 200) || 'Descripcion es obligatorio',
            ],
            permisoRules: [v => !!v || "Debe asignar permisos al Rol."],
             snackbar: {
                show_snack: false,
                message_snack: '',
                color_snack: 'light',
                timeout_snack: 5000
            },
        }
    },
    mixins: [
        RolServices,
        moduleService
    ],
    mounted() {
        this.getPermisos()
        this.getRol()
    },
    methods: {
        async getRol() {
            try {
                let responseRol = await this.axios.get("/roles/" + this.$route.params.idRol);
                this.rol = responseRol.data.data
            } catch (error) {
                console.log(error)
                this.onLoading = false;
                if (error.response) {
                    this.showSnackbar(
                        error.response.data.message,
                        true,
                        "warning"
                    );
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
            }
        },

    }
}
</script>

<style>
</style>
