import { 
    mapActions,
    mapGetters
} from 'vuex'
export default {
    methods:{
        ...mapActions({
            setUserUpdate: "auth/attempt",
        }),
        cancelUpdatePerfil(){
            this.$refs.updateProfileForm.reset()
            this.$router.go(-1)
        },
        updateProfile(ID){
            if (this.$refs.updateProfileForm.validate()) {
				this.loading = true;
				this.axios
					.put('/usuarios' + `/${ID}`, this.usuario)
					.then(response => {
						if (response.data.success) {
							this.loading = false;
							this.showSnackbar(
								response.data.message,
								true,
								"success"
							);
                             this.setUserUpdate(this.token)
                            setTimeout(() => {
                                this.$router.go(-1)
                            }, 500);
						} else {
							this.loading = false;
							this.showSnackbar(
								response.data.validator,
								true,
								"warning"
							);
						}
					})
					.catch(error => {
						this.loading = false;
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
        } 
    },
    computed:{
        ...mapGetters({
            token: "auth/token",
        }),
        currentUser() {
            return this.token
        }
    }
}