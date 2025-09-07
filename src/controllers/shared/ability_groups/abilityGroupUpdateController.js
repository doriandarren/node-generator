import { response } from "express";
import { AbilityGroupRepository } from '../../../repositories/ability_groups/abilityGroupRepository.js';


const repository = new AbilityGroupRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const abilityGroupUpdateController = async(req, res = response) => {

    const { id } = req.params;

    const { 
       name
    } = req.body;

    const dataToUpdate = {};

    if (name !== undefined) dataToUpdate.name = name;

    try {
        const data = await repository.update(id, dataToUpdate);
        return res.handler.respondWithData('AbilityGroup list', data);

    } catch (error) {
        console.error('❌ Error en abilityGroupListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}
