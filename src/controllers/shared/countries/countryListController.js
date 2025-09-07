import { response, request } from 'express';
import { CountryRepository } from '../../../repositories/countries/countryRepository.js';


const repository = new CountryRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const countryListController = async(req = request, res = response) => {

    try {
        const data = await repository.list();
        return res.handler.respondWithData('Country list', data);

    } catch (error) {
        console.error('❌ Error en countryListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}    
