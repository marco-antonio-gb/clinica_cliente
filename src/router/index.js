import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
Vue.use(Router);
const LoginLayout = () => import("../components/layouts/LoginLayout.vue");
const DashboardLayout = () => import("../components/layouts/DashboardLayout.vue");
const Inicio = () => import("../modules/Inicio/Inicio.vue");
const Unauthorized = () => import("../components/pages/Unauthorized.vue");
const UnauthorizedEvent = () => import("../components/pages/UnauthorizedEvent.vue");
const ForbiddenContent = () => import("../components/pages/ForbiddenContent.vue");
const TokenExpired = () => import("../components/pages/TokenExpired.vue");
const PageNotFound = () => import("../components/pages/PageNotFound.vue");
/* PESONAS */
const Persona = () => import("../modules/Personas/Personas.vue");
const PersonaList = () => import("../modules/Personas/views/List.vue");
const PersonaCreate = () => import("../modules/Personas/views/Create.vue");
const PersonaDetail = () => import("../modules/Personas/views/Detail.vue");
const PersonaUpdate = () => import("../modules/Personas/views/Update.vue");
/* USUARIOS */
const Usuario = () => import("../modules/Usuarios/Usuarios.vue");
const UsuarioList = () => import("../modules/Usuarios/views/UsuarioList.vue");
const UsuarioCreate = () => import("../modules/Usuarios/views/UsuarioCreate.vue");
const UsuarioDetail = () => import("../modules/Usuarios/views/UsuarioDetail.vue");
const UsuarioUpdate = () => import("../modules/Usuarios/views/UsuarioUpdate.vue");

