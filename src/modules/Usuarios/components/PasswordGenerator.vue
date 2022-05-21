<template>
<v-dialog v-model="dialogPass" max-width="500" persistent>
    <v-card>
        <v-card-title>Generador de contraseñas</v-card-title>
        <v-card-text>
            <div class="d-flex align-center my-4">
                <v-card flat tile width="100%">
                    <v-progress-linear absolute :value="progress" :color="color" height="5"></v-progress-linear>
                    <v-text-field ref="passInput" hide-details="auto" v-model="password" outlined>
                    </v-text-field>
                </v-card>
                <div class="d-flex">
                    <v-btn icon class="mx-1" @click="copyPassword">
                        <v-icon>mdi-content-copy</v-icon>
                    </v-btn>
                    <v-btn icon class="mr-1" @click="generate()">
                        <v-icon>mdi-autorenew</v-icon>
                    </v-btn>
                </div>
            </div>
            <v-expansion-panels accordion focusable>
                <v-expansion-panel>
                    <v-expansion-panel-header>
                        Opciones avanzadas
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-row class="mt-3">
                            <v-col cols="12">
                                <v-slider :label="`Longitud   ` +length_pass " @input="generate" v-model="length_pass" class="align-center" :max="max" :min="min" hide-details>
                                </v-slider>
                            </v-col>
                            <v-col>
                                <span>Caracteres alfa:</span>
                                <v-radio-group dense @change="changeAlpha" v-model="value_alpha">
                                    <v-radio label="Ambos (aBcD)" value="mixed_alpha"></v-radio>
                                    <v-radio label="Minúsculas (abc)" value="lowercase"></v-radio>
                                    <v-radio label="Mayúsculas (ABC)" value="uppercase"></v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col>
                                <span>No hay caracteres alfa::</span>
                                <v-radio-group dense @change="changeMomoAlpha" v-model="value_mono">
                                    <v-radio label="Ambos (1@3$)" value="mixed_nonalpha"></v-radio>
                                    <v-radio label="Números (123)" value="numbers"></v-radio>
                                    <v-radio label="Símbolos (@#$)" value="symbols"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
            <v-checkbox v-model="have_copy" label="He copiado esta contraseña en un lugar seguro."></v-checkbox>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="closeDialogPass">Cancelar</v-btn>
            <v-btn color="primary" :disabled="!have_copy" @click="savePassword">Usar contraseña</v-btn>
        </v-card-actions>
    </v-card>
    <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack" elevation="2">
        <pre class="snackText">{{snackbar.message_snack}}</pre>
        <template v-slot:action="{ attrs }">
            <v-btn :color="snackbar.color_snack" text v-bind="attrs" @click="snackbar.show_snack = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
</v-dialog>
</template>

<script>
export default {
    data() {
        return {
            min: 8,
            max: 20,
            length_pass: 16,
            have_copy: false,
            password: '',
            characters: "a-z,A-Z,0-9,#",
            value_mono: 'mixed_nonalpha',
            value_alpha: 'mixed_alpha',
            mono_val: "0-9,#",
            alpha_val: "a-z,A-Z",
            snackbar: {
                show_snack: false,
                message_snack: '',
                color_snack: 'light',
                timeout_snack: 4000
            },
        }
    },
    props: {
        dialogPass: {
            default: false
        }
    },
    mounted() {
        this.value_mono = 'mixed_nonalpha';
        this.value_alpha = 'mixed_alpha';
    },
    methods: {
        savePassword() {
            this.$emit('setNewPassword', this.password)
            this.$emit('update:dialogPass', false)
        },
        changeAlpha(value) {
            switch (value) {
                case "mixed_alpha":
                    this.alpha_val = 'a-z,A-Z';
                    break;
                case "lowercase":
                    this.alpha_val = 'a-z';
                    break;
                case "uppercase":
                    this.alpha_val = 'A-Z';
                    break;
                default:
                    this.alpha_val = 'a-z,A-Z';
                    break;
            }
            this.updateCharacters()
        },
        changeMomoAlpha(value) {
            switch (value) {
                case "mixed_nonalpha":
                    this.mono_val = '0-9,#';
                    break;
                case "numbers":
                    this.mono_val = '0-9';
                    break;
                case "symbols":
                    this.mono_val = '#';
                    break;
                default:
                    this.mono_val = '0-9,#';
                    break;
            }
            this.updateCharacters()
        },
        updateCharacters() {
            this.characters = this.alpha_val + ',' + this.mono_val
            this.generate()
        },
        generate() {
            let charactersArray = this.characters.split(',');
            let CharacterSet = '';
            let password = '';
            if (charactersArray.indexOf('a-z') >= 0) {
                CharacterSet += 'abcdefghijklmnopqrstuvwxyz';
            }
            if (charactersArray.indexOf('A-Z') >= 0) {
                CharacterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            }
            if (charactersArray.indexOf('0-9') >= 0) {
                CharacterSet += '0123456789';
            }
            if (charactersArray.indexOf('#') >= 0) {
                CharacterSet += '![]{}()%&*$#^<>~@|';
            }
            for (let i = 0; i < this.length_pass; i++) {
                password += CharacterSet.charAt(Math.floor(Math.random() * CharacterSet.length));
            }
            this.password = password;
        },
        closeDialogPass() {
            this.$emit('update:dialogPass', false)
        },
        copyPassword() {
           
            this.$nextTick(() => {
                this.$refs.passInput.isFocused = true;
                let inputEl = this.$refs.passInput.$el.querySelector('input')
                inputEl.select()
            });
            navigator.clipboard.writeText(this.password)
            this.showSnackbar("Cuenta copiada al portapapeles ",
                true,
                " "
            );
        }
    },
    computed: {
        progress() {
            return Math.min(100, this.length_pass * 5)
        },
        color() {
            if (this.length_pass <= 8) return 'warning'
            if (this.length_pass <= 12) return 'orange'
            if (this.length_pass <= 16) return 'green'
            if (this.length_pass <= 20) return 'success'
            return 'red'
        },
    },
    watch: {
        dialogPass: {
            immediate: true,
            handler(value) {
                if (value) {
                    this.generate()
                }
            }
        },
    },
}
</script>

<style>
</style>
