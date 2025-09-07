import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";

export const generateModel = async (
  fullPath,
  namaspace,
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
  const folderPath = path.join(fullPath, "src", "models");

  // File
  const filePath = path.join(folderPath, `${singularName}.js`);

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  // const properties = columns
  //   .map((col, index) => {
  //     let str = "";

  //     if (index == 0) {
  //       str += `${col.name}: {
  //   type: DataTypes.${col.type},
  //   allowNull: ${col.allowNull}
  // }`;
  //     } else {
  //       str += `  ${col.name}: {
  //   type: DataTypes.${col.type},
  //   allowNull: ${col.allowNull}
  // }`;
  //     }
  //     return str;
  //   })
  //   .join(",\n");


  const properties = columns
  .map((col, index) => {
      // Detectar si es clave foránea
      const isForeignKey = col.name.toLowerCase().includes("_id");
      const dataType = isForeignKey ? "BIGINT" : "STRING";

      const indentation = index === 0 ? "" : "  ";

      return `${indentation}${col.name}: {
    type: DataTypes.${dataType},
    allowNull: ${col.allowNull}
  }`;
  })
  .join(",\n");



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
  tableName: '${pluralNameSnake}',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
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
};
