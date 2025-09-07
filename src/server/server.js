import express from 'express';
import cors from 'cors';
import { attachBaseController } from '../middlewares/attachBaseController.js';

import authRoutes from '../routes/api/authRoutes.js';
import userStatusRoutes from '../routes/shared/userStatusRoutes.js'; // Written by system
import userRoutes from '../routes/api/userRoutes.js'; // Written by system
import countryRoutes from '../routes/shared/countryRoutes.js'; // Written by system
import roleUserRoutes from '../routes/shared/roleUserRoutes.js'; // Written by system
import roleRoutes from '../routes/shared/roleRoutes.js'; // Written by system
import abilityUserRoutes from '../routes/shared/abilityUserRoutes.js'; // Written by system
import abilityGroupRoutes from '../routes/shared/abilityGroupRoutes.js'; // Written by system
import abilityRoutes from '../routes/shared/abilityRoutes.js'; // Written by system
import devRoutes from '../routes/dev/devRoutes.js';



export class Server {
    
    constructor() {
        
        this.app = express();
        this.port = process.env.PORT;

        this.pathApi = {
            users: '/api/v1/users', // Written by system

            auth: '/api/v1/auth',
        }

        this.pathShared = {
            userStatuses: '/api/v1/user-statuses', // Written by system

            countries: '/api/v1/countries', // Written by system

            roleUsers: '/api/v1/role-users', // Written by system

            roles: '/api/v1/roles', // Written by system

            abilityUsers: '/api/v1/ability-users', // Written by system

            abilityGroups: '/api/v1/ability-groups', // Written by system

            abilities: '/api/v1/abilities', // Written by system

            
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
        this.app.use( this.pathDev.dev, devRoutes);
        this.app.use( this.pathShared.abilities, abilityRoutes); // Written by system
        this.app.use( this.pathShared.abilityGroups, abilityGroupRoutes); // Written by system
        this.app.use( this.pathShared.abilityUsers, abilityUserRoutes); // Written by system
        this.app.use( this.pathShared.roles, roleRoutes); // Written by system
        this.app.use( this.pathShared.roleUsers, roleUserRoutes); // Written by system
        this.app.use( this.pathShared.countries, countryRoutes); // Written by system
        this.app.use( this.pathApi.users, userRoutes); // Written by system
        this.app.use( this.pathShared.userStatuses, userStatusRoutes); // Written by system








        
        
        //TODO Others routes
        
    }


    listen(){
        this.app.listen( this.port, () => {
            console.log(`Servidor ejecutandose en el puerto: ${ this.port }`);
        });
    }

}
