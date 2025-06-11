import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';
import { formatDateTimeForMigration } from '../../../helpers/helperDate.js';


export const generateMigration = async(
  fullPath, 
  namespace,
  singularName,
  pluralName,
  singularNameKebab,
  pluralNameKebab,
  singularNameSnake,
  pluralNameSnake,
  singularNameCamel,
  pluralNameCamel,
  columns
) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'scripts');
    
    
    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // File
    const timestamp = formatDateTimeForMigration();
    const fileName = `${timestamp}_create_${singularNameSnake}.js`;
    const filePath = path.join(folderPath, fileName);



    // Code
    const code = `
import sequelize from '../../database/settings/config.js';

/**********
 * Models
 **********/
import '../../models/${singularName}.js';

async function create${singularName}Table() {
  try {
    await sequelize.authenticate();
    console.log('🔌 Conectado a la base de datos');

    await sequelize.sync({ force: false, alter: true });
    console.log('📦 Tabla ${singularName} sincronizada con éxito');
  } catch (error) {
    console.error('❌ Error al sincronizar la tabla ${singularName}:', error);
  } finally {
    await sequelize.close();
  }
}

create${singularName}Table();    
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }

}