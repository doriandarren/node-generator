import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";
import { runExec } from "../../../helpers/helperFile.js";
import { printMessage } from "../../../helpers/inquirer.js";

export const generateClassValidator = async (fullPath) => {
  await install(fullPath);
};

const install = async (fullPath) => {
  printMessage("Intalando class-validator...", "cyan");
  await runExec("npm i class-validator class-transformer", fullPath);
  printMessage("class-validator instalado correctamente.", "green");
};
