import { request, response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";



export const validateJWT = async(req = request, res = response, next) => {
    
    const authHeader = req.headers.authorization;

    // Comprobación del encabezado Authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.handler.respondHttpUnauthorized('No token provided in Authorization header');
    }

    const token = authHeader.split(' ')[1];


    if( !token ){
        return res.handler.respondHttpUnauthorized('There is no token in the request'); // No hay TOKEN en la petición
    }


    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);

        const userDB = await User.findOne({ where: { id: uid }});

        if( !userDB ){
            return res.handler.respondHttpUnauthorized('Invalid token - user not found in DB');
        }

        // if( !userDB.is_state ){
        //     return res.handler.respondHttpUnauthorized('Invalid token - user is inactive');
        // }

        next();
        
    } catch (error) {
        return res.handler.respondHttpUnauthorized('Invalid token'); // TOKEN no válido
    }

}
