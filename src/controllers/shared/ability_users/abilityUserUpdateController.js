import { response } from "express";
import { AbilityUserRepository } from '../../../repositories/ability_users/abilityUserRepository.js';


const repository = new AbilityUserRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const abilityUserUpdateController = async(req, res = response) => {

    const { id } = req.params;

    const { 
       user_id,
        ability_id
    } = req.body;

    const dataToUpdate = {};

    if (user_id !== undefined) dataToUpdate.user_id = user_id;
    if (ability_id !== undefined) dataToUpdate.ability_id = ability_id;

    try {
        const data = await repository.update(id, dataToUpdate);
        return res.handler.respondWithData('AbilityUser list', data);

    } catch (error) {
        console.error('❌ Error en abilityUserListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}
