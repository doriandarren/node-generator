import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";
import { runExec } from "../../../helpers/helperFile.js";
import { printMessage } from "../../../helpers/inquirer.js";

export const generateEnv = async (fullPath) => {
  await install(fullPath);
  await createFileEnv(fullPath);
  await createFileEnvTemplate(fullPath);
  await addConfigImports(fullPath);
  await addConfigModuleToImports(fullPath);
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
 *
 * @param {*} fullPath
 * @returns
 */
const addConfigImports = async (fullPath) => {
  const filePath = path.join(fullPath, "src", "app.module.ts");
  if (!fs.existsSync(filePath)) {
    printMessage(`❌ No se encontró el archivo: ${filePath}`, "red");
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");

  const importConfig = `import { ConfigModule } from '@nestjs/config';`;

  // Evitar duplicados
  if (content.includes(importConfig)) {
    printMessage(
      "✅ El import de ConfigModule ya existe en app.module.ts",
      "green"
    );
    return;
  }

  const lines = content.split("\n");

  // Localiza el bloque de imports para insertar al final del bloque
  const firstImportIndex = lines.findIndex((line) => line.startsWith("import"));
  if (firstImportIndex === -1) {
    // No hay imports: lo ponemos al inicio
    lines.unshift(importConfig, "");
  } else {
    let insertIndex = firstImportIndex;
    for (let i = firstImportIndex + 1; i < lines.length; i++) {
      if (lines[i].startsWith("import")) insertIndex = i;
      else break;
    }
    lines.splice(insertIndex + 1, 0, importConfig);
  }

  fs.writeFileSync(filePath, lines.join("\n"), "utf8");
  printMessage("✅ Import de ConfigModule añadido en app.module.ts", "green");
};

/**
 * PARTE 2: AÑADIR ConfigModule A imports:[]
 *
 * @param {*} fullPath
 * @returns
 */
const addConfigModuleToImports = async (fullPath) => {
  const filePath = path.join(fullPath, "src", "app.module.ts");
  if (!fs.existsSync(filePath)) {
    printMessage(`❌ No se encontró el archivo: ${filePath}`, "red");
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");

  // Si ya está configurado, no tocar
  if (content.includes("ConfigModule.forRoot")) {
    printMessage(
      "✅ ConfigModule.forRoot ya está configurado en app.module.ts",
      "green"
    );
    return;
  }

  const moduleRegex =
    /@Module\s*\(\s*\{([\s\S]*?)\}\s*\)\s*export\s+class\s+\w+/m;
  const match = content.match(moduleRegex);
  if (!match) {
    printMessage(
      "❌ No se encontró el decorador @Module en app.module.ts",
      "red"
    );
    return;
  }

  const fullMatch = match[0];
  const inside = match[1];

  const importsRegex = /imports\s*:\s*\[([\s\S]*?)\]/m;

  const configBlock = `ConfigModule.forRoot(),`;

  let updatedInside;

  if (importsRegex.test(inside)) {
    // Ya existe imports -> agregamos
    updatedInside = inside.replace(importsRegex, (m, arr) => {
      const trimmed = arr.trim();
      if (trimmed === "") {
        return `imports: [\n    ${configBlock}\n  ]`;
      } else {
        // No duplicar si por algún motivo existe el texto parcial
        if (trimmed.includes("ConfigModule.forRoot")) return m;
        return `imports: [\n    ${trimmed},\n    ${configBlock}\n  ]`;
      }
    });
  } else {
    // No existe imports -> crearlo
    updatedInside = `imports: [\n    ${configBlock}\n  ],\n${inside}`;
  }

  const updatedDecorator = fullMatch.replace(inside, updatedInside);
  content = content.replace(fullMatch, updatedDecorator);

  fs.writeFileSync(filePath, content, "utf8");
  printMessage(
    "✅ ConfigModule.forRoot añadido dentro de imports: en app.module.ts",
    "green"
  );
};
