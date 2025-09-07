import { response } from "express";
import { CountryRepository } from "../../../repositories/countries/countryRepository.js";



const repository = new CountryRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const countryShowController = async(req, res = response) => {
    
    const { id } = req.params;

    try {
        const data = await repository.show(id);

        return res.handler.respondWithData('Country show', data);

    } catch (error) {
        console.error('❌ Error en countryListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}   
