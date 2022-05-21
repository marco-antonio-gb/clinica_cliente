<template>
<v-layout class="pa-5 dark" fill-height>
    <v-card max-width="600" class="mx-auto" flat dark>
        <v-card-text>
            <h1 id="campoferial-cliente">campoferial-cliente</h1>
            <h2 id="project-setup">Project setup</h2>
            <pre><code>npm <span class="hljs-keyword">install</span>
</code></pre>
            <h3 id="compiles-and-hot-reloads-for-development">Compiles and hot-reloads for development</h3>
            <pre><code>npm <span class="hljs-keyword">run</span><span class="bash"> serve</span>
</code></pre>
            <h3 id="compiles-and-minifies-for-production">Compiles and minifies for production</h3>
            <pre><code>npm <span class="hljs-keyword">run</span><span class="bash"> build</span>
</code></pre>
            <h3 id="lints-and-fixes-files">Lints and fixes files</h3>
            <pre><code>npm <span class="hljs-keyword">run</span><span class="bash"> lint</span>
</code></pre>
            <h3 id="customize-configuration">Customize configuration</h3>
            <p>See <a href="https://cli.vuejs.org/config/">Configuration Reference</a>.</p>
            <h1 id="estructura-de-archivos-modules-">Estructura de archivos (/modules)</h1>
            <p>Ejemplo: Modulo Usuarios</p>
            <pre><code>usuarios
├── components
│   └──...
├── services
│   └── UsuarioHelpers<span class="hljs-selector-class">.js</span>
│   └── UsuarioService<span class="hljs-selector-class">.js</span>
│   └── UsuarioVariables<span class="hljs-selector-class">.js</span>
├── views
│   ├── UsuarioCreate<span class="hljs-selector-class">.vue</span>
│   ├── UsuarioDetail<span class="hljs-selector-class">.vue</span>
│   ├── UsaurioList<span class="hljs-selector-class">.vue</span>
│   └── UsuarioUpdate<span class="hljs-selector-class">.vue</span>
└── Usuarios.vue
</code></pre>
            <h2 id="descripcion">Descripcion</h2>
            <ul>
                <li>COMPONENTS<ul>
                        <li>Directorio donde se crean nuevos componentes personalizados para el modulo correspondiente, tales como: Modales, Formularios, Tablas, etc.</li>
                    </ul>
                </li>
                <li>SERVICES<ul>
                        <li><code>UsuarioHelpers.js</code> contiene funciones auxiliares para el modulo.</li>
                        <li><code>UsuarioService.js</code> contiene las funciones principales CRUD del modulo.</li>
                        <li><code>UsuarioVariable.js</code> contiene variables de tipo Objeto, Array o cualquier tipo, que se usen en varios lugares del modulo.</li>
                    </ul>
                </li>
            </ul>
            <p>Descripcion de <code>UsuarioService.js</code></p>
            <pre><code class="lang-javascript">export default {
    methods: {
        getUsuarios<span class="hljs-comment">()</span> {
            <span class="hljs-comment">//Retorna una lista con los usuarios registrados</span>
        },
        storeUsuario<span class="hljs-comment">(data)</span> {
            <span class="hljs-comment">//Envia los datos a la API, para crear un nuevo registro</span>
        },
        showUsuario<span class="hljs-comment">(id)</span> {
            <span class="hljs-comment">//Retorna un objeto con la informacion del usuario correspondiente a la id enviada</span>
        },
        updateUsuario<span class="hljs-comment">(id, data)</span> {
            <span class="hljs-comment">//Envia los datos modificados correspondiantes al id seleccionado.</span>
        },
        deleteUsuario<span class="hljs-comment">(id)</span> {
            <span class="hljs-comment">//Envia una peticion con la id seleccionada para eliminar el registro</span>
        }
    }
};
</code></pre>
            <ul>
                <li>VIEWS<ul>
                        <li>Directorio destinado a los ficheros Vue, en los cuales se procesa los datos.</li>
                    </ul>
                </li>
                <li>USUARIOS.vue<ul>
                        <li>Fichero Vue, el cual contiene la etiqueta <em>&lt; router-view &gt;</em> el cual gestiona las rutas pertenecientes a dicho modulo.</li>
                    </ul>
                </li>
            </ul>
            <h1 id="librerias">Librerias</h1>
            <h3 id="-vue-advanced-croppe-github-https-github-com-norserium-vue-advanced-cropper-git-"><strong>Vue Advanced Croppe</strong> <a href="https://github.com/Norserium/vue-advanced-cropper.git">GitHub</a>.</h3>
            <pre><code>npm <span class="hljs-keyword">install</span> -S vue-<span class="hljs-keyword">advanced</span>-cropper
</code></pre>
            <h3 id="-numeral-js-v-2-0-6-website-http-numeraljs-com-"><strong>Numeral.js v. 2.0.6</strong> <a href="http://numeraljs.com/">WebSite</a>.</h3>
            <pre><code><span class="hljs-built_in">npm</span> install numeral
<span class="hljs-keyword">var</span> numeral = <span class="hljs-built_in">require</span>(<span class="hljs-string">'numeral'</span>);
</code></pre>
            <h1 id="rutas-roles-permisos-">Rutas (Roles/Permisos)</h1>
            <h2 id="roles">Roles</h2>
            <ul>
                <li>Administrador<ul>
                        <li>Menu-Contactos<ul>
                                <li>Acceso total</li>
                            </ul>
                        </li>
                        <li>Menu-Empresas<ul>
                                <li>Acceso total</li>
                            </ul>
                        </li>
                        <li>Menu-Usuarios<ul>
                                <li>Acceso total</li>
                            </ul>
                        </li>
                        <li>Menu-Eventos<ul>
                                <li>Acceso total</li>
                            </ul>
                        </li>
                        <li>Menu-Roles<ul>
                                <li>Acceso total</li>
                            </ul>
                        </li>
                        <li>Menu-Permisos<ul>
                                <li>Acceso total</li>
                            </ul>
                        </li>
                        <li>Menu-Configuracion<ul>
                                <li>Acceso total</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>Comercial<ul>
                        <li>Memu-Contactos<ul>
                                <li>Acceso total</li>
                            </ul>
                        </li>
                        <li>Menu-Empresas<ul>
                                <li>Acceso total</li>
                            </ul>
                        </li>
                        <li>Menu-Eventos<ul>
                                <li>TRUE = [Registrar Reservas, Ver, modificar Contratos, Reportes, Registrar Credencializacion, ]</li>
                                <li>FALSE = [Crear Layouts, Editar Layouts, Crear credenciales, Editar Credenciales, Editar Contratos, Eliminar Contratos, Eliminar credenciales, Eliminar Layouts, Editar Evento, Eliminar Evento]</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>Credencializacion<ul>
                        <li>TRUE = [Registrar credenciales, Modificar Credenciales registradas, Ver contactos, Registrar contactos]<ul>
                                <li>Menu-Eventos</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>Personal de Apoyo<ul>
                        <li>Menu-Eventos</li>
                    </ul>
                </li>
            </ul>
        </v-card-text>
    </v-card>
</v-layout>
</template>
<script>
export default {
}
</script>
<style>
</style>
