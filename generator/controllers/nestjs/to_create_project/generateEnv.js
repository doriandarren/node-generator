import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";
import { runExec } from "../../../helpers/helperFile.js";
import { printMessage } from "../../../helpers/inquirer.js";
import { addHeaderLine, addModuleLine } from "../helpers/helperNestAppModule.js";

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
DB_NAME=
DB_PORT=5432
DB_USERNAME=
DB_PASSWORD=
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
  addModuleLine(filePath, `ConfigModule.forRoot(),`);
};