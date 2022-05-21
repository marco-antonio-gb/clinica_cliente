<template>
<div>
    <h3 class="font-weight-light mb-3">Evento fijado</h3>
    <v-card flat class="transparent d-flex justify-center align-center" v-if="loadEvent">
        <v-progress-circular indeterminate color="error" size="20" width="2"></v-progress-circular>
        <span class="caption mb-0 ml-3 text--secondary">Cargando evento</span>
    </v-card>
    <div v-else>
        <v-row v-if="resumeEvent">
            <v-col cols="12" sm="4">
                <ResumeDetail :evento="resumeEvent" class="mb-3" />
            </v-col>
            <v-col cols="12" sm="8">
                <StackedColumns :idEvento="event_id"  />
            </v-col>
        </v-row>
        <v-card v-else>
            <v-card-text class="text-center">
                <p>No se fijo ningun evento!</p>
            </v-card-text>
        </v-card>
    </div>
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
    mapActions
} from "vuex";
export default {
    data() {
        return {
            resumeEvent: null,
            event_id: null,
            loadEvent: false,
            snackbar: {
                show_snack: false,
                message_snack: '',
                color_snack: 'light',
                timeout_snack: 5000
            },
        };
    },
    created() {
        this.getMainEvent();
    },
    methods: {
        ...mapActions({
            setMainEvent: "auth/setMainEvent",
        }),
        async getMainEvent() {
            try {
                this.loadEvent = true;
                let response = await this.axios.get("/main-event");
                if (response.data.success) {
                    this.resumeEvent = response.data.data;
                    this.event_id = response.data.data.idEvento;
                    this.loadEvent = false;
                    this.setMainEvent({
                        name: response.data.nombre,
                        id_event: response.data.idEvento,
                    });
                } else {
                    this.loadEvent = false;
                    this.showSnackbar(response.data.message, true, "");
                }
            } catch (error) {
                this.onLoading = false;
                this.showSnackbar(error.name + ": " + error.message, true, "error");
            }
        },
    },
    components: {
        StackedColumns: () => import("@/components/graficos/StackedColumns.vue"),
        ResumeDetail: () => import("./ResumeDetail.vue"),
    },
};
</script>
<style></style>
