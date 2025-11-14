import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";
import { runExec } from "../../../helpers/helperFile.js";
import { printMessage } from "../../../helpers/inquirer.js";
import {
  addHeaderLine,
  addModuleImport,
} from "../helpers/helperFileWrite.js";

export const generateEnv = async (fullPath) => {
  await install(fullPath);
  await createFileEnv(fullPath);
  await createFileEnvTemplate(fullPath);
  await createHeaderLine(fullPath);
  await createModuleLine(fullPath);
};

/**
 * Install Config
 *
 * @param {*} fullPath
 */
const install = async (fullPath) => {
  printMessage("Intalando nestjs/config...", "cyan");
  await runExec("npm i @nestjs/config", fullPath);
  printMessage("nestjs/config instalado correctamente.", "green");
};

/**
 * Create ENV
 *
 * @param {*} fullPath
 */
const createFileEnv = async (fullPath) => {
  // Folder
  const folderPath = path.join(fullPath);

  // File
  const filePath = path.join(folderPath, ".env");

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  // Code
  const code = `DB_HOST=localhost
DB_NAME=TesloDB
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=MyS3cr3tPass

HOST_PORT=3000
HOST_API=http://localhost:3000/api/v1/
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }
};

/**
 * Create ENV Template
 *
 * @param {*} fullPath
 */
const createFileEnvTemplate = async (fullPath) => {
  // Folder
  const folderPath = path.join(fullPath);

  // File
  const filePath = path.join(folderPath, ".env.template");

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  // Code
  const code = `DB_HOST=localhost
DB_NAME=TesloDB
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=MyS3cr3tPass

HOST_PORT=3000
HOST_API=http://localhost:3000/api/v1/
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }
};

/**
 * PARTE 1: AÑADIR IMPORTS
 */
const createHeaderLine = async (fullPath) => {
  const filePath = path.join(fullPath, "src", "app.module.ts");
  addHeaderLine(filePath, `import { ConfigModule } from '@nestjs/config';`);
};

/**
 * PARTE 2: AÑADIR ConfigModule A imports:[]
 */
const createModuleLine = async (fullPath) => {
  const filePath = path.join(fullPath, "src", "app.module.ts");
  addModuleImport(filePath, `ConfigModule.forRoot(),`);
};
