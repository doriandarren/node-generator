import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";

export const generateModule = async (
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
  const folderPath = path.join(fullPath, "src", namespace, pluralNameKebab);

  // File
  const filePath = path.join(folderPath, `${pluralNameKebab}.module.ts`);

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  // Code
  const code = `import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${pluralName}Service } from './${pluralNameKebab}.service';
import { ${pluralName}Controller } from './${pluralNameKebab}.controller';
import { ${singularName} } from './entities/${singularNameKebab}.entity';

@Module({
  controllers: [${pluralName}Controller],
  providers: [${pluralName}Service],
  imports: [
    TypeOrmModule.forFeature([${singularName}]),    // Sincronización de la DB
  ], 
  exports: [TypeOrmModule]                          // Se puede usar en otros modulos
})
export class ${pluralName}Module {}
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }
};
