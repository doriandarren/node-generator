import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";
import { runExec } from "../../../helpers/helperFile.js";
import { printMessage } from "../../../helpers/inquirer.js";

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
 *
 * @param {*} fullPath
 * @returns
 */
const addTypeOrmImport = async (fullPath) => {
  const filePath = path.join(fullPath, "src", "app.module.ts");

  if (!fs.existsSync(filePath)) {
    printMessage(`❌ No se encontró el archivo: ${filePath}`, "red");
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");

  const importTypeOrm = `import { TypeOrmModule } from '@nestjs/typeorm';`;

  if (content.includes(importTypeOrm)) {
    printMessage(
      "✅ El import de TypeOrmModule ya existe en app.module.ts",
      "green"
    );
    return;
  }

  const lines = content.split("\n");

  // Insertar debajo del último import existente
  const firstImportIndex = lines.findIndex((line) => line.startsWith("import"));
  if (firstImportIndex === -1) {
    lines.unshift(importTypeOrm, "");
  } else {
    let insertIndex = firstImportIndex;
    for (let i = firstImportIndex + 1; i < lines.length; i++) {
      if (lines[i].startsWith("import")) insertIndex = i;
      else break;
    }
    lines.splice(insertIndex + 1, 0, importTypeOrm);
  }

  fs.writeFileSync(filePath, lines.join("\n"), "utf8");
  printMessage("✅ Import de TypeOrmModule añadido en app.module.ts", "green");
};

/**
 * PARTE 2: AGREGAR TypeOrmModule A imports:[]
 *
 * @param {*} fullPath
 * @returns
 */
const addTypeOrmToImports = async (fullPath) => {
  const filePath = path.join(fullPath, "src", "app.module.ts");

  if (!fs.existsSync(filePath)) {
    printMessage(`❌ No se encontró el archivo: ${filePath}`, "red");
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");

  // Si ya existe una configuración de TypeOrmModule, no duplicar
  if (content.includes("TypeOrmModule.forRoot")) {
    printMessage(
      "✅ TypeOrmModule.forRoot ya está configurado en app.module.ts",
      "green"
    );
    return;
  }

  // Buscar decorador @Module
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

  // Bloque a insertar
  const typeOrmBlock = `TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true, //Ojo con este
    })`;

  let updatedInside;

  if (importsRegex.test(inside)) {
    updatedInside = inside.replace(importsRegex, (m, arr) => {
      let newArr = arr.trim();

      // Buscamos ConfigModule.forRoot para insertar justo después
      if (newArr.includes("ConfigModule.forRoot")) {
        newArr = newArr.replace(
          /(ConfigModule\.forRoot\([^)]*\)\s*,?)/,
          `$1\n    ${typeOrmBlock},`
        );
        return `imports: [\n    ${newArr}\n  ]`;
      }

      // Si no hay ConfigModule, solo añadir al final
      if (newArr === "") {
        return `imports: [\n    ${typeOrmBlock}\n  ]`;
      } else {
        return `imports: [\n    ${newArr},\n    ${typeOrmBlock}\n  ]`;
      }
    });
  } else {
    // No existe imports → crear desde cero
    updatedInside = `imports: [\n    ${typeOrmBlock}\n  ],\n${inside}`;
  }

  const updatedDecorator = fullMatch.replace(inside, updatedInside);
  content = content.replace(fullMatch, updatedDecorator);

  fs.writeFileSync(filePath, content, "utf8");
  printMessage(
    "✅ TypeOrmModule añadido dentro de imports: en app.module.ts",
    "green"
  );
};
