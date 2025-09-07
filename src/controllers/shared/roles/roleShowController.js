import { response } from "express";
import { RoleRepository } from "../../../repositories/roles/roleRepository.js";



const repository = new RoleRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const roleShowController = async(req, res = response) => {
    
    const { id } = req.params;

    try {
        const data = await repository.show(id);

        return res.handler.respondWithData('Role show', data);

    } catch (error) {
        console.error('❌ Error en roleListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}   
