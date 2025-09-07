import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';



export const generateMiddlewares = async(fullPath) => {
    await createAttachBase(fullPath);
    await createValidateFields(fullPath);
    await createValidateJWT(fullPath);
    await createValidateRoles(fullPath);
}



const createAttachBase = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'middlewares');
    
    // File
    const filePath = path.join(folderPath, 'attachBaseController.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
// src/middlewares/attachBaseController.js
import { BaseController } from "../helpers/controllers/baseController.js";


export const attachBaseController = (req, res, next) => {
    res.handler = new BaseController(res);
    next();
}
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}




const createValidateFields = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'middlewares');
    
    // File
    const filePath = path.join(folderPath, 'validateFields.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { validationResult } from "express-validator";


export const validateFields = ( req, res, next ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    next();
}
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}



const createValidateJWT = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'middlewares');
    
    // File
    const filePath = path.join(folderPath, 'validateJWT.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
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
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}



const createValidateRoles = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'middlewares');
    
    // File
    const filePath = path.join(folderPath, 'validateRoles.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
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
            msg: \`\${ name } no es admintrador - No se puede procesar\`
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
                msg: \`El servicio require uno de estos roles \${ roles }\`
            });
        }
        
        next();
    }
    
}
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}