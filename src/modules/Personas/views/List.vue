<template>
<div>
    <div class="mb-3 d-flex align-center">
        <h1>{{$route.meta.title}}</h1>
        <v-spacer></v-spacer>
        <v-btn icon @click="reloadEmpresas">
            <v-icon>mdi-reload</v-icon>
        </v-btn>
        <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" :loading="onDownload">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>
            <v-list nav dense>
                <v-subheader>Exportat personas</v-subheader>
                <v-list-item link>
                    <v-list-item-title>
                        <v-icon class="mr-1">mdi-file-excel-outline</v-icon> Microsoft Excel (.xlsx)
                    </v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-title>
                        <v-icon class="mr-1">mdi-file-excel-outline</v-icon> Microsoft Excel (.cvs)
                    </v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-title>
                        <v-icon class="mr-1">mdi-file-excel-outline</v-icon> Microsoft Excel 97-2003 (.xls)
                    </v-list-item-title>
                </v-list-item>
                <!-- <v-subheader>Importar desde Excel</v-subheader>
                <v-list-item link @click="openDialogImport">
                    <v-list-item-title>
                        <v-icon class="mr-1">mdi-upload</v-icon> Importar personas
                    </v-list-item-title>
                </v-list-item> -->
                <v-subheader>Seleccionar columnas</v-subheader>
                <v-list-item link>
                    <v-list-item-title>
                        <v-icon class="mr-1">mdi-download</v-icon> Exportar columnas
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <!-- <v-spacer></v-spacer> -->
    </div>
    <v-card outlined>
        <v-card-title>
            <v-text-field clear-icon="mdi-close-circle" clearable v-model="search" @click:clear="search=''" append-icon="mdi-magnify" dense label="Buscar..." outlined hide-details="true"></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="$router.push('/personas/create')" depressed>Crear persona</v-btn>
            <!-- <v-btn color="primary" @click="openDialogCreate" depressed>Crear persona</v-btn> -->
        </v-card-title>
        <v-data-table :headers="headers" :items="personas" :search="search" :items-per-page="10" :footer-props="{
           'items-per-page-text':'Items por pagina','show-first-last-page':true}" :loading="onLoading" loading-text="Cargando... Espere por favor">
            <v-progress-linear v-show="onLoading" slot="progress" color="primary" indeterminate></v-progress-linear>
            <template v-slot:[`item.full_name`]="{ item }">
                <div class="d-flex flex-column ">
                    <router-link :to="{ name: 'personaDetail', params: { idPersona: item.idPersona }}" class="custom-link">
                        {{item.full_name}}
                    </router-link>
                </div>
            </template>
            <template v-slot:[`item.celular`]="{ item }">
                <a href="javascript:void(0)" class="text-decoration-none" @click="sendWhatsapp(item.celular, message_wasap)">{{item.celular}}</a>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-menu bottom left min-width="150">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on" :loading="onDownload">
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>
                    <v-list nav dense>
                        <v-list-item link @click="$router.push({path:'/personas/detail/'+item.idPersona})">
                            <v-list-item-title>
                                <v-icon dense class="mr-1">mdi-eye</v-icon> Detalle
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item link @click="$router.push({path:'/personas/update/'+item.idPersona})">
                            <v-list-item-title>
                                <v-icon dense class="mr-1">mdi-pencil</v-icon> Editar
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item link @click="delRecord(item.idPersona)">
                            <v-list-item-title>
                                <v-icon dense class="mr-1">mdi-delete</v-icon> Eliminar
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
import PersonaService from '../services/PersonaService'
export default {
    data() {
        return {
            onDownload: false,
            onLoading: false,
            snackbar: {
                show_snack: false,
                message_snack: "",
                color_snack: 'light',
                timeout_snack: 5000
            },
            personas: [],
            search: '',
            headers: [{
                    text: 'Nombre',
                    align: 'start',
                    value: 'full_name',
                },
                {
                    text: 'C.I.',
                    value: 'cedula'
                },
                // {
                //     text: 'Correo',
                //     value: 'correo'
                // },
                {
                    text: 'Correo ',
                    value: 'correo'
                },
                {
                    text: 'Celular',
                    value: 'celular'
                },
                {
                    value: 'actions',
                    sortable: false,
                    width: '15%',
                    align: 'end'
                },
            ],
        }
    },
    mounted() {
        this.getPersonas();
    },
    components: {
        ConfirmDlg: () => import("@/components/partials/ConfirmDlg"),
    },
    mixins: [
        PersonaService
    ],
    methods: {
        reloadEmpresas() {
            this.personas = []
            this.getPersonas()
        },
    }
}
</script>

<style>
</style>
