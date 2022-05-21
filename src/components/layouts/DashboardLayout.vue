<template>
<v-app id="inspire">
    <v-navigation-drawer  dark v-model="drawer" app>
        <template v-slot:prepend>
            <v-list-item>
                <v-list-item-avatar tile class="mr-2">
                    <img src="@/assets/images/logos/ic_clinica.svg" />
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="title font-weight-bold " > {{app_name}} </v-list-item-title>
                    <v-list-item-subtitle class="caption font-weight-regular">Version {{version}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </template>
        <!-- <v-divider></v-divider> -->
        <Sidebar></Sidebar>
    </v-navigation-drawer>
    <v-app-bar  flat app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <span v-if="authenticated">{{ usuario.data.settings.userName }}</span>
        <v-menu :nudge-width="250" max-width="245" offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-avatar :color="usuario.data.settings.avatarColor" size="36" v-if="authenticated">
                        <span class="white--text title font-weight-regular">{{usuario.data.settings.avatarLetter}}</span>
                    </v-avatar>
                </v-btn>
            </template>
            <v-card v-if="authenticated">
                <v-list nav dense>
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-avatar :color="usuario.data.settings.avatarColor">
                                <span class="white--text headline font-weight-regular">{{usuario.data.settings.avatarLetter}}</span>
                            </v-avatar>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title class="body-2  text-wrap">{{ usuario.data.full_name }}</v-list-item-title>
                            <v-list-item-subtitle :title="usuario.data.cargo" class="caption font-weight-regular text-wrap">{{ usuario.data.cargo }}</v-list-item-subtitle>

                        </v-list-item-content>
                    </v-list-item>
                    <v-divider class="my-1"></v-divider>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-cog-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Roles</v-list-item-title>
                            <v-list-item-subtitle class="caption">
                                <span v-for="(rol) in usuario.data.roles" :key="rol.id">
                                    <span class="  mr-1">{{rol}}</span>
                                </span>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider class="my-1"></v-divider>
                    <v-list-item link @click="$router.push({ name: 'perfil' }).catch(err => {})">
                        <v-list-item-icon>
                            <v-icon>mdi-cog</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Configuracion</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-moon-waning-crescent</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Tema oscuro</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-switch dense hide-details v-model="colorTheme"></v-switch>
                        </v-list-item-action>
                    </v-list-item>
                    <v-divider class="my-1"></v-divider>
                    <v-list-item link @click="signOut()">
                        <v-list-item-icon>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Cerrar sesion </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>
    </v-app-bar>
    <v-main>
        <v-container fluid>
            <router-view :key="$route.fullPath"></router-view>
        </v-container>
    </v-main>
    <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack">
        {{snackbar.message_snack}} 
    </v-snackbar>
</v-app>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";
import Sidebar from "../partials/sidebar";
export default {
    data() {
        return {
            AvatarLetter: "",
            avatarClass: "",
            initial: "",
            email: "",
            nombres: "",
            cargo: "",
            drawer: null,
            pageName: this.$route.name,
            selectedItem: 0,
            switch1: true,
            app_name: process.env.VUE_APP_TITLE,
            version: process.env.VUE_APP_VERSION,
            snackbar: {
                show_snack: false,
                message_snack: '',
                color_snack: 'light',
                timeout_snack: 3000
            },
        };
    },
    created() {
        // this.countDownTimer()
    },
    components: {
        Sidebar,
    },
    methods: {
        ...mapActions({
            signOutAction: "auth/signOut",
            changTheme: "auth/setTheme"
        }),
        signOut() {
            this.signOutAction()

        },
    },
    computed: {
        ...mapGetters({
            authenticated: "auth/authenticated",
            usuario: "auth/user",
            currentTheme: "auth/theme",
        }),
        colorAvatar() {
            return this.usuario ? this.getcolorAvatar(this.usuario.data.full_name) : ''
        },
        colorTheme: {
            get() {
                return this.currentTheme
            },
            set(value) {
                this.changTheme(value) 
            }
        }
    },
};
</script>
