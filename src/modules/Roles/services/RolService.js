const API = "/roles";
export default {
	methods: {
		getRoles() {
			this.onLoading = true;
			this.axios
				.get(API)
				.then(response => {
					if (response.data.success) {
						this.onLoading = false;
						this.roles = response.data.data;
					} else {
						this.onLoading = false;
						this.showSnackbar(response.data.message, true, "light");
					}
				})
				.catch(error => {
					this.onLoading = false;
					if (error.response) {
						this.showSnackbar(
							error.response.data.message,
							true,
							"error"
						);
					} else if (error.request) {
						this.showSnackbar(
							"No se puede conectar con el servidor",
							true,
							"error"
						);
					} else {
						this.showSnackbar(error.message, true, "error");
					}
				});
		},
		/*-----------------------------------*/
		createRol() {
			if (this.$refs.createRolForm.validate()) {
				this.onButton = true;
				this.axios
					.post(API, this.rol)
					.then(response => {
						if (response.data.success) {
							this.onButton = false;
							this.showSnackbar(
								response.data.message,
								true,
								"success",
								6000
							);
							this.cancelarCreateRol();
						} else {
							this.onButton = false;
							this.showSnackbar(
								response.data.validator,
								true,
								"error"
							);
						}
					})
					.catch(error => {
						this.onButton = false;
						if (error.response) {
							this.showSnackbar(
								error.response.data.message,
								true,
								"error"
							);
						} else if (error.request) {
							this.showSnackbar(
								"No se puede conectar con el servidor",
								true,
								"error"
							);
						} else {
							this.showSnackbar(error.message, true, "error");
						}
					});
			}
		},
		/*-----------------------------------*/
		showRol(ID) {
			this.onLoading = true;
			this.axios
				.get(API + `/${ID}`)
				.then(response => {
					if (response.data.success) {
						this.onLoading = false;
						this.rol = response.data.data;
					} else {
						this.onLoading = false;
						this.showSnackbar(
							response.data.message,
							true,
							"warning"
						);
					}
				})
				.catch(error => {
					this.onLoading = false;
					if (error.response) {
						this.showSnackbar(
							error.response.data.message,
							true,
							"error"
						);
					} else if (error.request) {
						this.showSnackbar(
							"No se puede conectar con el servidor",
							true,
							"error"
						);
					} else {
						this.showSnackbar(error.message, true, "error");
					}
				});
		},
		/*-----------------------------------*/
		updateRol(ID) {
			if (this.$refs.updateRolForm.validate()) {
				this.onLoading = true;
				this.axios
					.put(API + `/${ID}`, this.rol)
					.then(response => {
						if (response.data.success) {
							this.onLoading = false;
							this.showSnackbar(
								response.data.message,
								true,
								"success"
							);
                            setTimeout(() => {
                                this.$router.go(-1)
                            }, 500);
						} else {
							this.onLoading = false;
							this.showSnackbar(
								response.data.validator,
								true,
								"warning"
							);
						}
					})
					.catch(error => {
						this.onLoading = false;
						if (error.response) {
							this.showSnackbar(
								error.response.data.message,
								true,
								"error"
							);
						} else if (error.request) {
							this.showSnackbar(
								"No se puede conectar con el servidor",
								true,
								"error"
							);
						} else {
							this.showSnackbar(error.message, true, "error");
						}
					});
			}
		},
		/*-----------------------------------*/
		deleteRol(ID) {
            console.log(ID)
			this.axios
				.delete(API + `/${ID}`)
				.then(response => {
					if (response.data.success) {
                        this.onLoading = false;
                        this.showSnackbar(
                            response.data.message,
                            true,
                            "success"
                        );
                        this.getRoles();
                    } else {
                        this.onLoading = false;
                        this.showSnackbar(
                            response.data.validator,
                            true,
                            "warning"
                        );
                    }
				})
				.catch(error => {
                    this.onLoading = false;
                    if (error.response) {
                        this.showSnackbar(
                            error.response.data.message,
                            true,
                            "error"
                        );
                    } else if (error.request) {
                        this.showSnackbar(
                            "No se puede conectar con el servidor",
                            true,
                            "error"
                        );
                    } else {
                        this.showSnackbar(error.message, true, "error");
                    }
                });
		},
        async getPermisos() {
			try {
				let permisosResponse = await this.axios.get("/permisos");
				this.permisos = permisosResponse.data.data;
			} catch (error) {
				console.log(error);
			}
		},
        cancelarCreateRol() {
			this.$refs.createRolForm.reset();
			this.$router.go(-1);
		},
		cancelarUpdateRol() {
			this.$refs.updateRolForm.reset();
			this.$router.go(-1);
		}
	}
};
