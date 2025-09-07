import { response } from "express";
import { UserStatusRepository } from '../../../repositories/user_statuses/userStatusRepository.js';


const repository = new UserStatusRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const userStatusUpdateController = async(req, res = response) => {

    const { id } = req.params;

    const { 
       name
    } = req.body;

    const dataToUpdate = {};

    if (name !== undefined) dataToUpdate.name = name;

    try {
        const data = await repository.update(id, dataToUpdate);
        return res.handler.respondWithData('UserStatus list', data);

    } catch (error) {
        console.error('❌ Error en userStatusListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}
