<template>
<div>
    <v-dialog v-model="show" max-width="460" persistent>
        
        <v-card>
            <v-card-title class="  grey lighten-2">
                Nuevo Rol
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-form @submit.prevent="handleSaveRol" lazy-validation ref="form">
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="rol.name" :rules="nameRules" label="Nombre" required></v-text-field>
                            </v-col>

                            <v-col cols="12" md="8">
                                <v-text-field v-model="rol.descripcion" :rules="descRules" label="Descripcion" required></v-text-field>
                            </v-col>
                        </v-row>
                        <!-- <v-divider></v-divider>
                        <v-btn @click="close()">
                            Cancelar
                        </v-btn>
                        <v-btn color="error" @click="saveRol">
                            Guardar
                        </v-btn> -->
                    </v-form>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click.prevent="close">
                    Cancelar
                </v-btn>
                <v-btn   :loading="loading" :disabled="loading" color="error" @click="handleSaveRol">
                    Accept Terms
                </v-btn>
                <!-- <v-btn color="error" @click="handleSaveRol">
                    Guardar
                </v-btn> -->
            </v-card-actions>
            
        </v-card>

    </v-dialog>
    <v-snackbar v-model="snackbar">
        <span v-if="message">{{message}}</span>
        <span v-for="txt in text" :key="txt" v-else>
            {{txt}} <br>
        </span>

        <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
</div>
</template>

<script>
export default {
    props: {
        visible: {
            required: true,
            default: false
        }
    },
    data() {
        return {
            loading:false,
            
            rol: {
                name: '',
                guard_name: 'api',
                descripcion: ''
            },
            nameRules: [
                v => !!v || 'Nombre es obligatorio',
                v => (v && v.length <= 20) || 'El nombre debe contener menos de 10 caracteres',
            ],

            descRules: [
                v => !!v || 'Descripcion es obligatorio',
            ],
            snackbar: false,
            text: '',
            message: ''
        }
    },
    methods: {
        close() {
            
                this.show = false
             
        },
        handleSaveRol() {
            if (this.$refs.form.validate()) {
                this.loading=true
                this.$axios.post("/roles", this.rol)
                    .then(response => {
                        if (response.data.success) {
                            this.clearRol()
                            this.loading=false
                            this.dialog = false
                            this.snackbar = true
                            this.message = response.data.message
                            this.$emit('fahter_event');
                            
                        } else {
                            this.loading=false
                            this.snackbar = true
                            this.text = response.data.validator
                        }
                    })
                    .catch(errors => {
                        this.loading=false
                        this.snackbar = true
                        this.text = errors
                    });
            }

        },
        clearRol(){
            this.$refs.form.reset()
        }
    },
    computed:{
        show:{
           get(){
               return this.visible
           },
           set(value){
               if(!value){
             
                   this.$emit('fahter_event');
               }
           }
        }
    }
    
}
</script>

<style>
</style>
