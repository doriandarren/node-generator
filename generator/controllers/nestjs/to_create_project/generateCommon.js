import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";
import { addHeaderLine, addModuleImport } from "../helpers/helperFileWrite.js";

export const generateCommon = async (fullPath) => {
  await createCommon(fullPath);
  await addHeader(fullPath);
  await addBody(fullPath);
  await createPaginationDto(fullPath);
};

const createCommon = async (fullPath) => {
  // Folder
  const folderPath = path.join(fullPath, "src", "common");

  // File
  const filePath = path.join(folderPath, "common.module.ts");

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  // Code
  const code = `import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule]
})
export class CommonModule {}
    
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }
};

const addHeader = async (fullPath) => {
  const filePath = path.join(fullPath, "src", "app.module.ts");
  addHeaderLine(
    filePath,
    `import { CommonModule } from './common/common.module';`
  );
};

const addBody = async (fullPath) => {
  const filePath = path.join(fullPath, "src", "app.module.ts");

  addModuleImport(filePath, `CommonModule,`);
};

const createPaginationDto = async (fullPath) => {
  // Folder
  const folderPath = path.join(fullPath, "src", "common", "dtos");

  // File
  const filePath = path.join(folderPath, "pagination.dto.ts");

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  // Code
  const code = `import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
    
    @IsOptional()
    @IsPositive()
    @Type(() => Number) // Igual a: enableImplicitConvertion: true
    limit?: number;


    @IsOptional()
    @Min(0)
    @Type(() => Number)
    offset?: number;

}
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }
};
