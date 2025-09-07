import { response } from "express";
import { AbilityRepository } from "../../../repositories/abilities/abilityRepository.js";



const repository = new AbilityRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const abilityShowController = async(req, res = response) => {
    
    const { id } = req.params;

    try {
        const data = await repository.show(id);

        return res.handler.respondWithData('Ability show', data);

    } catch (error) {
        console.error('❌ Error en abilityListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}   
