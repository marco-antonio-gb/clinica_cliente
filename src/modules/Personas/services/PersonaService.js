const URL = "/personas";
export default {
    methods: {
        /**
         * Get all records 
         */
        async getPersonas() {
            try {
                this.onLoading = true;
                const { data } = await this.axios.get(URL);
                this.personas = data.data;
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
                if (this.$refs.createPersonaForm.validate()) {
                    const { data } = await this.axios.post(URL, this.persona);
                    console.log(data)
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
            this.onSave = false;

                // this.showSnackbar(
                //     error.name + ': ' + error.response.data.message,
                //     true,
                //     "error"
                // );
            }
            this.onSave = false;
        },
        async show(ID) {
            this.onLoading = true;
            try {
                const { data } = await this.axios.get(URL + '/' + ID);
                this.persona = data.data;
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
                const { data } = await this.axios.put(URL + '/' + ID, this.persona);
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
                        const index = this.personas.findIndex(post => post.idUsuario === ID)
                        if (~index)
                            this.personas.splice(index, 1)
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
         
    },
};
