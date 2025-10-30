import fs from "fs";
import path from "path";
import { runExec } from "../../../helpers/helperFile.js";
import { printMessage } from "../../../helpers/inquirer.js";

export const generateCommandLine = async (fullPath) => {
  await createProject(fullPath);
  await deleteDefaultFiles(fullPath);
  await cleanAppModuleImports(fullPath);
  await deletePrettier(fullPath);
};

/**
 * Crea el Proyecto
 * @param {fullPath} fullPath
 */
const createProject = async (fullPath) => {
  const projectDir = path.dirname(fullPath);
  const projectName = path.basename(fullPath);

  // Verificar si la carpeta base existe
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
    printMessage(`Directorio base ${projectDir} creado.`, "green");
  }

  printMessage(`🚀 Creando el proyecto NestJS...`, "cyan");
  await runExec(
    `nest new ${projectName} --skip-git --package-manager npm`,
    projectDir
  );

  printMessage(
    `✅ Proyecto NestJS creado en: ${path.join(projectDir, projectName)}`,
    "green"
  );
};

/**
 * BORRA LOS ARCHIVOS POR DEFECTO DE NEST
 *
 * @param {*} fullPath
 */
const deleteDefaultFiles = async (fullPath) => {
  const projectDir = path.join(fullPath, "src");
  const filesToDelete = [
    "app.controller.ts",
    "app.controller.spec.ts",
    "app.service.ts",
  ];

  printMessage(`🧹 Limpiando archivos iniciales...`, "cyan");

  filesToDelete.forEach((file) => {
    const filePath = path.join(projectDir, file);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        printMessage(`🗑️  Eliminado: ${file}`, "yellow");
      } catch (err) {
        printMessage(`❌ Error al eliminar ${file}: ${err.message}`, "red");
      }
    }
  });

  printMessage("✅ Limpieza completada.", "green");
};

/**
 * LIMPIA IMPORTS Y REFERENCIAS EN app.module.ts
 *
 * @param {*} fullPath
 * @returns
 */
const cleanAppModuleImports = async (fullPath) => {
  const appModulePath = path.join(fullPath, "src", "app.module.ts");

  if (!fs.existsSync(appModulePath)) {
    printMessage(
      `⚠️ No se encontró app.module.ts en ${appModulePath}`,
      "yellow"
    );
    return;
  }

  try {
    let content = fs.readFileSync(appModulePath, "utf8");

    // 1️⃣ Eliminar las líneas de importación específicas
    content = content
      .split("\n")
      .filter(
        (line) =>
          !line.includes("import { AppController } from './app.controller'") &&
          !line.includes("import { AppService } from './app.service'")
      )
      .join("\n");

    // 2️⃣ Eliminar las referencias dentro del decorador @Module
    content = content
      .split("\n")
      .filter(
        (line) =>
          !line.trim().startsWith("controllers: [AppController],") &&
          !line.trim().startsWith("providers: [AppService],")
      )
      .join("\n");

    // 3️⃣ Limpieza visual (elimina espacios o líneas vacías extra)
    content = content.replace(/\n{3,}/g, "\n\n");

    fs.writeFileSync(appModulePath, content, "utf8");
    printMessage(
      "🧽 Limpieza completa de imports y referencias en app.module.ts.",
      "green"
    );
  } catch (err) {
    printMessage(`❌ Error al limpiar app.module.ts: ${err.message}`, "red");
  }
};

/**
 * Borra el Prettier
 *
 * @param {*} fullPath
 */
const deletePrettier = async (fullPath) => {
  printMessage("Elimando Prettier...", "cyan");
  await runExec(
    "npm remove prettier eslint-config-prettier eslint-plugin-prettier",
    fullPath
  );
  printMessage("Prettier eliminado correctamente.", "green");
};
