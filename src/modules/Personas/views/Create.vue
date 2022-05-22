<template>
<div>
    <goback class="mb-3" />
    <v-alert dense  outlined color="primary" dark v-if="company">
        Empresa: {{company.razon_social}}
    </v-alert>
    <PersonaForm @on-submit="submitEvent" :personaData="persona=true" :company="company" :onSave.sync="onSave" />
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
            onSave: false,
            snackbar: {
                show_snack: false,
                message_snack: "",
                color_snack: "light",
                timeout_snack: 5000,
            },
        }
    },
    created() {},
    mixins: [
        PersonaService,
    ],
    components: {
        PersonaForm: () => import('../components/FormPersona.vue')
    },
    methods: {
        submitEvent(data) {
            // this.create(data)
            console.log(data)
        }
    },
    computed: {
        company() {
            let obj = this.$route.query
            return Object.keys(obj).length > 0 ? obj : null
        }
    },
}
</script>
