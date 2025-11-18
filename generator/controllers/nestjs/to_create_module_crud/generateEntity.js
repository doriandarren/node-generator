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
    `${singularNameKebab}.entity.ts`
  );

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  const columnLines = buildEntityColumns(columns);

  // Code
  const code =
    `import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: '${pluralNameSnake}'})
export class ${singularName} {

  //@PrimaryGeneratedColumn('increment')
  //id: number;

  @PrimaryGeneratedColumn('uuid')
  id: string;

${columnLines}

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

}
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }
};
