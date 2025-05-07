import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';


export const generateControllerUsers = async(fullPath) => {    
    await createUserDeleteController(fullPath);
    await createUserListController(fullPath);
    await createUserShowController(fullPath);
    await createUserStoreController(fullPath);
    await createUserUpdateController(fullPath);
    
}

const createUserDeleteController = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'controllers', 'api', 'users');
    
    // File
    const filePath = path.join(folderPath, 'userDeleteController.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { response } from "express";
import { UserRepository } from '../../../repositories/users/userRepository.js';


const userRepo = new UserRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const userDeleteController = async(req, res = response) => {

    const { id } = req.params;

    try {
        await userRepo.destroy(id);
        return res.handler.respondWithData('User deleted', true);
    } catch (error) {
        console.error('❌ Error in userDeleteController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }
} 
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}

const createUserListController = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'controllers', 'api', 'users');
    
    // File
    const filePath = path.join(folderPath, 'userListController.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { response, request } from 'express';
import { UserRepository } from '../../../repositories/users/userRepository.js';


const userRepo = new UserRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const userListController = async(req = request, res = response) => {

    try {
        const data = await userRepo.list();
        return res.handler.respondWithData('User list', data);

    } catch (error) {
        console.error('❌ Error en userListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}

const createUserShowController = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'controllers', 'api', 'users');
    
    // File
    const filePath = path.join(folderPath, 'userShowController.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { response } from "express";
import User from "../../../models/User.js";
import { UserRepository } from "../../../repositories/users/userRepository.js";



const userRepo = new UserRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const userShowController = async(req, res = response) => {
    
    const { id } = req.params;

    try {
        const data = await userRepo.show(id);

        return res.handler.respondWithData('User show', data);

    } catch (error) {
        console.error('❌ Error en userListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}

const createUserStoreController = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'controllers', 'api', 'users');
    
    // File
    const filePath = path.join(folderPath, 'userStoreController.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { response, request } from 'express';
import bcrypt from 'bcryptjs';
import { UserRepository } from '../../../repositories/users/userRepository.js';


const userRepo = new UserRepository();



/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const userStoreController = async(req, res = response) => {

    const { 
        user_status_id,
        name, 
        email,
        password,
    } = req.body;

    const dataNew = {
        user_status_id,
        name, 
        email,
        password,
    };


    const salt = bcrypt.genSaltSync();
    dataNew.password = bcrypt.hashSync(password, salt);


    try {

        const data = await userRepo.store(dataNew);

        return res.handler.respondWithData(data, 'User created');
        
    } catch (error) {
        console.error('❌ Error en userListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}

const createUserUpdateController = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'controllers', 'api', 'users');
    
    // File
    const filePath = path.join(folderPath, 'userUpdateController.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { response } from "express";
import bcrypt from 'bcryptjs';
import { UserRepository } from "../../../repositories/users/userRepository.js";


const userRepo = new UserRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const userUpdateController = async(req, res = response) => {

    const { id } = req.params;

    const { 
        user_status_id,
        name, 
        email,
        password,
    } = req.body;


    const dataToUpdate = {};


    if (user_status_id !== undefined) dataToUpdate.user_status_id = user_status_id;
    if (name !== undefined) dataToUpdate.name = name;
    if (email !== undefined) dataToUpdate.email = email;
    if (password) {
        const salt = bcrypt.genSaltSync();
        dataToUpdate.password = bcrypt.hashSync(password, salt);
    }


    try {
        const data = await userRepo.update(id, dataToUpdate);
        return res.handler.respondWithData('User list', data);

    } catch (error) {
        console.error('❌ Error en userListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}