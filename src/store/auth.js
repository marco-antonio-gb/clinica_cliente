import axios from "axios";
import { router } from "@/router";
import Vuetify from '../plugins/vuetify'
export default {
    namespaced: true,
    state: {
        token: null,
        user: null,
        error: null,
        refresh: false,
        permissions: null,
        eventos: null,
        roles: [],
        text: "",
        color: "",
        timeout: "",
        theme: false,
        main_event: null,
    },
    getters: {
        token(state) {
            return state.token
        },
        authenticated: state => {
            return state.token && state.user;
        },
        user(state) {
            return state.user;
        },
        error(state) {
            return state.error;
        },
        refresh(state) {
            return state.refresh;
        },
        permisos(state) {
            return state.permissions;
        },
        eventos(state) {
            return state.eventos;
        },
        roles: state => {
            return state.roles;
        },
        theme: state => {
            return state.theme;
        },
        main_event(state) {
            return state.main_event
        }
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_USER(state, data) {
            state.user = data;
        },
        SET_ERROR(state, data) {
            state.error = data;
        },
        CLEAR_ERROR(state, data) {
            state.error = data;
        },
        REFRESH_TOKEN(state, data) {
            state.refresh = data;
        },
        SET_PERMISSIONS(state, data) {
            state.permissions = data;
        },
        SET_EVENTOS(state, data) {
            state.eventos = data;
        },
        SET_ROLES(state, data) {
            state.roles = data;
        },
        SHOW_MESSAGE(state, payload) {
            state.text = payload.text;
            state.color = payload.color;
            state.timeout = payload.timeout;
        },
        SET_THEME(state, payload) {
            state.theme = payload
            Vuetify.framework.theme.dark = payload
        },
        SET_EVENT(state, payload) {
            state.main_event = payload
        }
    },
    actions: {
        async signIn({ commit }, credentials) {
            commit("CLEAR_ERROR", null);
            let response = await axios.post("auth/login", credentials);
            return response;
        },
        async attempt({ commit, state }, token) {
            if (token) {
                commit("SET_TOKEN", token);
                try {
                    let response = await axios.post("auth/me");
                    let theme = response.data.data.settings
                    commit("SET_USER", response.data);
                    commit("SET_ROLES", response.data.data.roles);
                    commit("SET_PERMISSIONS", response.data.data.permisos);
                    commit("SET_EVENTOS", response.data.data.eventos);
                    commit("SET_THEME", theme.dark_theme);
                } catch (e) {
                    commit("SET_TOKEN", null);
                    commit("SET_USER", null);
                    commit("SET_PERMISSIONS", null);
                    commit("SET_EVENTOS", null);
                    commit("SET_ROLES", null);
                    commit("SET_THEME", false);
                    commit("SET_EVENT", null);
                }
            }
            if (!state.token) {
                return;
            }
        },
        errorAction({ commit, state }, error) {
            if (error) {
                commit("SET_ERROR", error);
            }
            if (!state.error) {
                return;
            }
        },
        forbiddenContent() {
            router.replace({
                name: "forbidden-content",
            });
            // commit("SET_TOKEN", null);
            // commit("SET_USER", null);
            // commit("SET_EVENT", null);
            // commit("SET_PERMISSIONS", null);
            // commit("SET_ROLES", null);
            // commit("SET_THEME", false);
        },
        tokenExpired({ commit }) {
            router.replace({
                name: "tokenexpired",
            });
            commit("SET_TOKEN", null);
            commit("SET_USER", null);
            commit("SET_EVENT", null);
            commit("SET_PERMISSIONS", null);
            commit("SET_ROLES", null);
            commit("SET_THEME", false);
        },
        async checkToken({ commit }) {
            let response = await axios.get('check-token');
            if (!response.data.valid) {
                router.replace({
                    name: "tokenexpired",
                });
                commit("SET_TOKEN", null);
                commit("SET_USER", null);
                commit("SET_EVENT", null);
                commit("SET_PERMISSIONS", null);
                commit("SET_ROLES", null);
                commit("SET_THEME", false);
            } else {
                return;
            }
        },
        setMainEvent({ commit }, payload) {
            commit("SET_EVENT", payload)
        },
        clearError({ commit }) {
            commit("CLEAR_ERROR", null);
        },
        async signOut({ commit }) {
            let res = await axios.post("auth/logout")
            if (res.data.success) {
                router.replace({
                    name: "login",
                });
                commit("SET_TOKEN", null);
                commit("SET_USER", null);
                commit("SET_EVENT", null);
                commit("SET_PERMISSIONS", null);
                commit("SET_ROLES", null);
                commit("SET_THEME", false);
            }
        },
        showSnack({ commit }, payload) {
            commit("SHOW_MESSAGE", payload);
        },
        readTheme({ commit }, payload) {
            commit("SET_THEME", payload)
        },
        async setTheme({ commit }, payload) {
            commit("SET_THEME", payload)
            let response = axios.post('set-theme', { dark_theme: payload })
            return response
        },
        set_route() {
            router.replace({
                name: 'inicio'
            })
        }
    }
};
