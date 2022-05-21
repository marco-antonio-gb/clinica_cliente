export const tipo_contacto = [
    {
        text: "Firma de Contrato"
    },
    {
        text: "Persona de Contacto"
    },
    {
        text: "Representante Legal"
    },
    {
        text: "Gerente General"
    },
    {
        text: "Responsable Designado"
    },
    {
        text: "Encargado de Stands"
    },
    {
        text: "Personal de Apoyo"
    }
];
export const options_ci = [
    {
        value: "OR",
        text: "ORURO",
    },
    {
        value: "LP",
        text: "LA PAZ",
    },
    {
        value: "PT",
        text: "POTOSI",
    },
    {
        value: "CB",
        text: "COCHABAMBA",
    },
    {
        value: "CH",
        text: "CHUQUISACA",
    },
    {
        value: "TJ",
        text: "TARIJA",
    },
    {
        value: "SC",
        text: "SANTA CRUZ",
    },
    {
        value: "BN",
        text: "BENI",
    },
    {
        value: "PD",
        text: "PANDO",
    },
    {
        value: "otro",
        text: "OTRO..."
    }
];
export const tipo_empresa = [
    {
        value: "Empresa Privada",
        text: "Empresa Privada"
    },
    {
        value: "Empresa Unipersonal",
        text: "Empresa Unipersonal"
    },
    {
        value: "Institucion Publica",
        text: "Institucion Publica"
    },
    {
        value: "Institucion Estatal",
        text: "Institucion Estatal"
    },
    {
        value: "Otros",
        text: "Otros"
    }
];
export const times = [
    '12:00 AM',
    '12:30 AM',
    '1:00 AM',
    '1:30 AM',
    '2:00 AM',
    '2:30 AM',
    '3:00 AM',
    '3:30 AM',
    '4:00 AM',
    '4:30 AM',
    '5:00 AM',
    '5:30 AM',
    '6:00 AM',
    '6:30 AM',
    '7:00 AM',
    '7:30 AM',
    '8:00 AM',
    '8:30 AM',
    '9:00 AM',
    '9:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '1:00 PM',
    '1:30 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
    '5:00 PM',
    '5:30 PM',
    '6:00 PM',
    '6:30 PM',
    '7:00 PM',
    '7:30 PM',
    '8:00 PM',
    '8:30 PM',
    '9:00 PM',
    '9:30 PM',
    '10:00 PM',
    '10:30 PM',
    '11:00 PM',
    '11:30 PM',
];
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
export const currentDate=today;