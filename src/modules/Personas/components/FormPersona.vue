<template>
<v-form ref="formPersona" @submit.prevent="handleFormPersona">
    <v-card outlined>
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="4">
                   
                    <div class="text-center ">
                        <v-avatar size="250" class="avatar-shadow mb-2 ">
                            <v-img :src="finalImage?finalImage:imageDefault" alt="Fotografía"></v-img>
                        </v-avatar>
                    </div>
                    <div class="text-center   mb-6">
                        <v-tooltip bottom transition="none">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn fab small class="mx-2" v-bind="attrs" v-on="on" @click="cropImage" :disabled="!finalImage">
                                    <v-icon>mdi-crop</v-icon>
                                </v-btn>
                            </template>
                            <span>Recortar</span>
                        </v-tooltip>
                        <v-tooltip bottom transition="none">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn fab small class="mx-2" v-bind="attrs" v-on="on" @click="resetFinalImage" :disabled="!finalImage">
                                    <v-icon>mdi-trash-can-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Eliminar</span>
                        </v-tooltip>
                    </div>
                     
                            <v-file-input :disabled="onSave || record_enabled" dense @change="setImage" v-model="files" color="deep-purple accent-4" counter label="Seleccionar imagen..." placeholder="Cargar imagen" prepend-icon="mdi-paperclip" outlined :show-size="1000" accept="image/*" ref="inputImg">
                                <template v-slot:selection="{ index, text }">
                                    <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
                                        {{ text }}
                                    </v-chip>
                                    <span v-else-if="index === 2" class="text-overline grey--text text--darken-3 mx-2">
                                        +{{ files.length - 2 }} File(s)
                                    </span>
                                </template>
                            </v-file-input>
                    
                </v-col>
                <v-col cols="12" sm="8">
                    <v-row>
                        <v-col cols="12" sm="4">
                            <v-text-field label="Apellido Paterno" outlined dense   v-model="personaForm.paterno"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field label="Apellido Materno" outlined dense   v-model="personaForm.materno"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field label="Nombres *" outlined dense   required v-model="personaForm.nombres" :rules="nombresRules"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field label="C.I." outlined dense   v-model="personaForm.ci" @blur="VerificarCi('ci',personaForm.ci)" :loading="loadingCi" :error-messages="errorsCi"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-select outlined dense   v-model="personaForm.ci_ext" item-value="value" item-text="text" :items="options_ci" label="Extension CI" :menu-props="{ bottom: true, offsetY: true }" attach required></v-select>
                        </v-col>
                         <v-col cols="12" sm="4">
                            <v-select outlined dense   v-model="personaForm.estado_civil" item-value="value" item-text="text" :items="estado_civil_options" :menu-props="{ bottom: true, offsetY: true }" attach label="Estado civil *" required :rules="tipoPersonaRules"></v-select>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field label="Fecha de nacimiento" type="date" outlined dense   v-model="personaForm.fec_nac"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="5">
                            <v-text-field label="Correo " outlined dense   required v-model="personaForm.correo"></v-text-field>
                        </v-col>
                       
                        <v-col cols="12" sm="3">
                            <v-text-field label="Celular" outlined dense   v-model="personaForm.celular"></v-text-field>
                        </v-col>

                        

                        <v-col cols="12" >
                            <v-text-field label="Direccion " outlined dense   required v-model="personaForm.direccion"></v-text-field>
                        </v-col>
                    </v-row>

                    <!-- <SelectCompany @set-company="set_company" v-if="company===null"/> -->
                    <small>* Campos obligatorios</small>
                </v-col>
            </v-row>

        </v-card-text>
        <v-card-actions class="d-flex justify-end mt-2" flat>
            <v-btn @click="cancelarCreateContacto" text class="mr-2">
                Cancelar
            </v-btn>
            <v-btn depressed :loading="onSave" :disabled="onSave" color="primary" type="submit">
                Crear contacto
            </v-btn>
        </v-card-actions>
    </v-card>

    <CropImage :crop_dialog.sync="crop_dialog" :currentImage.sync="inputImage" @cropImageResult="cropImageResult" />

    <pre>{{personaForm}}</pre>
