/*
 * Copyright (c) 2022  Garcia Coca Ana Marianela
 */
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { router } from "./router";
import store from "@/store/index.js";
import axios from "axios";
var numeral = require("numeral");
Vue.filter("formatNumber", function (value) {
    return numeral(value).format("0,0.00"); // displaying other groupings/separators is possible, look at the docs
});
Vue.prototype.axios = axios;
import helpers from '@/mixins/helpers'
Vue.mixin(helpers)
import roleMixin from "@/mixins/rolesMixins";
Vue.mixin(roleMixin);
import "@/components/services/globalComponents";
require("@/store/subscriber");
let authenticated = store.getters;
axios.defaults.baseURL = process.env.VUE_APP_URL_API;
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (authenticated['auth/authenticated']) {
        if (authenticated['auth/authenticated'].success) {
            if (error.response) {
                if (error.response.status === 403) {
                    store.dispatch("auth/forbiddenContent");
                }
                if (error.response.status === 401) {
                    store.dispatch("auth/checkToken");
                }
            }
        }
    }
    return error;
});
Vue.config.productionTip = false;
store.dispatch("auth/attempt", localStorage.getItem("token")).then(() => {
    new Vue({
        vuetify,
        store,
        router: router,
        render: h => h(App)
    }).$mount("#app");
});