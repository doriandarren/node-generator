import { response } from "express";
import { AbilityUserRepository } from "../../../repositories/ability_users/abilityUserRepository.js";



const repository = new AbilityUserRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const abilityUserShowController = async(req, res = response) => {
    
    const { id } = req.params;

    try {
        const data = await repository.show(id);

        return res.handler.respondWithData('AbilityUser show', data);

    } catch (error) {
        console.error('❌ Error en abilityUserListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}   
