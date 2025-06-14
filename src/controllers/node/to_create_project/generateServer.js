import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';


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
import abilityGroupRoutes from '../routes/shared/abilityGroupRoutes.js';
import abilityRoutes from '../routes/shared/abilityRoutes.js';
import abilityUserRoutes from '../routes/shared/abilityUserRoutes.js';
import roleUserRoutes from '../routes/shared/roleUserRoutes.js';
import userRoutes from '../routes/api/userRoutes.js';
import devRoutes from '../routes/dev/devRoutes.js';



export class Server {
    
    constructor() {
        
        this.app = express();
        this.port = process.env.PORT;

        this.pathApi = {
            auth: '/api/v1/auth',
        }

        this.pathShared = {
            
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


        // Api
        this.app.use( this.pathApi.auth, authRoutes);
        
        
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