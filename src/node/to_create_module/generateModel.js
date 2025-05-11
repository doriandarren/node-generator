import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';



export const generateModel = async(fullPath, namaspace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'models');
    
    // File
    const filePath = path.join(folderPath, `${singularName}.js`);

    // Asegurar que la carpeta exista
    createFolder(folderPath);




    const properties = columns
    .map((col, index) => {
        let str = '';

        if(index == 0){
            str += `${col.name}: {
    type: DataTypes.${col.type},
    allowNull: ${col.allowNull}
  }`;
        }else{
            str += `  ${col.name}: {
    type: DataTypes.${col.type},
    allowNull: ${col.allowNull}
  }`;
        }

      return str;
    })
    .join(',\n');



    // Code
    const code = `
import { DataTypes } from 'sequelize';
import sequelize from '../database/settings/config.js';


const ${singularName} = sequelize.define('${singularName}', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  ${properties}
}, {
  tableName: '${singularNameSnake}',
  timestamps: true,
  paranoid: true
});


export default ${singularName};
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }

}