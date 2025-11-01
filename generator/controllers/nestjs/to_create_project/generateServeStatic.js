import fs from "fs";
import path from "path";
import { runExec } from "../../../helpers/helperFile.js";
import { printMessage } from "../../../helpers/inquirer.js";
import { createFolder } from "../../../helpers/helperFile.js";
import {
  addHeaderLine,
  addModuleLine,
} from "../helpers/helperNestAppModule.js";

export const generateServeStatic = async (fullPath) => {
  await install(fullPath);
  await createHeaderLine(fullPath);
  await createModuleLine(fullPath);
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

  addModuleLine(
    filePath,
    `ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),`
  );
};