/*  PERFIL DE USUARIO */
// const Perfil = () => import("../modules/Perfil/Perfil.vue");
// const PerfilDetail = () => import("../modules/Perfil/views/PerfilDetail.vue");
// const PerfilUpdate = () => import("../modules/Perfil/views/PerfilUpdate.vue");
/* ROLES */
// const Roles = () => import("../modules/Roles/Roles.vue");
// const RolList = () => import("../modules/Roles/views/RolList.vue");
// const RolCreate = () => import("../modules/Roles/views/RolCreate.vue");
// const RolDetail = () => import("../modules/Roles/views/RolDetail.vue");
// const RolUpdate = () => import("../modules/Roles/views/RolUpdate.vue");
export const router = new Router({
    mode: "history",
    linkActiveClasss: "is-active",
    routes: [
        {
            path: "/login",
            component: LoginLayout,
            name: "login",
            meta: {
                title: "Login"
            }
        },
        {
            path: "/",
            component: DashboardLayout,
            beforeEnter: (to, from, next) => {
                if (!store.getters["auth/authenticated"]) {
                    return next({
                        name: "login"
                    });
                }
                next();
            },
            children: [
                {
                    path: "/",
                    name: "inicio",
                    component: Inicio,
                    meta: {
                        title: "Inicio",
                        description: "Pagina Principal",
                        requiresAuth: true
                    }
                },
                {
                    path: "/personas",
                    component: Persona,
                    children: [
                        {
                            path: "/",
                            name: "personaList",
                            component: PersonaList,
                            meta: {
                                title: "Personas",
                                permissions: ["Administrador"]
                            }
                        },
                        {
                            path: "/personas/create",
                            name: "personaCreate",
                            component: PersonaCreate,
                            meta: {
                                title: "Crear persona",
                                permissions: ["Administrador"]
                            }
                        },
                        {
                            path: "/personas/detail/:idPersona",
                            name: "personaDetail",
                            component: PersonaDetail,
                            meta: {
                                title: "Informacion del persona",
                                permissions: ["Administrador"]
                            }
                        },
                        {
                            path: "/personas/update/:idPersona",
                            name: "personaUpdate",
                            component: PersonaUpdate,
                            meta: {
                                title: "Actualizar informacion del persona",
                                permissions: ["Administrador"]
                            }
                        }
                    ]
                },
                {
                    path: "/usuarios",
                    component: Usuario,
                    children: [
                        {
                            path: "/",
                            name: "usuariosList",
                            component: UsuarioList,
                            meta: {
                                title: "Usuarios",
                                permissions: ["Administrador"]
                            }
                        },
                        {
                            path: "/usuarios/create",
                            name: "usuariosCreate",
                            component: UsuarioCreate,
                            meta: {
                                title: "Crear usuario",
                                permissions: ["Administrador"]
                            }
                        },
                        {
                            path: "/usuarios/detail/:idUsuario",
                            name: "usuariosDetail",
                            component: UsuarioDetail,
                            meta: {
                                title: "Informacion del usuario",
                                permissions: ["Administrador"]
                            }
                        },
                        {
                            path: "/usuarios/update/:idUsuario",
                            name: "usuarioUpdate",
                            component: UsuarioUpdate,
                            meta: {
                                title: "Actualizar informacion del usuario",
                                permissions: ["Administrador"]
                            }
                        }
                    ]
                },
                // {
                //     path: "/perfil",
                //     component: Perfil,
                //     children: [
                //         {
                //             path: "/",
                //             name: "perfil",
                //             component: PerfilDetail,
                //             meta: {
                //                 title: "Perfil de usuario",
                //                 permissions: ["allUsers"]
                //             }
                //         },
                //         {
                //             path: "/perfil/update/:idUsuario",
                //             name: "perfilUpdate",
                //             component: PerfilUpdate,
                //             meta: {
                //                 title: "Actualizar perfil",
                //                 permissions: ["allUsers"]
                //             }
                //         }
                //     ]
                // },
                // {
                //     path: "/roles",
                //     component: Roles,
                //     children: [
                //         {
                //             path: "/",
                //             name: "roles",
                //             component: RolList,
                //             meta: {
                //                 title: "Roles del sistema",
                //                 permissions: ["Administrador"]
                //             }
                //         },
                //         {
                //             path: "/roles/create",
                //             name: "rolCrate",
                //             component: RolCreate,
                //             meta: {
                //                 title: "Crear nuevo rol",
                //                 permissions: ["Administrador"]
                //             }
                //         },
                //         {
                //             path: "/roles/detail/:idRol",
                //             name: "rolDetail",
                //             component: RolDetail,
                //             meta: {
                //                 title: "Detalle del rol",
                //                 permissions: ["Administrador"]
                //             }
                //         },
                //         {
                //             path: "/roles/update/:idRol",
                //             name: "rolUpdate",
                //             component: RolUpdate,
                //             meta: {
                //                 title: "Actualizar informacion del rol",
                //                 permissions: ["Administrador"]
                //             }
                //         }
                //     ]
                // },
            ]
        },
        {
            path: "/acceso-denegado",
            name: "acceso-denegado",
            component: Unauthorized,
            meta: {
                title: "Error 403"
            }
        },
        {
            path: "/evento-denegado",
            name: "evento-denegado",
            component: UnauthorizedEvent,
            meta: {
                title: "Evento no autorizado"
            }
        },
        {
            path: "/forbidden-content",
            name: "forbidden-content",
            component: ForbiddenContent,
            meta: {
                title: "Contenido no disponible"
            }
        },
        {
            path: "/session-expirado",
            name: "tokenexpired",
            component: TokenExpired,
            meta: {
                title: "Error 401"
            }
        },
        {
            path: "*",
            component: PageNotFound,
            meta: {
                title: "Error 404"
            }
        }
    ]
});
router.beforeEach((to, from, next) => {
    var userPermissions = store.getters["auth/roles"];
    document.title = `${process.env.VUE_APP_TITLE} - ${to.meta.title}`;
    if (store.getters["auth/authenticated"]) {
        if (to.meta.permissions && to.meta.permissions.length > 0) {
            let isAllowed = userPermissions.some(role =>
                to.meta.permissions.includes(role)
            );
            if (to.meta.permissions.includes("allUsers")) {
                return next();
            } else if (!isAllowed) {
                return next("/acceso-denegado");
            }
        }
    }
    next();
});
