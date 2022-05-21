const URL = "/usuarios";
export default {
    methods: {
        /**
         * Get all records 
         */
        async getUsuarios() {
            try {
                this.onLoading = true;
                const { data } = await this.axios.get(URL);
                this.usuarios = data.data;
            } catch (error) {
                this.showSnackbar(
                    error.name + ': ' + error.response.data.message,
                    true,
                    "error"
                );
            } finally {
                this.onLoading = false;
            }
        },
        /**
         * Create new Usuario   
         */
        async create() {
            this.onSave = true;
            try {
                if (this.$refs.createUsuarioForm.validate()) {
                    const { data } = await this.axios.post(URL, this.usuario);
                    if (data.success) {
                        this.showSnackbar(
                            data.message,
                            true,
                            "success"
                        );
                        setTimeout(() => {
                            this.$router.go(-1)
                        }, 500);
                    } else {
                        this.showSnackbar(
                            data.validator,
                            true,
                            "warning"
                        );
                    }
                    this.onSave = false;
                }
            } catch (error) {
                this.showSnackbar(
                    error.name + ': ' + error.response.data.message,
                    true,
                    "error"
                );
            }
            this.onSave = false;
        },
        async show(ID) {
            this.onLoading = true;
            try {
                const { data } = await this.axios.get(URL + '/' + ID);
                this.usuario = data.data;
            } catch (error) {
                this.showSnackbar(
                    error.name + ': ' + error.response.data.message,
                    true,
                    "error"
                );
            }
            this.onLoading = false;
        },
        async update(ID) {
            this.onSave = true;
            try {
                const { data } = await this.axios.put(URL + '/' + ID, this.usuario);
                if (data.success) {
                    this.showSnackbar(
                        data.message,
                        true,
                        "success"
                    );
                    setTimeout(() => {
                        this.$router.go(-1)
                    }, 500);
                } else {
                    this.showSnackbar(
                        data.validator,
                        true,
                        "success"
                    );
                }
                this.onSave = false;
            } catch (error) {
                this.showSnackbar(
                    error.name + ': ' + error.response.data.message,
                    true,
                    "error"
                );
            }
            this.onSave = false;
        },
        async delete(ID) {
            this.onSave = true;
            try {
                const { data } = await this.axios.delete(URL + '/' + ID);
                if (data.success) {
                    this.showSnackbar(
                        data.message,
                        true,
                        "success"
                    );
                    this.$nextTick(() => {
                        const index = this.usuarios.findIndex(post => post.idUsuario === ID)
                        if (~index)
                            this.usuarios.splice(index, 1)
                    });
                } else {
                    this.showSnackbar(
                        data.validator,
                        true,
                        "success"
                    );
                }
                this.onSave = false;
            } catch (error) {
                this.showSnackbar(
                    error.name + ': ' + error.response.data.message,
                    true,
                    "error"
                );
            }
            this.onSave = false;
        },
        /**
         * Others Methods --------------------------------------------------------------
         */
        getColor(estado) {
            if (!estado) return 'red'
            else if (estado) return 'green'
            else return 'primary'
        },
        getLabel(estado) {
            if (estado) return 'Activo'
            else if (!estado) return 'Desactivado'
            else return 'Error'
        },
        cancelUpdateUsuario() {
            this.$router.go(-1);
            this.$refs.updateUsuarioForm.reset();
        },
        cancelarCreateUsuario() {
            this.$router.go(-1);
            this.$refs.createUsuarioForm.reset();
        },
        async blockUserAccount(usuario) {
            let user = {
                userId: usuario.idUsuario,
                status: usuario.activo
            };
            try {
                let response = await this.axios.post('/suspend-account', user);
                if (response.data.success) {
                    this.showSnackbar(
                        response.data.message,
                        true,
                        "success"
                    );
                    setTimeout(() => {
                        if (this.authenticated.data.idUsuario === this.$route.params.idUsuario) {
                            this.signOutAction()
                                .then(() => {
                                    this.$router.replace({
                                        name: "login",
                                    });
                                })
                                .catch((error) => {
                                    if (error.response.status === 401) {
                                        this.$router.replace({
                                            name: "login",
                                        });
                                        this.signOutAction();
                                    }
                                });
                        } else {
                            if (this.$route.path === '/usuarios') {
                                this.getUsuarios()
                            } else {
                                this.show(usuario.idUsuario)
                            }
                        }
                    }, 500);
                } else {
                    this.showSnackbar(
                        response.data.message,
                        true,
                        "error"
                    );
                }
            } catch (error) {
                this.showSnackbar(
                    error.name + ': ' + error.response.data.message,
                    true,
                    "error"
                );
            }
        },
        async suspend(usuario) {
            let title = "Confirmación para desactivar cuenta"
            let message = "Esta acción denegara el acceso al usuario. ¿Seguro que quieres continuar?"
            if (!usuario.activo) {
                message = "Esta acción permitira el acceso al usuario. ¿Seguro que quieres continuar?"
                title = "Confirmación para activar cuenta"
            }
            if (
                await this.$refs.confirm.open(
                    title,
                    message
                )
            ) {
                this.blockUserAccount(usuario);
            }
        },
        generateUser() {
            let username = "";
            let nom = this.usuario.nombres;
            let pater = this.usuario.paterno;
            if (nom && pater) {
                let no = nom.charAt(0).toLowerCase().trim();
                let pa = pater.toLowerCase().trim();
                username = no + pa + "@campoferial3dejulio.com";
                this.usuario.email = username;
            } else {
                username = this.randomPassword(10) + "@campoferial3dejulio.com";
                this.usuario.email = username;
            }
        },
        generateRandomUser() {
            let username = "";
            username = this.randomPassword(10) + "@campoferial3dejulio.com";
            this.usuario.email = username;
        },
        randomPassword(length) {
            var chars = "abcdefghijklmnopqrstuvwxyz1234567890";
            var pass = "";
            for (var x = 0; x < length; x++) {
                var i = Math.floor(Math.random() * chars.length);
                pass += chars.charAt(i);
            }
            return pass;
        },
        generateName() {
            const var1 = this.usuario.paterno
            const var2 = this.usuario.materno
            const var3 = this.usuario.nombres
            const var4 = this.usuario.ci
            const var5 = this.usuario.ci_ext
            const var6 = this.usuario.celular
            let items = [var1, var2, var3, var4, var5, var6];
            let me = this
            var newArr = items.map(function (item) {
                if (item === '' || item === null) {
                    return item = me.randomPassword(5)
                }
                return item
            })
            let arr = items.filter(function (item) {
                return item !== ''
            })
            console.log(newArr)
            console.log(arr)
            let name1 = arr[Math.floor(Math.random() * arr.length)]
            let name2 = arr[Math.floor(Math.random() * arr.length)]
            // let name3 =this.convertToSlug(items[Math.floor(Math.random()*items.length)])
            let username = [name1, name2]
            console.log(username.join('-').toLowerCase())
            this.usuario.email = username.join("-")
        }
    },
};
