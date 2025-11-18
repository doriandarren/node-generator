import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";
import { addHeaderLine, addModuleImport } from "../helpers/helperFileWrite.js";

export const generateLogWinston = async (fullPath) => {
  await install(fullPath);
  await createLogWinston(fullPath);

  await addFileImport(fullPath);
  await addFileToImports(fullPath);
};

const install = async (fullPath) => {
  printMessage("Intalando winston...", "cyan");
  await runExec(
    "npm install winston nest-winston winston-daily-rotate-file",
    fullPath
  );
  printMessage("winston instalado correctamente.", "green");
};

const createLogWinston = async (fullPath) => {
  // Folder
  const folderPath = path.join(fullPath, "src", "logger");

  // File
  const filePath = path.join(folderPath, "logger.config.ts");

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  // Code
  const code = `import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

export const winstonConfig = {
  transports: [

    // 📌 ROTACIÓN DIARIA — logs generales
    new winstonDaily({
      dirname: 'logs',                    // carpeta donde guardar
      filename: 'app-%DATE%.log',         // archivo diario
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,                // comprime logs antiguos
      maxSize: '20m',                     // tamaño máximo por archivo
      maxFiles: '14d',                    // guarda 14 días
      level: 'info',
    }),

    // 📌 ROTACIÓN DIARIA — ONLY ERRORS
    new winstonDaily({
      dirname: 'logs',
      filename: 'error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '10m',
      //maxFiles: '30d',    // guarda 30 días máximo
      level: 'error',
    }),

    // 📌 Consola bonita
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('APP', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
  ],
};   
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }
};

/**
 * PARTE 1: AGREGAR IMPORTS NECESARIOS
 */
const addFileImport = async (fullPath) => {
  const filePath = path.join(fullPath, "src", "app.module.ts");
  addHeaderLine(
    filePath,
    `import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './logger/logger.config';`
  );
};

/**
 * PARTE 2: AGREGAR TypeOrmModule A imports:[]
 */
const addFileToImports = async (fullPath) => {
  const filePath = path.join(fullPath, "src", "app.module.ts");

  addModuleImport(filePath, `WinstonModule.forRoot(winstonConfig),`);
};
