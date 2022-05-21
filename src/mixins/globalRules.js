/**
 * VALIDACIONES CONTACTOS
 */
/*Reglas de validacion */
export const nombresRules = [
    v => !!v || "El nombre es obligatorio",
    v =>
        (v && v.length <= 80) ||
        "El nombre al parecer es muy largo, trate de abreviarlo."
];
export const tipoContactoRules = [v => !!v || "El tipo de contacto es obligatorio"];
export const direccionRules = [v => !!v || "La Direccion de la contacto es obligatorio"];
export const cargoRules = [v => !!v || "El cargo del contacto es obligatorio"];
export const numeroRules = [v => !!v || "Este campo es  obligatorio"];
export const precioRule = [
    // v => v.length >= 0 || "Ingrese un valor valido",
    v => !isNaN(parseFloat(v)) || "El numero no es valido",
    v => v > 0 || "El valor debe ser mayor que cero",
    v => v <= 6000 || "El valor debe ser menor que 6000"
];
export const cantidadRule = [
    v => !!v || "El campo es requerido",
    // v => (v && v.length >1= 0) || "Ingrese un valor valido",
    v => Number.isInteger(Number(v)) || "El valor debe ser un entero",
    v => v > 0 || "El valor debe ser mayor que cero",
    v => v <= 6000 || "El valor debe ser menor que 6000"
];
export const credsRule = [
    v => !!v || "El campo es requediro",
    v => (v && v.length >= 0) || "Ingrese un valor valido",
    v => Number.isInteger(Number(v)) || "El valor debe ser un entero",
    v => v > 0 || "El valor debe ser mayor que cero",
    v => v <= 30 || "El valor debe ser menor que 30"
];
/*Reglas de validacion */
export const razonSocialRules=[
    v => !!v || "La razon social es obligatorio",
    v =>
        (v && v.length <= 80) ||
        "El nombre al parecer es muy largo, trate de abreviarlo."
];
export const nitCedulaRules=[
    v => !!v || "El numero de NIT/C.I. es obligatorio",
    v =>
        (v && v.length <= 20) ||
        "El NIT/C.I. debe contener menos de 20 caracteres"
];
export const ciRules=[
    v => !!v || "El numero de  C.I. es obligatorio",
    v =>
        (v && v.length <= 20) ||
        "El  C.I. debe contener menos de 20 caracteres"
];
export const ciExtRules = [v => !!v || "Este campo es  obligatorio"];
export const tipoEmpresaRules=[v => !!v || "El tipo de empresa es obligatorio"];
export const rubroRules=[v => !!v || "El Rubro de la empresa es obligatorio"];
export const ofertaRules=[v => !!v || "La Oferta de la empresa es obligatorio"];
export const demandaRules=[v => !!v || "La Demanda de la empresa es obligatorio"];
export const celularRules=[
    v => !!v || "El Nro. Celular es obligatorio",
    v =>
        (v && v.length <= 15) ||
        "El Nro. Celular debe contener menos de 15 caracteres"
];
export const correoRules=[
    v => !!v || "El correo es obligatorio",
    v =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
        ) || "El correo es incorrecto"
];
export const passwordRules= [
    v => !!v || "El campo es requerido",
    v => (v && v.length >= 0) || "Ingrese un valor valido",
    v => (v && v.length >= 8) || "Ingrese una clave mayor a 8 caracteres",
    v => (v && v.length <= 50) || "Ingrese un valor menor a 50 caracteres",
];
export const  rolesRules = [(v) => !!v && v.length > 0 || "Debe asignar un Rol  al Usuario."];
/**
 * EVENTO VALIDACION
 */
 export const nombre=[
    v => !!v || "El nombre es requerido",
    v => (v && v.length >= 0) || "Ingrese un nombre valido",
    v => (v && v.length >= 5) || "El nombre tiene que tener al menos 5 letras",
    v => (v && v.length <= 100) || "El nombre tiene que tener   no más de 100 caracteres",
 
];
// export const nombre=[v => !!v || "El título tiene que tener al menos 3 letras y no más de 100 caracteres"];
export const organizador=[v => !!v || "El nombre del Organizador es obligatorio"];
export const tipoEvento=[v => !!v || "El Tipo de evento es obligatorio"];
export const fechaInicio=[v => !!v || "La fecha de inicio es obligatoria"];
export const fechaFinal=[v => !!v || "La fecha de finalizacion es obligatoria"];
export const descripcion=[v => !!v || "La descripcion del evento es obligatorio"];
export const lugar=[v => !!v || "La lugar del evento es obligatorio"];
/*
* MOBILIARIO VALITATION
*/
export const nombreMob=[v => !!v || "Este campo es obligatorio"];
export const unidad=[v => !!v || "Este campo  es obligatorio"];
export const propiedades=[v => !!v || "Este campo  es obligatorio"];
 
export const usos=[v => !!v || "Este campo  es obligatorio"];
export const manipulacion=[v => !!v || "Este campo  es obligatorio"];
