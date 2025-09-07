import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';


export const generateDatabase = async(fullPath) => {
    await createConfig(fullPath);
}



const createConfig = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'database', 'settings');
    
    // File
    const filePath = path.join(folderPath, 'config.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
    // database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

export default sequelize;
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}