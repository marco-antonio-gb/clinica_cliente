<template>
<div>
    <div class="d-flex justify-space-between d-flex align-center  mb-3">
        <goback />
        <div>
            <!-- Contenido extra -->
        </div>
    </div>
    <!-- ------------------- CONTENIDO PRINCIPAL ------------------------ -->
    <v-form ref="createUsuarioForm" @submit.prevent="create">
        <v-card max-width="900" class="mx-auto mb-10">
            <v-card-text>
                <v-card outlined class="mb-6">
                    <v-card-title>Datos personales</v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" sm="4">
                                <v-text-field label="Paterno" outlined dense hide-details="auto" required v-model="usuario.paterno"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-text-field label="Materno" outlined dense hide-details="auto" required v-model="usuario.materno"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-text-field @blur="setAvatarLetter" label="Nombres *" outlined dense hide-details="auto" :rules="nombresRules" required v-model="usuario.nombres">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="3">
                                <v-text-field label="Cedula de Identidad *" outlined dense hide-details="auto" required v-model="usuario.ci" :rules="ciRules">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="3">
                                <v-row>
                                    <v-col v-if="new_ext">
                                        <v-text-field clearable @click:clear="new_ext = false" ref="newext" v-model="usuario.ci_ext" value="" dense outlined hide-details="auto" label="Nueva extencion" autofocus :rules="ciExtRules"></v-text-field>
                                    </v-col>
                                    <v-col v-else>
                                        <v-select outlined dense hide-details="auto" v-model="usuario.ci_ext" ref="extci" :rules="ciExtRules" item-value="value" item-text="text" :items="options_ci" label="Extension CI *" required @change="setExt"></v-select>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field label="Cargo *" outlined dense required hide-details="auto" :rules="cargoRules" v-model="usuario.cargo"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field label="Celular *" outlined dense hide-details="auto" :rules="celularRules" required v-model="usuario.celular"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field label="Telefono" outlined dense hide-details="auto" v-model="usuario.telefono"></v-text-field>
                            </v-col>
                            <!-- <v-col cols="12">
                                        <v-text-field label="Correo*" outlined dense hide-details="auto" required :rules="correoRules" v-model="usuario.email"></v-text-field>
                                    </v-col> -->
                            <!-- <v-col cols="12">
                        <v-text-field label="Direccion"    hide-details="auto" v-model="usuario.direccion" prepend-inner-icon="mdi-map-marker"></v-text-field>
                    </v-col> -->
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-card outlined>
                    <v-card-title>Seguridad</v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <div class="d-flex">
                                    <v-btn @click="copyEmail" icon>
                                        <v-icon dense color="grey lighten-1">mdi-content-copy</v-icon>
                                    </v-btn>

                                    <v-text-field @focus="generateUser" label="Correo  *" validate-on-blur outlined dense hide-details="auto" required :rules="correoRules" v-model="usuario.email"></v-text-field>
                                    <v-btn class="ml-3" @click="generateUser">Generar usuario</v-btn>
                                    <v-btn class="" @click="generateRandomUser" icon>
                                        <v-icon>mdi-autorenew</v-icon>
                                    </v-btn>
                                </div>
                                <!-- <v-btn @click="generateName">Generar  </v-btn> -->
                            </v-col>
                            <v-col cols="12">
                                <div class="d-flex">
                                    <v-btn @click="copyPassword" icon>
                                        <v-icon dense color="grey lighten-1">mdi-content-copy</v-icon>
                                    </v-btn>
                                    <v-text-field v-model="usuario.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show1 ? 'text' : 'password'" label="Contraseña" hint="Minimo 8 caracteres" counter @click:append="show1 = !show1" outlined dense></v-text-field>
                                    <v-btn class="ml-3" @click="openDialogPass">Generar contraseña</v-btn>
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <v-select :menu-props="{ closeOnContentClick: true }" v-model="usuario.roles" deletable-chips small-chips outlined clearable hide-details="auto" :rules="rolesRules" required :items="roles" item-text="name" item-value="id" label="Roles del usuario" multiple></v-select>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-switch v-model="switch_event" label="Asignar a evento"></v-switch>
                <v-card outlined v-if="switch_event">
                    <v-card-title>Asignar a evento</v-card-title>
                    <v-card-text>
                        <v-select :rules="eventRule" ref="autocomplete" :loading="onLoading" outlined v-model="usuario.evento_id" :items="eventos" item-text="nombre" item-value="idEvento" clearable label="Eventos"></v-select>
                        <!-- <v-text-field :rules="cargoRule" outlined dense v-model="usuario.cargo" label="Cargo"></v-text-field> -->
                        <v-textarea hide-details="auto" :rules="funcionesRule" rows="3" outlined dense v-model="usuario.funciones" label="Funciones"></v-textarea>
                    </v-card-text>
                </v-card>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="cancelarCreateUsuario" text>
                    Cancelar
                </v-btn>
                <v-btn :loading="onSave" :disabled="onSave" color="error" type="submit">
                    Registrar usuario
                </v-btn>
            </v-card-actions>
        </v-card>
        <PasswordGenerator :dialogPass.sync="dialogPass" @setNewPassword="setNewPassword" />
    </v-form>
    <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack">
        <pre class="snackText">{{ snackbar.message_snack }}</pre>
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
    options_ci
} from "@/mixins/globalVariables";
import {
    cargoRules,
    rolesRules,
    nombresRules,
    ciRules,
    ciExtRules,
    celularRules,
    correoRules,
    passwordRules,
} from "@/mixins/globalRules";
import UsuarioService from "../services/UsuarioService";
import RolesService from "@/modules/Roles/services/RolService";
export default {
    data() {
        return {
            switch_event: false,
            show1: false,
            roles: [],
            usuario: {
                paterno: "",
                materno: "",
                nombres: "",
                ci: "",
                ci_ext: "",
                direccion: "",
                celular: "",
                telefono: "",
                email: "",
                password: "",
                cargo: "",
                roles: [],
                permisos: [],
                settings: {
                    dark_theme: false,
                    avatarColor: "",
                    avatarLetter: "",
                    userName: ""

                },
                gestor_evento: false,
                evento_id: null,
                funciones: "",
                gestor_id: null,
            },
            cargoRules: cargoRules,
            rolesRules: rolesRules,
            nombresRules: nombresRules,
            ciRules: ciRules,
            ciExtRules: ciExtRules,
            celularRules: celularRules,
            correoRules: correoRules,
            passwordRules: passwordRules,
            options_ci: options_ci,
            snackbar: {
                show_snack: false,
                message_snack: "",
                color_snack: "light",
                timeout_snack: 5000,
            },
            onSave: false,
            new_ext: false,
            dialogPass: false,
            eventos: [],
            eventRule: [(v) => !!v || "Este campo es  obligatorio"],
            cargoRule: [(v) => !!v || "Este campo es  obligatorio"],
            funcionesRule: [(v) => !!v || "Este campo es  obligatorio"],
            options: {
                duration: 1000,
                offset: 0,
                easing: "easeInCubic",
            },
        };
    },
    mounted() {
        if (this.$route.query.evento_id) {
            (this.usuario.gestor_evento = true), (this.switch_event = true);
            this.usuario.evento_id = this.$route.query.evento_id;
        }
    },
    created() {
        this.getRoles();
      
    },
    components: {
        PasswordGenerator: () => import("../components/PasswordGenerator.vue"),
    },
    mixins: [UsuarioService, RolesService],
    methods: {
         
        setAvatarLetter(letter){
            this.usuario.settings.avatarColor=this.getcolorAvatar(letter.target.value);
            this.usuario.settings.avatarLetter=this.acronym(letter.target.value,1);
            this.usuario.settings.userName=letter.target.value;
        },
        copyEmail() {

            if (this.usuario.email.length === 0 || this.usuario.email === '') {
                this.showSnackbar("Ingrese un email para copiar", true, " ");

            } else {

                navigator.clipboard.writeText(this.usuario.email);
                this.showSnackbar("Email copiada al portapapeles ", true, " ");
            }
        },
        copyPassword() {
            if (this.usuario.password.length === 0 || this.usuario.password === '') {
                this.showSnackbar("Ingrese una Contraseña para copiar", true, " ");

            } else {

                navigator.clipboard.writeText(this.usuario.password);
                this.showSnackbar("Contraseña copiada al portapapeles ", true, " ");
            }
        },
        focusEvent($event) {
            $event.target.select();
            this.generateName();
        },
        async getEventos() {
            this.onLoading = true;
            let response = await this.axios.get("eventos");
            this.eventos = response.data.data;
            if (this.$route.query.evento_id) {
                this.$nextTick(() => {
                    this.usuario.evento_id = Number(this.$route.query.evento_id);
                });
                // this.$refs.autocomplete.value = this.$route.query.evento_id
            } else {
                this.$nextTick(() => {
                    this.$refs.autocomplete.isFocused = true;
                    this.$refs.autocomplete.isMenuActive = true;
                });
                this.$vuetify.goTo(9999, this.options);
            }
            this.onLoading = false;
        },
        setNewPassword(pass) {
            this.usuario.password = pass;
        },
        openDialogPass() {
            this.dialogPass = true;
        },
        setExt(e) {
            if (e === "otro") {
                this.new_ext = true;
            }
        },
    },
    watch: {
        new_ext(val) {
            if (val) {
                this.$nextTick(() => {
                    // this.$refs.newext.isFocused = true;
                    this.$refs.newext.isMenuActive = true;
                    this.usuario.ci_ext = "";
                });
            } else {
                this.usuario.ci_ext = "";
                this.$nextTick(() => {
                    // this.$refs.extci.isFocused = true;
                    this.$refs.extci.isMenuActive = true;
                });
            }
        },
        switch_event(value) {
            if (value) {
                this.getEventos();
                this.usuario.gestor_evento = true;
                this.usuario.gestor_id = this.$store.state.auth.user.data.idUsuario;
            } else {
                this.usuario.gestor_evento = false;
                this.usuario.evento_id = null;
                this.usuario.funciones = "";
                this.usuario.gestor = null;
            }
        },
    },
};
</script>
