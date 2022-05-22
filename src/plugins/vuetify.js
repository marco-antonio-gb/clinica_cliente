import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import es from 'vuetify/es5/locale/es';
Vue.use(Vuetify);
Vue.component('my-component', {
    methods: {
        changeLocale() {
            this.$vuetify.lang.current = 'es'
        },
    },
})
export default new Vuetify({
    customProperties: true,
    theme: {
        themes: {
            light: {
                primary: "#3571FF",
                secondary: "#9FA2B4",
                accent: "#A989EE",
                error: "#FB104A",
                info: "#2196F3",
                success: "#29CC97",
                warning: "#FEC400",
                dark: "#252733"
            },
            dark: {
                primary: "#3571FF",
                secondary: "#9FA2B4",
                accent: "#A989EE",
                error: "#FB104A",
                info: "#2196F3",
                success: "#29CC97",
                warning: "#FEC400",
                dark: "#252733"
            }
        }
    },
    lang: {
        locales: { es },
        current: 'es',
    },
});
