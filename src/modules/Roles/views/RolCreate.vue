<template>
<div>
    <goback class="mb-3"/>
    <v-card outlined>
        <!-- <v-card-title class="  font-weight-black"> {{$route.meta.title}}</v-card-title> -->
        <v-card-text class="pb-0">
            <v-form @submit.prevent="createRol" lazy-validation ref="createRolForm">
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="rol.name" :rules="nameRules" label="Nombre rol" hide-details="auto" outlined dense required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="8">
                        <v-text-field v-model="rol.descripcion" :rules="descRules" label="Descripcion del rol" hide-details="auto" outlined dense required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-select v-model="rol.permisos" item-value="name" :rules="permisoRules" item-text="name" :items="permisos" label="Permisos" multiple chips hide-details="auto" outlined hint="Seleccione los permisos para asignar a este rol" persistent-hint></v-select>
                    </v-col>
                </v-row>
                <!-- <v-divider></v-divider>
                        <v-btn @click="close()">
                            Cancelar
                        </v-btn>
                        <v-btn color="error" @click="saveRol">
                            Guardar
                        </v-btn> -->
            </v-form>
            <!-- <pre>{{permisos}}</pre> -->
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="$router.go(-1)" text>
                Cancelar
            </v-btn>
            <v-btn depressed :loading="loading" :disabled="loading" color="error" @click="createRol">
                Crear rol
            </v-btn>
            <!-- <v-btn color="error" @click="createRol">
                    Guardar
                </v-btn> -->
        </v-card-actions>
    </v-card>
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
            permisos_select: [],
            permisos: [],
            loading: false,
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
                v => !!v || 'Descripcion es obligatorio',
            ],
            permisoRules: [(v) => v.length > 0 || "Debe asignar permisos al Rol."],
            snackbar: {
                show_snack: false,
                message_snack: '',
                color_snack: 'light',
                timeout_snack: 5000
            },
        }
    },
    mixins:[
      RolServices,
      moduleService
    ],
    created() {
        this.getPermisos()
    },
}
</script>
<style>
</style>
