<template>
<div>
    <!-- ---- HEADER ------ -->
    <loader :onLoading="onLoading" />
    <div class="d-flex justify-space-between d-flex align-center   mb-3">
        <goback />
    </div>
    <!-- ---- END HEADER ------ -->
    <v-card flat max-width="900" class="mx-auto transparent">
        <v-card class="mb-3" outlined>
            <v-card-title>
                <span>General</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="$router.push({path:'/usuarios/update/'+$route.params.idUsuario})" :disabled="!can('usuario-update')">
                    <v-icon>mdi-pencil-outline</v-icon>
                </v-btn>
            </v-card-title>
            <v-list two-line>
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>
                            mdi-account
                        </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="headline">{{usuario.paterno}} {{usuario.materno}} {{usuario.nombres}}</v-list-item-title>
                        <v-list-item-subtitle>{{usuario.cargo}}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-icon>
                        <v-chip :color="usuario.activo?'success':'error'" small>
                            <span v-if="usuario.activo">Activado</span>
                            <span v-else>Desactivado</span>
                        </v-chip>
                    </v-list-item-icon>
                </v-list-item>
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>
                            mdi-card
                        </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{usuario.ci}} <span v-if="usuario.ci_ext"> - </span> {{usuario.ci_ext}}</v-list-item-title>
                        <v-list-item-subtitle>Cedula de Identidad</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>
                            mdi-phone
                        </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{usuario.celular}}</v-list-item-title>
                        <v-list-item-subtitle>Celular</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-icon>
                        <v-btn @click="sendWhatsapp( usuario.celular, 'Mensaje desde Campo ferial 3 de julio ')" icon>
                            <v-icon color="success">mdi-whatsapp</v-icon>
                        </v-btn>
                    </v-list-item-icon>
                </v-list-item>
                <v-list-item>
                    <v-list-item-action></v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{usuario.telefono}}</v-list-item-title>
                        <v-list-item-subtitle>Telefono</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>
                            mdi-email
                        </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{usuario.email}}</v-list-item-title>
                        <v-list-item-subtitle>Correo</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card>
        <v-card class="mb-3" outlined>
            <v-card-title>Roles</v-card-title>
            <v-card-text>
                <div v-for="rol in usuario.roles" :key="rol.id" class="ma-4">
                    <h3 class="text--primary mb-2">
                        {{rol.name}}
                    </h3>
                    <span> <span class="text--primary">Descripcion: </span> {{rol.descripcion}}</span>
                </div>
            </v-card-text>
        </v-card>
        <v-card class="mb-10" outlined>
            <v-card-title>Seguridad</v-card-title>
            <v-card-text>
                <v-row >
                    <v-col cols="4" >
                        <p>Cambiar contraseña</p>
                    </v-col>
                    <v-col cols="8">

                        <v-btn @click.prevent="passwordUpdate" :disabled="!can('change-password')">Cambiar  </v-btn>
                    </v-col>
                    <v-col cols="12">
                        <v-divider></v-divider>
                    </v-col>
                    <v-col cols="4" >
                        <p>Restablecer contraseña</p>
                    </v-col>
                    <v-col cols="8">
                        <p>Esta accion establecera una contraseña "aleatoria" compuesta de caracteres alfanumericos para una mayor seguridad, la cual se copiara al portapapeles.</p>
                        <v-btn @click.prevent="delRecord" :disabled="!can('reset-password')">Restablecer  </v-btn>
                    </v-col>
                    <v-col cols="12">
                        <v-divider></v-divider>
                    </v-col>
                    <v-col cols="4" >
                        <p>Activar/Desactivar cuenta</p>
                    </v-col>
                    <v-col cols="8">
                        <p v-if="usuario.activo">Esta accion denegara el acceso al usuario, toda la informacion generada por el usuario permanecera intacta.</p>
                        <p v-else>Esta accion permitira el acceso al usuario.</p>
                        <v-btn @click.prevent="suspend(usuario)" v-if="usuario.activo" color="error" :disabled="!can('suspend-account')">Desactivar cuenta</v-btn>
                        <v-btn @click.prevent="suspend(usuario)" v-else color="success" :disabled="!can('activate-account')">Activar cuenta</v-btn>
                    </v-col>
                </v-row>
                <div>
                </div>
            </v-card-text>
        </v-card>
    </v-card>
    <ConfirmDlg ref="confirm" />
    <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack">
        <pre class="snackText">{{snackbar.message_snack}}</pre>
        <template v-slot:action="{ attrs }">
            <v-btn :color="snackbar.color_snack" text v-bind="attrs" @click="snackbar.show_snack = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
    <updatePassword :dialogUpdatePass.sync="dialogUpdatePass" @clickUpdatePass="clickUpdatePass" :usuario_id="this.$route.params.idUsuario" />
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
import updatePassword from '../components/updatePassword.vue'
import UsuarioService from '../services/UsuarioService'
export default {
    data() {
        return {
            pass_data: " ",
            onblockUser: false,
            dialogUpdatePass: false,
            onLoading: false,
            toggle_exclusive: undefined,
            usuario: {
                paterno: '',
                materno: '',
                nombres: '',
                ci: '',
                ci_ext: '',
                telefono: '',
                celular: '',
                direccion: '',
                cargo: '',
                foto: '',
                email: '',
                activo: true
            },
            snackbar: {
                show_snack: false,
                message_snack: "",
                color_snack: 'light',
                timeout_snack: 5000
            },
        }
    },
    mounted() {
        this.show(this.$route.params.idUsuario)
    },
    mixins: [
        UsuarioService,
    ],
    methods: {
        ...mapActions({
            signOut: 'auth/signOut',
        }),
        getColor(estado) {
            if (estado === 0) return 'red'
            else if (estado === 1) return 'green'
            else return 'primary'
        },
        getLabel(estado) {
            if (estado === 1) return 'activa'
            else if (estado === 0) return 'suspendida'
            else return 'Error'
        },
        clickUpdatePass(data) {
            if (data.success) {
                this.signOut()
            }
        },
        passwordUpdate() {
            this.dialogUpdatePass = true
        },
        blockUser(data) {
            console.log(data)
        },
        copyToClipboard(value) {
            navigator.clipboard.writeText(value)
            this.showSnackbar("Contraseña copiado al portapapeles ",
                true,
                "success"
            );
        },
        resetPassword() {
            let user = {
                userId: this.$route.params.idUsuario
            };
            this.axios
                .post('/reset-password', user)
                .then(response => {
                    if (response.data.success) {
                        this.showSnackbar(
                            response.data.message,
                            true,
                            "success"
                        );
                        this.copyToClipboard(response.data.newPassword)
                    } else {
                        this.showSnackbar(
                            response.data.message,
                            true,
                            "error"
                        );
                    }
                })
                .catch(error => {
                    if (error.response) {
                        this.showSnackbar(
                            error.response.data.message,
                            true,
                            "error"
                        );
                    } else if (error.request) {
                        this.showSnackbar(
                            "No se puede conectar con el servidor",
                            true,
                            "error"
                        );
                    } else {
                        this.showSnackbar(error.message, true, "error");
                    }
                });
        },
        ...mapActions({
            signOutAction: "auth/signOut",
            changTheme: "auth/setTheme"
        }),
        async delRecord() {
            if (
                await this.$refs.confirm.open(
                    "Confirmación para restablecer contraseña",
                    "Esta acción generar una contraseña aleatoria. ¿Seguro que quieres continuar?"
                )
            ) {
                this.resetPassword();
            }
        },
    },
    components: {
        updatePassword,
        ConfirmDlg: () => import("@/components/partials/ConfirmDlg"),
    },
    computed: {
        ...mapGetters({
            authenticated: "auth/authenticated",
        }),
        loginData() {
            return this.authenticated.data
        }
    }
}
</script>
