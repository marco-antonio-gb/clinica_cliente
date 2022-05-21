import store from "@/store/";
export default {
	methods: {
		can(key) {
			var userPermissions = store.getters["auth/permisos"];
			return  userPermissions.some(permiso => key.includes(permiso));
		}
	}
};
