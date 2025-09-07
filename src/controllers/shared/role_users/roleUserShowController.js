import { response } from "express";
import { RoleUserRepository } from "../../../repositories/role_users/roleUserRepository.js";



const repository = new RoleUserRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const roleUserShowController = async(req, res = response) => {
    
    const { id } = req.params;

    try {
        const data = await repository.show(id);

        return res.handler.respondWithData('RoleUser show', data);

    } catch (error) {
        console.error('❌ Error en roleUserListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}   
