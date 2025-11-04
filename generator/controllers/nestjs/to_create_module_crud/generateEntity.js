import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";
import { buildEntityColumns } from "../helpers/helperNestEntity.js";

export const generateEntity = async (
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
    "entities"
  );

  // File
  const filePath = path.join(
    folderPath,
    `create-${singularNameKebab}.entitiy.ts`
  );

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  const columnLines = buildEntityColumns(columns);

  // Code
  const code =
    `import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ${singularName} {
  @PrimaryGeneratedColumn('increment')
  id: number;

${columnLines}

}
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }
};
