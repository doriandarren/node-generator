import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";
import { addHeaderLine, addModuleImport } from "../helpers/helperFileWrite.js";

export const addModuleIntoAppModuleTS = async (
  fullPath,
  namespace,
  singularName,
  pluralName,
  singularNameKebab,
  pluralNameKebab,
  singularNameSnake,
  pluralNameSnake,
  singularNameCamel,
  pluralNameCamel,
  columns
) => {
  // File
  const header = `import { ${pluralName}Module } from './${namespace}/${pluralNameKebab}/${pluralNameKebab}.module';`;
  const body = `${pluralName}Module`;

  await createHeaderLine(fullPath, header);
  await createModuleLine(fullPath, body);
};

/**
 * Agrega los imports al inicio del archivo
 */
const createHeaderLine = async (fullPath, header) => {
  const filePath = path.join(fullPath, "src", "app.module.ts");
  addHeaderLine(filePath, header);
};

/**
 * Agrega la configuración al array imports dentro de @Module
 */
const createModuleLine = async (fullPath, body) => {
  const filePath = path.join(fullPath, "src", "app.module.ts");

  addModuleImport(filePath, body);
};
