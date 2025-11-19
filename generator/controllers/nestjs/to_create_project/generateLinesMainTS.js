import fs from "fs";
import path from "path";
import { replaceLineInFile } from "../../../helpers/helperFile.js";
import { createFolder, runExec } from "../../../helpers/helperFile.js";
import { addHeaderLine, addModuleImport } from "../helpers/helperFileWrite.js";
import { printMessage } from "../../../helpers/inquirer.js";

export const generateLinesMainTS = async (fullPath) => {

  // Set main.ts
  await createSetGlobalPrefix(fullPath);
  await createValidationPipeAndLogger(fullPath);

  // Set Logger
  await install(fullPath);
  await createLogWinston(fullPath);
  await addFileImport(fullPath);
  await addFileToImports(fullPath);

};

const createSetGlobalPrefix = async (fullPath) => {
  const searchLine = `const app = await NestFactory.create(AppModule);`;

  const newLine = `  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');`;

  // File
  const filePath = path.join(fullPath, "src", "main.ts");

  await replaceLineInFile(filePath, searchLine, newLine);

  printMessage("Lineas agregadas en: main.ts", "green");
};


/**
 * Este metodo agrega los PIPEs y el Logger
 * @param {*} fullPath 
 */
const createValidationPipeAndLogger = async (fullPath) => {
  /**
   *  Header Imports
   */
  let searchLine = `import { AppModule } from './app.module';`;

  let newLine = `import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';`;


  // File
  let filePath = path.join(fullPath, "src", "main.ts");

  await replaceLineInFile(filePath, searchLine, newLine);

  /**
   *  Body
   */
  searchLine = `app.setGlobalPrefix('api/v1');`;

  newLine = `  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));`;

  // File
  filePath = path.join(fullPath, "src", "main.ts");

  await replaceLineInFile(filePath, searchLine, newLine);

  printMessage("Lineas agregadas en: main.ts", "green");
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
import 'winston-daily-rotate-file'; // 👈 importante: registra el transporte
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

export const winstonConfig = {
  transports: [
    // 📌 ROTACIÓN DIARIA — logs generales
    new (winston.transports as any).DailyRotateFile({
      dirname: 'logs',              // carpeta donde guardar
      filename: 'app-%DATE%.log',   // archivo diario
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,          // comprime logs antiguos
      maxSize: '20m',               // tamaño máximo por archivo
      maxFiles: '14d',              // guarda 14 días
      level: 'info',
    }),

    // 📌 ROTACIÓN DIARIA — ONLY ERRORS
    new (winston.transports as any).DailyRotateFile({
      dirname: 'logs',
      filename: 'error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '10m',
      // maxFiles: '30d',
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

