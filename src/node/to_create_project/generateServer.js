import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';


export const generateServer = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'server');
    
    // File
    const filePath = path.join(folderPath, 'server.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import express from 'express';
import cors from 'cors';
import { attachBaseController } from '../middlewares/attachBaseController.js';

import authRoutes from '../routes/api/authRoutes.js';
import categoryRoutes from '../routes/api/categoryRoutes.js';
import itemRoutes from '../routes/api/itemRoutes.js';

import abilityGroupRoutes from '../routes/shared/abilityGroupRoutes.js';
import abilityRoutes from '../routes/shared/abilityRoutes.js';
import abilityUserRoutes from '../routes/shared/abilityUserRoutes.js';
import roleUserRoutes from '../routes/shared/roleUserRoutes.js';
import userRoutes from '../routes/shared/userRoutes.js';
import devRoutes from '../routes/dev/devRoutes.js';



export class Server {
    
    constructor() {
        
        this.app = express();
        this.port = process.env.PORT;
        //this.path = {};

        this.pathApi = {
            auth: '/api/v1/auth',
            categories: '/api/v1/categories',
            items: '/api/v1/items', 
        }

        this.pathShared = {
            abilityGroups: '/api/v1/ability-groups',
            abilities: '/api/v1/abilities',
            abilityUsers: '/api/v1/ability-users',
            roleUsers: '/api/v1/ability-users',
            users: '/api/v1/users',
        }

        this.pathDev = {
            dev: '/api/v1/dev/test',
        }

        // Midlewares
        this.midlewares();

        // Routes app
        this.routes();
    }


    midlewares(){

        // Dir public
        this.app.use( express.static('public') );

        //Cors
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Form-data body
        this.app.use(express.urlencoded({ extended: true })); // para form-data

        // Base Controller
        this.app.use( attachBaseController );

    }


    routes(){

        // shared
        this.app.use( this.pathShared.abilityGroups, abilityGroupRoutes);
        this.app.use( this.pathShared.abilities, abilityRoutes);
        this.app.use( this.pathShared.abilityUsers, abilityUserRoutes);
        this.app.use( this.pathShared.roleUsers, roleUserRoutes);
        this.app.use( this.pathShared.userUsers, userRoutes);
        
        //dev
        this.app.use( this.pathDev.devUsers, devRoutes);


        // api
        this.app.use( this.pathApi.auth, authRoutes);
        this.app.use( this.pathApi.categories, categoryRoutes);
        this.app.use( this.pathApi.items, itemRoutes);
        
        
        //TODO Others routes
        
    }


    listen(){
        this.app.listen( this.port, () => {
            console.log(\`Servidor ejecutandose en el puerto: \${ this.port }\`);
        });
    }

}
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}