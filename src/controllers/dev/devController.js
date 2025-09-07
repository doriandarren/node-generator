import { response } from "express";

export const devController = async(req, res = response) => {

    //TODO

    return res.json({
        msg: 'API - dev'
    });
}    
