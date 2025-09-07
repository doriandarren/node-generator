import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';




export const generateScripts = async(fullPath) => {
    
    await createDbMigration(fullPath);
    await createDbReset(fullPath);
    await createDbTestConection(fullPath);

}




const createDbMigration = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'scripts');
    
    // File
    const filePath = path.join(folderPath, 'dbMigration.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
// src/scripts/dbAlter.js
import sequelize from '../database/settings/config.js';

/**********
 * Modelos (se registran en Sequelize)
 **********/
import Ability from '../models/Ability.js';
import AbilityGroup from '../models/AbilityGroup.js';
import AbilityUser from '../models/AbilityUser.js';
import Country from '../models/Country.js';
import Role from '../models/Role.js';
import RoleUser from '../models/RoleUser.js';
import User from '../models/User.js';
import UserStatus from '../models/UserStatus.js';


/**********
 * Relaciones entre modelos
 **********/
import '../models/initAssociations.js';



/**********
 * Seeders
 **********/
import seedUserStatuses from '../database/seeders/userStatuses/userStatusSeeder.js';
import seedRoles from '../database/seeders/roles/roleSeeder.js';
import seedUsers from '../database/seeders/users/userSeeder.js';



async function syncMigration() {
  try {
    await sequelize.authenticate();
    console.log('🔌 Conectado a la base de datos');

    await sequelize.sync({ alter: true }); // 🧠 solo aplica cambios
    console.log('✅ Estructura actualizada (sin perder datos)');

    
    // 🚀 Ejecutar seeders después de alterar la estructura
    await seedUserStatuses();
    await seedRoles();
    await seedUsers();

    console.log('✅ Seeders ejecutados con éxito');


  } catch (error) {
    console.error('❌ Error al aplicar alter:', error);
  } finally {
    await sequelize.close();
  }
}

syncMigration();
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}


const createDbReset = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'scripts');
    
    // File
    const filePath = path.join(folderPath, 'dbReset.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import sequelize from '../database/settings/config.js';
/**********
 * Models
 **********/
import '../models/UserStatus.js'; 
import '../models/User.js'; 
import '../models/Role.js'; 
import '../models/Ability.js'; 
import '../models/RoleUser.js'; 
import '../models/AbilityUser.js'; 


/**********
 * Relaciones entre modelos
 **********/
import '../models/initAssociations.js';


/**********
 * Seeders
 **********/
import { seedUsers } from '../database/seeders/users/userSeeder.js';
import { seedUserStatuses } from '../database/seeders/userStatuses/userStatusSeeder.js';
import { seedRoles } from '../database/seeders/roles/roleSeeder.js';





async function resetDatabase() {
  try {
    await sequelize.authenticate();
    console.log('🔌 Conectado a la base de datos');

    await sequelize.sync({ force: true });
    console.log('🧨 Base de datos restablecida');


    await seedUserStatuses();
    await seedRoles();

    await seedUsers();

    console.log('✅ Datos sembrados correctamente');


  } catch (error) {
    console.error('❌ Error al restablecer la base de datos:', error);
  } finally {
    await sequelize.close();
  }
}

resetDatabase();    
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}



const createDbTestConection = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'scripts');
    
    // File
    const filePath = path.join(folderPath, 'dbTestConnection.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
// testConnection.js
import sequelize from '../database/settings/config.js';

async function dbTestConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('❌ Error al conectar:', error);
  }
}

dbTestConnection();
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}


