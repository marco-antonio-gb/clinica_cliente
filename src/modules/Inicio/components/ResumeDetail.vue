<template>
<v-card outlined link :ripple="true" :to="{ name: 'eventoDetail', params: { idEvento: evento.idEvento }}" v-if="evento.idEvento">
    <img src="@/assets/images/event_cover.svg" width="100%" />
    <v-card-text v-if="evento">
        <h1>
            <v-tooltip bottom transition="none">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon   color="primary" v-bind="attrs" v-on="on">
                        mdi-pin
                    </v-icon>
                </template>
                <span>Evento fijado</span>
            </v-tooltip>
            {{evento.nombre}}
        </h1>
        <p class="overline">Faltan: {{ evento.times.faltan}} dias, Duracion: {{ evento.duracion}} dias</p>
        <small class="text-uppercase font-weight-bold">Fecha inicio </small>
        <p class="small">{{ evento.esp_fecha_inicio}}</p>
        <small class="text-uppercase font-weight-bold">Lugar Presencial: </small>
        <p class="small">{{evento.evento_presencial}}</p>
        <small class="text-uppercase font-weight-bold">Virtual: </small>
        <p class="small">{{evento.evento_virtual}}</p>
        <small class="text-uppercase font-weight-bold">Descripcion</small>
        <p class="small">{{evento.descripcion}}</p>
    </v-card-text>
</v-card>
</template>

<script>
export default {
    data() {
        return {
            path: process.env.VUE_APP_URL_MEDIA + "/eventos/",
        }
    },
    props: {
        evento: {
            type: Object,
            default: () => ({}) // <= here also
        }
    }
}
</script>

<style>
</style>
