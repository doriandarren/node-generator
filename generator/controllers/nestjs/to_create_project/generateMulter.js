import fs from "fs";
import path from "path";
import { createFolder, runExec } from "../../../helpers/helperFile.js";
import { printMessage } from "../../../helpers/inquirer.js";

export const generateMulter = async (fullPath) => {
  await install(fullPath);
};

const install = async (fullPath) => {
  printMessage("Intalando Multer...", "cyan");
  await runExec("npm i -D @types/multer", fullPath);
  printMessage("Multer instalado correctamente.", "green");
};
