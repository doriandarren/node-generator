import { response } from "express";


export const isAdminRole = (req, res = response, next ) => {
    

    if ( !req.user ){
        return res.status(500).json({
            msg: 'Se requie verificar el role sin validar el token primero'
        });
    }

    const { role, name } = req.user;

    if( role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${ name } no es admintrador - No se puede procesar`
        });
    }


    next();

}



export const hasRole = ( ...roles ) => {

    return (req, res = response, next) => {

        if ( !req.user ){
            return res.status(500).json({
                msg: 'Se requie verificar el role sin validar el token primero'
            });
        }
        

        if ( !roles.includes( req.user.role ) ){
            return res.status(401).json({
                msg: `El servicio require uno de estos roles ${ roles }`
            });
        }
        
        next();
    }
    
}
