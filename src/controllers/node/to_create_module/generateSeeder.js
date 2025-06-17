import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';


export const generateSeeder = async(
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
    const folderPath = path.join(fullPath, 'src', 'database', 'seeders', pluralNameSnake);
    
    // File
    const filePath = path.join(folderPath, `${singularNameCamel}Seeder.js`);

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Generar datos falsos por columna
    const fakerFields = columns.map((col, i) => {
        if(i==0){
            return `${col.name}: fake.lorem.word(),`;
        }else{
            return `        ${col.name}: fake.lorem.word(),`;
        }
    }).join('\n');


    // Code
    const code = `
import { faker } from '@faker-js/faker';
import { ${singularName} } from '../../../models/${singularName}.js';

export async function seed${pluralName}() {
  try {
    const data = [];

    for (let i = 0; i < 10; i++) {
      const fake = faker;

      data.push({
        ${fakerFields}
      });
    }

    await ${singularName}.bulkCreate(data);
    console.log('✅ Datos falsos insertados en ${pluralNameSnake}');
  } catch (error) {
    console.error('❌ Error al insertar datos falsos en ${pluralNameSnake}:', error);
  }
}    
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }

}