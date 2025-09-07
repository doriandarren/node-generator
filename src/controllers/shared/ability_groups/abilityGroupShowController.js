import { response } from "express";
import { AbilityGroupRepository } from "../../../repositories/ability_groups/abilityGroupRepository.js";



const repository = new AbilityGroupRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const abilityGroupShowController = async(req, res = response) => {
    
    const { id } = req.params;

    try {
        const data = await repository.show(id);

        return res.handler.respondWithData('AbilityGroup show', data);

    } catch (error) {
        console.error('❌ Error en abilityGroupListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}   