</v-form>
</template>

<script>
import {
    options_ci,
} from '@/mixins/globalVariables'
import {
    nombresRules,
    correoRules,
    tipoContactoRules,
    direccionRules,
    celularRules,
    cargoRules,
} from '@/mixins/globalRules'
export default {
    data() {
        return {
            personaForm: {
                 paterno: this.persona ?.paterno || "",
                materno: this.persona ?.materno || "",
                nombres: this.persona ?.nombres || "",
                ci: this.persona ?.ci || "",
                ci_ext: this.persona ?.ci_ext || "",
                direccion: this.persona ?.direccion || "",
                celular: this.persona ?.celular || "",
                estado_civil: this.persona ?.estado_civil || "",
                foto: this.persona ?.foto || "",
                correo: this.persona ?.correo || "",
                fec_nac: this.persona ?.fec_nac || "",
            },
            options_ci: options_ci,
            estado_civil_options: [{
                    text: "Soltero(a)",
                    value: "soltero(a)"
                },
                {
                    text: "Casado(a)",
                    value: "casado(a)"
                },
                {
                    text: "Divorciado(a)",
                    value: "divorciado(a)"
                },
                {
                    text: "Otro",
                    value: "otro"
                },
            ],
            /**VALIDATORS */
            nombresRules: nombresRules,
            correoRules: correoRules,
            tipoPersonaRules: tipoContactoRules,
            direccionRules: direccionRules,
            celularRules: celularRules,
            cargoRules: cargoRules,
            onButton: false,
            loadingCi: false,
            errorsCi: [],

            crop_dialog: false,
            finalImage: null,
            inputImage: null,
            files: [],
            imageDefault: require('@/assets/images/image_icon.svg'),
            imageUpload: null,
            record_enabled: false,
        }
    },
    props: {
        contact: {
            type: Object,
            default: null
        },
        empresaData: {
            type: Boolean,
            default: false
        },
        onSave: {
            type: Boolean,
            default: false
        },
        company: {
            type: Object,
            default: null
        }
    },
    created() {

    },
    components: {
        CropImage: () => import('../components/CropImage.vue')

    },
    methods: {
        async VerificarCi(column, value) {
            if (value) {
                if (column === 'ci') {
                    this.loadingCi = true
                    let check = await this.axios.post('/verificar-ci', {
                        column: column,
                        ci: value,
                        idPersona: null
                    })
                    if (check.data) {
                        this.errorsCi = check.data.success ? [] : ['El Numero de C.I. ya esta registrado']
                    }
                    this.loadingCi = false
                }
            }
        },
        set_company(data) {
            this.personaForm.empresa = data
        },
        handleFormPersona() {
            if (this.$refs.formPersona.validate()) {
                this.$emit('on-submit', this.personaForm);
            }
        },
        cancelarCreateContacto() {
            this.$router.go(-1);
        },
        async getTipos() {
            let response = await this.axios.get('tipo-contacto');
            this.tipo_contacto = response.data.data;
        },

        cropImage() {
            this.crop_dialog = true
            this.inputImage = this.finalImage
        },
        cropImageResult(imageResult) {
            this.finalImage = imageResult
            if (this.inputImage) {
                this.files = []
                this.$refs.inputImg.blur()
            }
        },
        resetFinalImage() {
            this.finalImage = null
        },
        setImage() {
            if (this.files) {
                var reader = new FileReader()
                reader.readAsDataURL(this.files)
                reader.onload = () => {
                    // console.log(reader.result);
                    this.inputImage = reader.result
                    this.crop_dialog = true
                };
            } else {
                this.inputImage = null
            }
        },

    },
    watch: {
        inputImage(value) {
            if (!value) {
                this.files = []
                this.$refs.inputImg.blur()
            }
        }
    }
}
</script>

<style>
</style>
