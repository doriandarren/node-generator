import express from 'express';
import cors from 'cors';
import authRoutes from '../routes/authRoutes.js';
import userRoutes from '../routes/userRoutes.js';
import { attachBaseController } from '../middlewares/attachBaseController.js';


export class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.path = {
            auth: '/api/auth',
            users: '/api/users',
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

        //TODO Others routes
        
    }


    listen(){
        this.app.listen( this.port, ()=> {
            console.log(`Servidor ejecutandose en el puerto: ${ this.port }`);
        });
    }

}
