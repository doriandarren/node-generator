import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";

export const generateBcrypt = async (fullPath) => {
  await install(fullPath);
};

const install = async (fullPath) => {
  printMessage("Intalando bcrypt...", "cyan");
  await runExec("npm i bcrypt", fullPath);
  await runExec("npm i -D @types/bcrypt", fullPath);
  printMessage("bcrypt instalado correctamente.", "green");
};
