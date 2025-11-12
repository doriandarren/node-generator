import fs from "fs";
import path from "path";
import { runExec } from "../../../helpers/helperFile.js";
import { printMessage } from "../../../helpers/inquirer.js";
import { createFolder } from "../../../helpers/helperFile.js";
import {
  addHeaderLine,
  addModuleImport,
} from "../helpers/helperFileWrite.js";

export const generateServeStatic = async (fullPath) => {
  await install(fullPath);
  await createHeaderLine(fullPath);
  await createModuleLine(fullPath);
  await createIndexHTML(fullPath);
};

/**
 * Install Dependencies
 *
 * @param {*} fullPath
 */
const install = async (fullPath) => {
  printMessage("Intalando serve-static...", "cyan");
  await runExec("npm i @nestjs/serve-static", fullPath);
  printMessage("serve-static instalado correctamente.", "green");
};

/**
 * Agrega los imports al inicio del archivo
 */
const createHeaderLine = async (fullPath) => {
  const filePath = path.join(fullPath, "src", "app.module.ts");
  addHeaderLine(
    filePath,
    `import { ServeStaticModule } from '@nestjs/serve-static';`
  );
  addHeaderLine(filePath, `import { join } from 'path';`);
};

/**
 * Agrega la configuración al array imports dentro de @Module
 */
const createModuleLine = async (fullPath) => {
  const filePath = path.join(fullPath, "src", "app.module.ts");

  addModuleImport(
    filePath,
    `ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),`
  );
};

const createIndexHTML = async (fullPath) => {
  // Folder
  const folderPath = path.join(fullPath, "public");

  // File
  const filePath = path.join(folderPath, "index.html");

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  // Code
  const code = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/styles.css">
    <title>Pokedex</title>
</head>
<body>

    <h1>Sitio Web</h1>
    
</body>
</html>
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }
};
