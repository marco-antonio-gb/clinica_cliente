<template>
<div>
    <loader :onLoading="onLoading" />
    <div class="d-flex justify-space-between d-flex align-center   mb-3">
        <goback />
        <div>
            <v-btn outlined text @click="$router.push({path:'/roles/update/'+$route.params.idRol})">
                <v-icon small class="mr-1">mdi-pencil</v-icon> Editar
            </v-btn>
        </div>
    </div> 
    <v-card class="mx-auto" outlined>
        <v-card-title  class="display-1">Rol: {{rol.name}} </v-card-title>
        <v-card-subtitle >{{rol.descripcion}}</v-card-subtitle>
        <v-card-text>
            <span>Lista de permisos</span>
            <v-card outlined >
                <v-card-text>
                    <v-chip class="ma-2" v-for="permiso in rol.permisos" :key="permiso.id">
                        {{permiso.name}}
                    </v-chip>
                </v-card-text>
            </v-card>
        </v-card-text>
    </v-card>
    
</div>
</template>
<script>
 
import RolService from '../services/RolService'
export default {
    data() {
        return {
            onLoading: false,
            rol: {
                name:'',
                descripcion:'',
                permisos:[]
            },
            snackbar: {
                show_snack: false,
                message_snack: '',
                color_snack: '',
            }
        }
    },
    created() {
        this.showRol(this.$route.params.idRol)
    },
    mixins:[
        RolService
    ]
}
</script>
<style>
</style>
