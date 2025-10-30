import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";
import { runExec } from "../../../helpers/helperFile.js";
import { printMessage } from "../../../helpers/inquirer.js";

export const generateServeStatic = async (fullPath) => {
  await install(fullPath);
  await addImports(fullPath);
  await addServeStaticToImports(fullPath);
};

const install = async (fullPath) => {
  printMessage("Intalando serve-static...", "cyan");
  await runExec("npm i @nestjs/serve-static", fullPath);
  printMessage("serve-static instalado correctamente.", "green");
};

const addImports = async (fullPath) => {
  const filePath = path.join(fullPath, "src", "app.module.ts");

  if (!fs.existsSync(filePath)) {
    printMessage(`❌ No se encontró el archivo: ${filePath}`, "red");
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");

  const importServeStatic = `import { ServeStaticModule } from '@nestjs/serve-static';`;
  const importJoin = `import { join } from 'path';`;

  // Verificar si ya existen
  const hasServeStatic = content.includes(importServeStatic);
  const hasJoin = content.includes(importJoin);

  // Si ya están, no hacer nada
  if (hasServeStatic && hasJoin) {
    printMessage("✅ Los imports ya existen en app.module.ts", "green");
    return;
  }

  // Encontrar la primera línea de import y añadir los nuevos debajo
  const lines = content.split("\n");
  const firstImportIndex = lines.findIndex((line) => line.startsWith("import"));

  // Si hay imports, insertamos después del último bloque de imports
  let insertIndex = firstImportIndex;
  for (let i = firstImportIndex + 1; i < lines.length; i++) {
    if (lines[i].startsWith("import")) insertIndex = i;
    else break;
  }

  const importsToAdd = [];
  if (!hasServeStatic) importsToAdd.push(importServeStatic);
  if (!hasJoin) importsToAdd.push(importJoin);

  // Insertar nuevas líneas de import
  lines.splice(insertIndex + 1, 0, ...importsToAdd);

  const updatedContent = lines.join("\n");
  fs.writeFileSync(filePath, updatedContent, "utf8");

  printMessage("✅ Imports añadidos correctamente a app.module.ts", "green");
};



const addServeStaticToImports = async (fullPath) => {
  const filePath = path.join(fullPath, "src", "app.module.ts");

  if (!fs.existsSync(filePath)) {
    printMessage(`❌ No se encontró el archivo: ${filePath}`, "red");
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");

  // Bloque a insertar
  const serveStaticBlock = `ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    })`;

  // 1️⃣ Si ya existe, no hacer nada
  if (content.includes("ServeStaticModule.forRoot")) {
    printMessage(
      "✅ ServeStaticModule ya está configurado en app.module.ts",
      "green"
    );
    return;
  }

  // 2️⃣ Buscar el decorador @Module
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

  // 3️⃣ Ver si ya hay un array imports:
  const importsRegex = /imports\s*:\s*\[([\s\S]*?)\]/m;

  let updatedInside;

  if (importsRegex.test(inside)) {
    // Ya existe imports → añadimos el bloque
    updatedInside = inside.replace(importsRegex, (m, arr) => {
      const trimmed = arr.trim();
      if (trimmed === "") {
        return `imports: [\n    ${serveStaticBlock}\n  ]`;
      } else {
        return `imports: [\n    ${trimmed},\n    ${serveStaticBlock}\n  ]`;
      }
    });
  } else {
    // No existe imports → lo creamos
    updatedInside = `imports: [\n    ${serveStaticBlock}\n  ],\n` + inside;
  }

  // 4️⃣ Reemplazar el decorador completo en el contenido
  const updatedDecorator = fullMatch.replace(inside, updatedInside);
  content = content.replace(fullMatch, updatedDecorator);

  // 5️⃣ Guardar archivo
  fs.writeFileSync(filePath, content, "utf8");

  printMessage(
    "✅ ServeStaticModule añadido dentro de imports: en app.module.ts",
    "green"
  );
};
