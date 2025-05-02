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
import authRoutes from '../routes/api/authRoutes.js';
import userRoutes from '../routes/api/userRoutes.js';
import categoryRoutes from '../routes/api/categoryRoutes.js';
import itemRoutes from '../routes/api/itemRoutes.js';
import { attachBaseController } from '../middlewares/attachBaseController.js';


export class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.path = {
            auth: '/api/auth',
            users: '/api/users',
            categories: '/api/categories',
            items: '/api/items' 
        }

        // Midlewares
        this.midlewares();

        // Rutas app
        this.routes();
    }


    midlewares(){

        // Directorio publico
        this.app.use( express.static('public') );

        //Cors
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // BaseController
        this.app.use( attachBaseController );

    }


    routes(){
        
        this.app.use( this.path.auth , authRoutes);

        this.app.use( this.path.users , userRoutes);

        this.app.use( this.path.categories , categoryRoutes);

        this.app.use( this.path.items , itemRoutes);

        //TODO Others routes
        
    }


    listen(){
        this.app.listen( this.port, ()=> {
            console.log(\`Servidor ejecutandose en el puerto: ${ this.port }\`);
        });
    }

}
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}