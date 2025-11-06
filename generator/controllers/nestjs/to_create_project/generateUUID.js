import fs from "fs";
import path from "path";
import { runExec } from "../../../helpers/helperFile.js";
import { printMessage } from "../../../helpers/inquirer.js";

export const generateUUID = async (fullPath) => {
  await installUUID(fullPath);
  await installTypesUUID(fullPath);
};

const installUUID = async (fullPath) => {
  printMessage("Intalando UUID...", "cyan");
  await runExec("npm install uuid", fullPath);
  printMessage("UUID instalado correctamente.", "green");
};

const installTypesUUID = async (fullPath) => {
  printMessage("Intalando UUID...", "cyan");
  await runExec("npm install -D @types/uuid", fullPath);
  printMessage("UUID instalado correctamente.", "green");
};
