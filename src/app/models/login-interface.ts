//Las variables  son los parametros exactamente iguales a la base de datos, es escencial para el proceso de registro y logeo
export interface LoginInterface{

    id?: string,
    nombre?: string;
    ape_pat?: string;
    ape_mat?: string;
    correo?: string;
    contrasena?: string;
    rol?: string;
}