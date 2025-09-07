import { response } from "express";
import { UserStatusRepository } from "../../../repositories/user_statuses/userStatusRepository.js";



const repository = new UserStatusRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const userStatusShowController = async(req, res = response) => {
    
    const { id } = req.params;

    try {
        const data = await repository.show(id);

        return res.handler.respondWithData('UserStatus show', data);

    } catch (error) {
        console.error('❌ Error en userStatusListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}   
