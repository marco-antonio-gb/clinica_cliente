export default {
	items: [
		{
			title: "Inicio",
			href: "/",
			icon: "mdi-home",
			role: [ "Administrador", "Medico"]
		},
		// {
		// 	_children: "Comercial",
		// 	role: [ "Administrador", ]
		// },
		{
			title: "Personas",
			href: "/personas",
			icon: "mdi-storefront",
			role: [ "Administrador", 'Medico']
		},
		{
			title: "Usuarios",
			href: "/usuarios",
			icon: "mdi-account-box",
			role: [ "Administrador"]
		},
		{
			title: "Pacientes",
			href: "/pacientes",
			icon: "mdi-calendar",
			role: [ "Administrador","Medico"]
		},
		{
			title: "Doctores",
			href: "/doctores",
			icon: "mdi-checkbox-multiple-blank",
			role: [ "Administrador"]
		},
        {
			title: "Herramientas",
			href: "/herramientas",
			icon: "mdi-file-document-multiple",
			role: [ "Administrador", "Asistente"]
		},
        {
			_children: "Logistica",
			role: [ "Administrador"]
		},
        {
			title: "Suministros",
			href: "/suministros",
			icon: "mdi-chair-rolling",
			role: [ "Administrador"]
		},
		{
			_children: "Administracion",
			role: [ "Administrador", ]
		},
		{
			title: "Citas",
			href: "/citas",
			icon: "mdi-account",
			role: [ "Administrador" ]
		},
		{
			_children: "Seguridad",
			role: [ "Administrador", ]
		},
		{
			title: "Roles",
			href: "/roles",
			icon: "mdi-account-lock",
			role: [ "Administrador", ]
		},
        {
			title: "Ajustes",
			href: "/settings",
			icon: "mdi-cog",
			role: [ "Administrador", ]
		},
	]
};
