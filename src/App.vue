<template>
<v-app >
    
    <router-view :key="$route.fullPath+version"></router-view>
</v-app>
</template>
<script>
import {
    mapGetters,
} from "vuex";
export default {
    name: 'App',
    components: {},
    data: () => ({
        version: process.env.VUE_APP_VERSION,
    }),
    mounted() {
    },
    computed: {
        ...mapGetters({
            currentTheme: "auth/theme",
        }),
        colorTheme() {
            return this.currentTheme
        }
    },
    methods:{
    }
}
</script>
<style src="./styles/app.scss" lang="scss"/>
