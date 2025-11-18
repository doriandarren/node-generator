import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";

export const generateCronSchedule = async (fullPath) => {
  await installSchedule(fullPath);
  await installCron(fullPath);
};

const installSchedule = async (fullPath) => {
  printMessage("Intalando @nestjs/schedule...", "cyan");
  await runExec("npm install @nestjs/schedule", fullPath);
  printMessage("@nestjs/schedule instalado correctamente.", "green");
};

const installCron = async (fullPath) => {
  printMessage("Intalando @types/cron...", "cyan");
  await runExec("npm install --save-dev @types/cron", fullPath);
  printMessage("@types/cron instalado correctamente.", "green");
};
