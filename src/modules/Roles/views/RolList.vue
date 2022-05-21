<template>
<div>
    <div class="mb-3 d-flex align-center">
       <h1 class="headline font-weight-bold">{{$route.meta.title}}</h1>

        <v-spacer></v-spacer>
        <v-btn depressed color="error" small @click="$router.push('/roles/create')">Nuevo  rol</v-btn>
    </div>
    <v-card outlined>
        <v-card-title class="pa-3">
            <v-text-field v-model="search" append-icon="mdi-magnify" color="dark" dense label="Buscar..." outlined hide-details="true"></v-text-field>
        </v-card-title>
        <v-card-text>
            <v-data-table :headers="headers" :items="roles" :search="search" :items-per-page="5" :footer-props="{'items-per-page-text':'Items por pagina',}" :loading="onLoading" loading-text="Cargando... Espere por favor">
                <v-progress-linear v-show="onLoading" slot="progress" color="error" indeterminate></v-progress-linear>
                <template v-slot:[`item.name`]="{item}">
                    <strong> {{item.name}}</strong>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon dense class="mr-3" @click="$router.push({path:'/roles/detail/'+item.id})">
                        mdi-eye
                    </v-icon>
                    <v-icon dense class="mr-3" @click="$router.push({path:'/roles/update/'+item.id})">
                        mdi-pencil
                    </v-icon>
                    <v-icon dense @click="delRol(item.id)">
                        mdi-delete
                    </v-icon>
                    <td></td>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack">
        <pre class="snackText">{{snackbar.message_snack}}</pre>
        <template v-slot:action="{ attrs }">
            <v-btn :color="snackbar.color_snack" text v-bind="attrs" @click="snackbar.show_snack = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>

    <ConfirmDlg ref="confirm" />
</div>
</template>

<script>
import moduleService from '@/mixins/modulesService'

import RolService from '../services/RolService'
export default {
    data() {
        return {
            onLoading: false,
            onLoadingPermiso: false,
            search: '',
            headers: [{
                    text: 'Rol',
                    align: 'start',
                    value: 'name',
                },
                {
                    text: 'Descripcion',
                    value: 'descripcion'
                },
                {
                    text: 'Opciones',
                    value: 'actions',
                    sortable: false,
                    width: '15%'
                },
            ],
            roles: [],
            permisos: [],
            dialogNewRol: false,
           snackbar: {
                show_snack: false,
                message_snack: '',
                color_snack: 'light',
                timeout_snack: 5000
            },
        }
    },
    created() {
        this.getRoles();
    },
    components: {
        ConfirmDlg: () => import("@/components/partials/ConfirmDlg"),
    },
    mixins: [
        RolService,
        moduleService
    ],
    methods: {

        async delRol(rol_id) {
            if (
                await this.$refs.confirm.open(
                    "Confirmar",
                    "Esta seguro que quiere eliminar este Rol?"
                )
            ) {
                this.deleteRol(rol_id);
            }
        },

    }
}
</script>
