import fs from "fs";
import path from "path";
import { replaceLineInFile } from "../../../helpers/helperFile.js";
import { printMessage } from "../../../helpers/inquirer.js";

export const generateSetGlobalPrefix = async (fullPath) => {
  const searchLine = `const app = await NestFactory.create(AppModule);`;

  const newLine = `  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');`;

  // File
  const filePath = path.join(fullPath, "src", "main.ts");

  await replaceLineInFile(filePath, searchLine, newLine);

  printMessage("Lineas agregadas en: main.ts", "green");
};
