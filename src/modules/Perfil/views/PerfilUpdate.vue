<template>
<div>
    <div class="d-flex justify-space-between d-flex align-center  mb-3">
        <goback />
        <div>
            <!-- Contenido extra -->
        </div>
    </div>
    <!-- ------------------- CONTENIDO PRINCIPAL ------------------------ -->
    <v-form ref="updateProfileForm" @submit.prevent="updateProfile($route.params.idUsuario)">
        <v-card outlined>
            <v-card-text>
                <v-subheader>
                    Datos personales
                </v-subheader>
                <div>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Paterno" outlined dense hide-details="auto" required v-model="usuario.paterno"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Materno" outlined dense hide-details="auto" required v-model="usuario.materno"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field label="Nombres *" outlined dense hide-details="auto" :rules="nombresRules" required v-model="usuario.nombres"> </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field label="Cargo *" outlined dense required hide-details="auto" :rules="cargoRules" v-model="usuario.cargo"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <v-text-field label="CI *" :rules="ciRules" outlined dense hide-details="auto" required v-model="usuario.ci"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <v-select outlined dense hide-details="auto" v-model="usuario.ci_ext" item-value="value" item-text="text" :items="options_ci" :rules="ciExtRules" label="Extension*" required></v-select>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field label="Celular *" outlined dense hide-details="auto" :rules="numeroRules" required v-model="usuario.celular"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field label="Telefono" outlined dense hide-details="auto" v-model="usuario.telefono"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field label="Correo*" outlined dense hide-details="auto" required :rules="correoRules" v-model="usuario.email"></v-text-field>
                        </v-col>
                        <!-- <v-col cols="12">
                        <v-text-field label="Direccion"    hide-details="auto" v-model="usuario.direccion" prepend-inner-icon="mdi-map-marker"></v-text-field>
                    </v-col> -->
                    </v-row>
                </div>
            </v-card-text>
            <v-card-actions>
                <small class="ml-3 red--text"> * Campo obligatorio</small>
                <v-spacer></v-spacer>
                <v-btn @click="cancelUpdatePerfil" text>
                    Cancelar
                </v-btn>
                <v-btn depressed :loading="loading" :disabled="loading" color="error" type="submit">
                    Actualizar
                </v-btn>
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
 import { 
    mapGetters
} from 'vuex'
import PerfilService from '../services/PerfilService'
import {
cargoRules,
rolesRules,
nombresRules,
ciRules,
ciExtRules,
numeroRules,
correoRules,
passwordRules,
} from '@/mixins/globalRules'
import {options_ci} from '@/mixins/globalVariables'
export default {
    data() {
        return {
            idUsuario: this.$route.params.idUsuario,
            show1: false,
            roles: [],
            usuario: {
                paterno: '',
                materno: '',
                nombres: '',
                ci: '',
                ci_ext: '',
                direccion: '',
                celular: '',
                telefono: '',
                email: '',
                password: '',
                cargo: '',
                roles: [],
            },
            options_ci:options_ci,
            cargoRules:cargoRules,
            rolesRules:rolesRules,
            nombresRules:nombresRules,
            ciRules:ciRules,
            ciExtRules:ciExtRules,
            numeroRules:numeroRules,
            correoRules: correoRules,
            passwordRules:passwordRules,
            snackbar: {
                show_snack: false,
                message_snack: '',
                color_snack: 'light',
                timeout_snack: 5000
            },
            loading: false
        }
    },
     mounted() {
        if (this.user) {
            this.usuario = {...this.user.data}
        } else {
            this.getProfile()
        }
    },
    mixins: [
        PerfilService,
    ],
    computed: {
        ...mapGetters({
            authenticated: "auth/authenticated",
        }),
        user() {
            return this.authenticated
        }
    }
}
</script>
