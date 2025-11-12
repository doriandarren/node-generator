import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";
import { runExec } from "../../../helpers/helperFile.js";
import { printMessage } from "../../../helpers/inquirer.js";
import {
  addHeaderLine,
  addModuleImport,
} from "../helpers/helperNestAppModule.js";

export const generateTypeORM = async (fullPath) => {
  await install(fullPath);
  await addTypeOrmImport(fullPath);
  await addTypeOrmToImports(fullPath);
};

const install = async (fullPath) => {
  printMessage("Intalando nestjs/typeorm...", "cyan");
  await runExec("npm install --save @nestjs/typeorm typeorm pg", fullPath);
  printMessage("nestjs/typeorm instalado correctamente.", "green");
};

/**
 * PARTE 1: AGREGAR IMPORTS NECESARIOS
 */
const addTypeOrmImport = async (fullPath) => {
  const filePath = path.join(fullPath, "src", "app.module.ts");
  addHeaderLine(filePath, `import { TypeOrmModule } from '@nestjs/typeorm';`);
};

/**
 * PARTE 2: AGREGAR TypeOrmModule A imports:[]
 */
const addTypeOrmToImports = async (fullPath) => {
  const filePath = path.join(fullPath, "src", "app.module.ts");

  addModuleImport(
    filePath,
    `TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true, // ⚠️ Úsalo solo en desarrollo
    }),`
  );
};
