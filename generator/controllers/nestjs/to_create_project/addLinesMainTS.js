import fs from "fs";
import path from "path";
import { replaceLineInFile } from "../../../helpers/helperFile.js";
import { printMessage } from "../../../helpers/inquirer.js";

export const addLinesMainTS = async (fullPath) => {
  await createSetGlobalPrefix(fullPath);
  await createValidationPipe(fullPath);
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

const createValidationPipe = async (fullPath) => {
  /**
   *  Header Imports
   */
  let searchLine = `import { AppModule } from './app.module';`;

  let newLine = `import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';`;

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
  );`;

  // File
  filePath = path.join(fullPath, "src", "main.ts");

  await replaceLineInFile(filePath, searchLine, newLine);

  printMessage("Lineas agregadas en: main.ts", "green");
};
