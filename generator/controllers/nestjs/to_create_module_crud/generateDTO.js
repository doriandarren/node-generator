import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";



export const generateDTO = async (
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

    await createFile(fullPath,
  namespace,
  singularName,
  pluralName,
  singularNameKebab,
  pluralNameKebab,
  singularNameSnake,
  pluralNameSnake,
  singularNameCamel,
  pluralNameCamel,
  columns);
    await updateFile(fullPath,
  namespace,
  singularName,
  pluralName,
  singularNameKebab,
  pluralNameKebab,
  singularNameSnake,
  pluralNameSnake,
  singularNameCamel,
  pluralNameCamel,
  columns);

}




const createFile = async (
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
  const folderPath = path.join(
    fullPath,
    "src",
    namespace,
    pluralNameKebab,
    "dto"
  );

  // File
  const filePath = path.join(folderPath, `create-${singularNameKebab}.dto.ts`);

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  // Code
  const code = `export class Create${singularName}Dto {}`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }
};



const updateFile = async (
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
  const folderPath = path.join(
    fullPath,
    "src",
    namespace,
    pluralNameKebab,
    "dto"
  );

  // File
  const filePath = path.join(folderPath, `update-${singularNameKebab}.dto.ts`);

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  // Code
  const code = `import { PartialType } from '@nestjs/mapped-types';
import { Create${singularName}Dto } from './create-${singularNameKebab}.dto';

export class Update${singularName}Dto extends PartialType(Create${singularName}Dto) {}
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }
};