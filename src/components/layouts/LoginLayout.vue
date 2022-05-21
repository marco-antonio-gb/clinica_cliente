<template>
<v-app>
    <v-container class="grow d-flex flex-column flex-nowrap login-back">
        <v-layout align-center justify-center>
            <v-card min-width="360" class="mx-auto pa-8" :disabled="submitted">
                <!-- <v-card min-width="360" class="mx-auto pa-8" :disabled="submitted"   :flat="windowHeight>460?false:true" outlined> -->
                <loader :onLoading="submitted" :color="`primary`" />
                <v-row class="flex-column">
                    <v-col class="text-center">
                        <v-img src="@/assets/images/logos/logo_clinica_light.svg" contain max-width="60%" class="mx-auto" v-if="$vuetify.theme.dark"></v-img>
                        <v-img src="@/assets/images/logos/logo_clinica_dark.svg" contain max-width="60%" class="mx-auto" v-else></v-img>
                    </v-col>
                    <v-form @submit.prevent="handleSubmit" lazy-validation ref="form" class="px-4">
                        <v-col>
                            <v-text-field validate-on-blur v-model="form.email" :rules="emailRules" label="Correo electronico" required></v-text-field>
                            <v-text-field class="mb-6" validate-on-blur v-model="form.password" :rules="passRules" type="password" label="Contraseña" required></v-text-field>
                            <v-btn depressed color="primary"   block :disabled="
                    form.password.length === 0 ||
                      form.email.length === 0 ||
                      submitted
                  " type="submit">
                                <span v-if="submitted">
                                    Verificando...
                                </span>
                                <span v-else> Ingresar </span>
                            </v-btn>
                            <v-alert class="mt-3 mb-3" color="error" dense dismissible text v-if="error"><small>{{ error }}</small></v-alert>
                            <div class="mt-10  text-center grey--text small-text-lineheight">
                                <small>{{ app_name }} - Version {{ version }}</small>
                                <p class="pa-0 ma-0">
                                    <small>Copyright &copy;
                                        {{ new Date().getFullYear() }}
                                        {{ name }}.
                                    </small>
                                </p>
                            </div>
                        </v-col>
                    </v-form>
                    <div></div>
                </v-row>
            </v-card>
        </v-layout>
    </v-container>
    <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack">
        <pre class="snackText">{{ snackbar.message_snack }}</pre>
        <template v-slot:action="{ attrs }">
            <v-btn :color="snackbar.color_snack" text v-bind="attrs" @click="snackbar.show_snack = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
</v-app>
</template>

<script>
import {
    mapActions,
    mapGetters
} from "vuex";
export default {
    name: "Login",
    data() {
        const year = new Date().getFullYear();
        return {
            windowHeight: window.innerWidth,
            show_version: false,
            submitted: false,
            gestion: year,
            name: "Campo Ferial 3 de Julio",
            form: {
                email: "modem.ff@gmail.com",
                password: "modem.ff@gmail.com",
            },
            emailRules: [
                (v) => !!v || "Correo electronico obligatorio",
                // v => /.+@.+/.test(v) || 'El email debe ser válido'
                (v) => (v && v.length <= 50) || "Name must be less than 50 characters",
                (v) =>
                /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    v
                ) || "El email debe ser válido",
                // v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            passRules: [
                (v) => !!v || "Contraseña obligatoria",
                (v) => v.length >= 6 || "Ingrese al menos 6 caracteres",
            ],
            version: process.env.VUE_APP_VERSION,
            app_name: process.env.VUE_APP_TITLE,
            snackbar: {
                show_snack: false,
                message_snack: "",
                color_snack: "light",
                timeout_snack: 5000,
            },
        };
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener("resize", this.onResize);
        });
        if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            this.$vuetify.theme.dark = true;
        } else {
            this.$vuetify.theme.dark = false;
        }
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", (event) => {
                if (event.matches) {
                    this.$vuetify.theme.dark = true;
                } else {
                    this.$vuetify.theme.dark = false;
                }
            });
    },
    mixins: [],
    watch: {
        windowHeight(newHeight, oldHeight) {
            this.txt = `it changed to ${newHeight} from ${oldHeight}`;
        },
    },
    methods: {
        onResize() {
            this.windowHeight = window.innerWidth;
        },
        ...mapActions({
            signIn: "auth/signIn",
            attemp: "auth/attempt",
            seterror: "auth/errorAction",
            setroute: "auth/set_route",
        }),
        handleSubmit() {
            if (navigator.onLine) {
                if (this.$refs.form.validate()) {
                    this.submitted = true;
                    this.signIn(this.form)
                        .then((response) => {
                            if (response.data.success) {
                                this.attemp(response.data.access_token)
                                    .then(() => {
                                        // this.$router.replace({
                                        //     name: 'inicio'
                                        // })
                                        this.setroute();
                                    })
                                    .catch((error) => {
                                        this.seterror(error);
                                    });
                            } else {
                                this.seterror(response.data.message);
                            }
                            this.submitted = false;
                        })
                        .catch((err) => {
                            this.submitted = false;
                            if (err.response) {
                                this.seterror(err.response.data.error);
                            } else {
                                this.seterror("No se puede conectar al servidor");
                            }
                        });
                } else {
                    this.seterror("Complete los datos requeridos");
                }
            } else {
                this.seterror("No se puede conectar a Internet.");
            }
        },
    },
    computed: {
        ...mapGetters({
            error: "auth/error",
        }),
    },
};
</script>
