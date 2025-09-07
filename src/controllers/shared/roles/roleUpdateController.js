import { response } from "express";
import { RoleRepository } from '../../../repositories/roles/roleRepository.js';


const repository = new RoleRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const roleUpdateController = async(req, res = response) => {

    const { id } = req.params;

    const { 
       name,
        description
    } = req.body;

    const dataToUpdate = {};

    if (name !== undefined) dataToUpdate.name = name;
    if (description !== undefined) dataToUpdate.description = description;

    try {
        const data = await repository.update(id, dataToUpdate);
        return res.handler.respondWithData('Role list', data);

    } catch (error) {
        console.error('❌ Error en roleListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}
