import fs from "fs";
import path from "path";
import { createFolder, runExec } from "../../../helpers/helperFile.js";
import { printMessage } from "../../../helpers/inquirer.js";

export const generateMappedTypes = async (fullPath) => {
  await install(fullPath);
};

const install = async (fullPath) => {
  printMessage("Intalando MappedTypes...", "cyan");
  await runExec("npm install @nestjs/mapped-types", fullPath);
  printMessage("MappedTypes instalado correctamente.", "green");
};
