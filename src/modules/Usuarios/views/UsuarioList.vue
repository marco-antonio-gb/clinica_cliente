<template>
<div>
    <div class="mb-3 d-flex align-center">
        <h1>{{$route.meta.title}}</h1>
        <v-spacer></v-spacer>
        <v-btn icon @click="reloadUsuarios" title="Actualizar">
            <v-icon>mdi-autorenew</v-icon>
        </v-btn>
        <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>
            <v-list dense nav>
                <v-list-item link>
                    <v-list-item-title>Item menu A</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-title>Item menu A</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-title>Item menu A</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
    <v-card outlined>
        <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" dense label="Buscar..." outlined hide-details="true"></v-text-field>
            <v-spacer></v-spacer>
            <v-btn depressed color="error" @click="$router.push('/usuarios/create')">Crear usuario</v-btn>
        </v-card-title>
        <v-data-table v-model="selected" show-select item-key="idUsuario" :headers="headers" :items="usuarios" :search="search" :items-per-page="5" :sort-desc="true" :sort-by="['idUsuario']" :footer-props="{
           'items-per-page-text':'Items por pagina','show-first-last-page':true}" :loading="onLoading" loading-text="Cargando... Espere por favor">
            <v-progress-linear v-show="onLoading" slot="progress" color="error" indeterminate></v-progress-linear>
            <template v-slot:top>
                <v-toolbar dense outlined elevation="0" v-if="selected.length>0">
                    <div class="d-flex align-center pa-3 caption">
                        <span class=" mr-2"><strong>{{selected.length}}</strong> Seleccionados</span>
                        <v-tooltip bottom transition="none">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon v-bind="attrs" v-on="on">
                                    <v-icon>mdi-lock-check</v-icon>
                                </v-btn>
                            </template>
                            <span>Desactivar seleccionados</span>
                        </v-tooltip>
                        <!-- <v-btn icon class="mr-2">
                        <v-icon>mdi-format-align-right</v-icon>
                    </v-btn>
                    <v-btn icon class="mr-2">
                        <v-icon>mdi-format-align-justify</v-icon>
                    </v-btn> -->
                    </div>
                </v-toolbar>
                <!-- <v-divider></v-divider>             -->
            </template>
            <template v-slot:[`item.full_name`]="{item}">
                <v-list-item class="pa-0 table-list-item" :ripple="false" link @click="$router.push({ name: 'usuariosDetail', params: { idUsuario: item.idUsuario }})">
                    <v-list-item-avatar>
                        <v-avatar :color="item.settings.avatarColor" size="36">
                            <span class="white--text title font-weight-regular">{{item.settings.avatarLetter}}</span>
                        </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class=" font-weight-medium" v-html="item.full_name"></v-list-item-title>
                        <v-list-item-subtitle v-html="item.cargo"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>
            <template v-slot:[`item.celular`]="{ item }">
                <a href="javascript:void(0)" class="text-decoration-none" @click="sendWhatsapp(item.celular, 'Hola desdel el Campo Ferial 3 de Julio...')">
                    <v-icon small color="success">mdi-whatsapp</v-icon> {{item.celular}}
                </a>
            </template>
            <template v-slot:[`item.activo`]="{ item }">
                <v-chip :color="getColor(item.activo)" outlined small>
                    {{ getLabel(item.activo) }}
                </v-chip>
            </template>
            <template v-slot:[`item.roles`]="{ item }">
                <span v-for="rol in item.roles" :key="rol.id">
                    <v-chip class="mr-1" small outlined link @click="$router.push({path:'/roles/detail/'+rol.id})">
                        {{rol.name}}
                    </v-chip>
                </span>
            </template>
            <template v-slot:[`item.eventos`]="{ item }">
                <p class="mb-1" v-for="evento in item.eventos" :key="evento.id">
                    <router-link class="custom-link" :to="{name:'eventoDetail',params:{idEvento:evento.idEvento}}">
                        {{evento.nombre}}
                    </router-link>
                    <!-- <v-chip class="ma-1" small outlined link @click="$router.push({name:'eventoDetail',params:{idEvento:evento.idEvento}})">
                        {{evento.nombre}}
                    </v-chip> -->
                </p>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-menu bottom left min-width="150">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>
                    <v-list dense>
                        <v-list-item link @click="$router.push({path:'/usuarios/detail/'+item.idUsuario})" :disabled="!can('usuario-detail')">
                            <v-list-item-title>
                                <v-icon class="mr-2">mdi-eye</v-icon> Detalle
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item link @click="$router.push({path:'/usuarios/update/'+item.idUsuario})" :disabled="!can('usuario-update')">
                            <v-list-item-title>
                                <v-icon class="mr-2">mdi-pencil</v-icon> Editar
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item link @click="suspend(item)" :disabled="!can('suspend-account')">
                            <v-list-item-title>
                                <v-icon class="mr-2">mdi-lock</v-icon>
                                <span v-if="item.activo">Desactivar cuenta</span>
                                <span v-else>Activar cuenta</span>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>
        </v-data-table>
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
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
import UsuarioService from '../services/UsuarioService'
export default {
    name: 'lista-usuarios',
    data() {
        return {
            toggle_none: null,
            singleSelect: false,
            selected: [],
            onLoading: false,
            search: '',
            headers: [{
                    text: 'Usuario',
                    align: 'start',
                    value: 'full_name',
                },
                {
                    text: 'Celular',
                    value: 'celular'
                },
                {
                    text: 'Cuenta',
                    value: 'activo'
                },
                {
                    text: 'Roles',
                    value: 'roles'
                },
                {
                    text: 'Eventos asignados',
                    value: 'eventos'
                },
                {
                    value: 'actions',
                    sortable: false,
                    width: '10%',
                    align: 'end'
                },
            ],
            usuarios: [],
            snackbar: {
                show_snack: false,
                message_snack: "",
                color_snack: 'light',
                timeout_snack: 5000
            },
        }
    },
    created() {
        this.getUsuarios();
    },
    mounted() {},
    mixins: [
        UsuarioService
    ],
    components: {
        ConfirmDlg: () => import("@/components/partials/ConfirmDlg"),
    },
    methods: {
        reloadUsuarios() {
            this.usuarios = []
            this.getUsuarios()
        },
        ...mapActions({
            signOutAction: "auth/signOut",
            changTheme: "auth/setTheme"
        }),
    },
    watch: {
        onLoading(val) {
            if (!val) return
            setTimeout(() => (this.onLoading = false), 3000)
        },
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
