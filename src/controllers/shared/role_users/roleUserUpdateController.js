import { response } from "express";
import { RoleUserRepository } from '../../../repositories/role_users/roleUserRepository.js';


const repository = new RoleUserRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const roleUserUpdateController = async(req, res = response) => {

    const { id } = req.params;

    const { 
       user_id,
        role_id
    } = req.body;

    const dataToUpdate = {};

    if (user_id !== undefined) dataToUpdate.user_id = user_id;
    if (role_id !== undefined) dataToUpdate.role_id = role_id;

    try {
        const data = await repository.update(id, dataToUpdate);
        return res.handler.respondWithData('RoleUser list', data);

    } catch (error) {
        console.error('❌ Error en roleUserListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}
