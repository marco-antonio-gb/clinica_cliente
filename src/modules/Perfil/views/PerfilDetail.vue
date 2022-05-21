<template>
<div class="mb-8">
    <!-- ---- HEADER ------ -->
    <loader :onLoading="onLoading" />
    <div class="d-flex justify-space-between d-flex align-center   mb-3">
        <goback />
        <div>
            <v-btn icon @click="$router.push({name:'perfilUpdate',params:{idUsuario: user.data.idUsuario}})">
                <v-icon class="mr-1">mdi-pencil</v-icon>
            </v-btn>
        </div>
    </div>
   <v-card max-width="900" class="mx-auto" flat>
        <!-- ---- END HEADER ------ -->
    <p class="overline text--secondary pa-1 mb-1">Informacion general</p>
    <v-card class="mb-4" outlined>
        <v-card-text class="pb-0">
            <span class="headline text--primary">{{usuario.paterno}} {{usuario.materno}} {{usuario.nombres}}
            </span>
            <p>Cargo: {{usuario.cargo}}</p>
            <v-row>
                <v-col cols="12" sm="4">
                    <span class="caption">Cedula de Identidad</span>
                    <p class="text--primary">{{usuario.ci}} <span v-if="usuario.ci_ext"> - </span> {{usuario.ci_ext}}</p>
                </v-col>
                <v-col cols="12" sm="4">
                    <span class="caption">Correo electronico</span>
                    <p class="text--primary">{{usuario.email}}</p>
                </v-col>
                <v-col cols="12" sm="4">
                    <span class="caption">Telefono/Celular</span>
                    <p class="text--primary">{{usuario.telefono}} <span v-if="usuario.celular"> / </span> {{usuario.celular}}</p>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
    <p class="overline text--secondary pa-1 mb-1">Roles y permisos</p>
    <v-card class="mb-4" outlined>
        <v-card-text>
            <div v-for="rol in usuario.roles" :key="rol.id" class="mb-4">
                <p class="text-h6">
                    Rol: {{rol}}
                </p>
                <!-- <span class="text--primary">Permisos: </span> 
                <div class="py-3">
                    <v-chip small v-for="permiso in usuario.permisos" :key="permiso.id" class="ma-1"> {{permiso}}</v-chip>
                </div> -->
            </div>
        </v-card-text>
    </v-card>
    <p class="overline text--secondary pa-1 mb-1">Informacion de acceso</p>
    <v-card outlined>
        <v-card-text>
            <v-row class="d-flex  align-center">
                <v-col cols="12" sm="3">
                    <span class="caption">Estado</span> <br>
                    <v-chip :color="getColor(usuario.activo)" text-color="white" small>
                        Cuenta {{ getLabel(usuario.activo) }}
                    </v-chip>
                </v-col>
                <v-col cols="12" sm="3">
                    <span class="caption">Correo electronico</span>
                    <p class="text--primary">{{usuario.email}}</p>
                </v-col>
                <v-col cols="12" sm="6" class="text-right">
                    <v-btn-toggle dense>
                        <v-btn outlined text @click.prevent="passwordUpdate">cambiar Contraseña</v-btn>
                    </v-btn-toggle>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
   </v-card>
    <ConfirmDlg ref="confirm" />
    <v-dialog v-model="alertPass" width="200" persistent>
        <v-card>
            <v-card-text class="text-center pa-3">
                <span class="text--secondary"> {{pass_data}}</span>
            </v-card-text>
        </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack">
        <pre class="snackText">{{snackbar.message_snack}}</pre>
        <template v-slot:action="{ attrs }">
            <v-btn :color="snackbar.color_snack" text v-bind="attrs" @click="snackbar.show_snack = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
    <updatePassword :dialogUpdatePass.sync="dialogUpdatePass" @clickUpdatePass="clickUpdatePass" :usuario_id="idUsuario" />
</div>
</template>
<script>
import {
    mapGetters
} from 'vuex'
import updatePassword from '@/modules/Usuarios/components/updatePassword.vue'
export default {
    data() {
        return {
            pass_data: "",
            onblockUser: false,
            dialogUpdatePass: false,
            idUsuario: this.$route.params.idUsuario,
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
                activo: 0
            },
            snackbar: {
                show_snack: false,
                message_snack: "",
                color_snack: 'light',
                timeout_snack: 5000
            },
            alertPass: false
        }
    },
    mounted() {
        if (this.user) {
            this.usuario = {
                ...this.user.data
            }
        } else {
            this.$router.go(-1)
        }
    },
    methods: {
        getColor(estado) {
            if (estado === 0) return 'red'
            else if (estado === 1) return 'green'
            else return 'primary'
        },
        getLabel(estado) {
            if (estado === 1) return 'Activo'
            else if (estado === 0) return 'suspendida'
            else return 'Error'
        },
        clickUpdatePass(data) {
            console.log(data)
        },
        passwordUpdate() {
            this.dialogUpdatePass = true
        },
        blockUser(data) {
            console.log(data)
        },
        resetPassword() {
            let user = {
                userId: this.$route.params.idUsuario
            };
            this.axios
                .post('/reset-password', user)
                .then(response => {
                    if (response.data.success) {
                        this.alertPass = true
                        this.showSnackbar(
                            response.data.message,
                            true,
                            "success"
                        );
                        this.pass_data = response.data.newPassword
                        setTimeout(() => {
                            this.alertPass = false
                        }, 3000)
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
        blockUserAccount() {
            let user = {
                userId: this.$route.params.idUsuario,
                status: this.usuario.activo
            };
            this.axios
                .post('/suspend-account', user)
                .then(response => {
                    if (response.data.success) {
                        this.showSnackbar(
                            response.data.message,
                            true,
                            "success"
                        );
                        this.getProfile()
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
        async delRecord() {
            if (
                await this.$refs.confirm.open(
                    "¿Restablecer contrasena ?",
                    "Esta seguro que desea reestablecer la contrasena?"
                )
            ) {
                this.resetPassword();
            }
        },
        async suspend() {
            let title = "¿Suspender cuenta?"
            let message = "Esta seguro que desea bloquear la cuenta del usuario?"
            if (this.usuario.activo === 0) {
                message = "Esta seguro que desea Activar la cuenta"
                title = "¿Activar cuenta?"
            }
            if (
                await this.$refs.confirm.open(
                    title,
                    message
                )
            ) {
                this.blockUserAccount();
            }
        },
        async getProfile() {
            try {
                this.onLoading = true
                let response = await this.axios.post("auth/me");
                this.usuario = response.data.data;
                this.onLoading = false
            } catch (error) {
                console.log(error);
            }
        }
    },
    components: {
        updatePassword,
        ConfirmDlg: () => import("@/components/partials/ConfirmDlg"),
    },
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
