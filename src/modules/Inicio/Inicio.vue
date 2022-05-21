<template>
<v-container>
    <!-- <v-card max-width="700">
        <div v-if=" espacios.length > 0">
            <div class="d-flex  justify-space-between space-content mb-2 align-center" v-for="(space,index) in  espacios" :key="index">
                <div>
                    <h4 class="mb-0">{{space.numero}} <span class="text--secondary body-2 font-weight-light">({{space.tipo}})</span></h4>
                    <p class="mb-0 caption text--secondary"> {{space.layout_name}}</p>
                </div>
                <div class="ml-auto mr-2">
                    <v-row dense>
                        <v-col>
                            <v-text-field prepend-icon="mdi-checkbox-multiple-blank-outline" class="shrink" v-model="space.precio" outlined dense hide-details></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field prepend-icon="mdi-ticket-confirmation-outline" class="shrink" v-model="space.creds" outlined dense hide-details></v-text-field>
                        </v-col>
                    </v-row>
                </div>
                <v-btn class=" " icon @click="removeSpaces(space.layout_clave, space.id, space.tipo)">
                    <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
            </div>
        </div>
    </v-card> -->
    <v-card-text>
        <!-- <EventResume   /> -->
    </v-card-text>
</v-container>
</template>
<script>
export default {
    data() {
        return {
            espacios: [{
                    numero: "Escenario",
                    tipo: "3x3",
                    precio: "1654",
                    creds: "3",
                    layout_name: "Condor de los Andes",
                },
                {
                    numero: "SP-1",
                    tipo: "6x6",
                    precio: "1654",
                    creds: "3",
                    layout_name: "Condor de los Andes",
                },
                {
                    numero: "54",
                    tipo: "3x3",
                    precio: "1654",
                    creds: "3",
                    layout_name: "Condor de los Andes",
                },
                {
                    numero: "5",
                    tipo: "3x3",
                    precio: "1654",
                    creds: "3",
                    layout_name: "Condor de los Andes",
                },
                {
                    numero: "15",
                    tipo: "3x3",
                    precio: "1654",
                    creds: "3",
                    layout_name: "Condor de los Andes",
                }
            ],
            fechaA: "",
            fechaB: "",
            loading: false,
            fl_c: false,
            cf_p: false,
        };
    },
    mounted() {
        // this.startPageData()
    },
    methods: {
        validateFechas() {},
    },
    components: {
        // EventResume: () => import("./components/EventResume.vue"),
    },
};
</script>
<style scoped>

</style>
