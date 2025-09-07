import { response } from "express";
import { UserRepository } from '../../../repositories/users/userRepository.js';


const repository = new UserRepository();


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
        email_verified_at,
        password,
        image_url
    } = req.body;

    const dataToUpdate = {};

    if (user_status_id !== undefined) dataToUpdate.user_status_id = user_status_id;
    if (name !== undefined) dataToUpdate.name = name;
    if (email !== undefined) dataToUpdate.email = email;
    if (email_verified_at !== undefined) dataToUpdate.email_verified_at = email_verified_at;
    if (password !== undefined) dataToUpdate.password = password;
    if (image_url !== undefined) dataToUpdate.image_url = image_url;

    try {
        const data = await repository.update(id, dataToUpdate);
        return res.handler.respondWithData('User list', data);

    } catch (error) {
        console.error('❌ Error en userListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}
