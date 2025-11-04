import fs from "fs";
import path from "path";
import { runExec, createFolder } from "../../../helpers/helperFile.js";
import { printMessage } from "../../../helpers/inquirer.js";
import {
  pascalToCamelCase,
  pascalToKebab,
  pascalToSnake,
} from "../../../helpers/helperString.js";
import { generateController } from "./generateController.js";
import { generateDTO } from "./generateDTO.js";
import { generateEntity } from "./generateEntity.js";

export const generateModuleStandardNestJS = async (
  fullPath,
  selectedComponents,
  namespace,
  singularName,
  pluralName,
  columns
) => {
  /*
  {
    fullPath: '/Users/dorian/NodeProjects/app-1',
    selectedComponents: [
      'controller',
      'dto',
      'entity',
      'service',
      'module',
      'seeder',
      'postman'
    ],
    namespace: 'API',
    singularName: 'AgendaUnloading',
    pluralName: 'AgendaUnloadings',
    columns: [
      { name: 'name', type: 'STRING', allowNull: false },
      { name: 'amount', type: 'STRING', allowNull: false },
      { name: 'description', type: 'STRING', allowNull: false }
    ]
  }
  */

  const singularNameKebab = pascalToKebab(singularName); // invoice-header
  const pluralNameKebab = pascalToKebab(pluralName); // invoice-headers
  const singularNameSnake = pascalToSnake(singularName); // invoice_header
  const pluralNameSnake = pascalToSnake(pluralName); // invoice_headers
  const singularNameCamel = pascalToCamelCase(singularName); // invoiceHeader
  const pluralNameCamel = pascalToCamelCase(pluralName); // invoiceHeaders

  // await createModule(fullPath, namespace, pluralNameKebab);

  if (selectedComponents.includes("controller")) {
    await generateController(
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
    );
  }

  if (selectedComponents.includes("dto")) {
    await generateDTO(
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
    );
  }

  if (selectedComponents.includes("entity")) {
    await generateEntity(
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
    );
  }

  // if (selectedComponents.includes("service")) {
  //   await generateService(
  //     fullPath,
  //     namespace,
  //     singularName,
  //     pluralName,
  //     singularNameKebab,
  //     pluralNameKebab,
  //     singularNameSnake,
  //     pluralNameSnake,
  //     singularNameCamel,
  //     pluralNameCamel,
  //     columns
  //   );
  // }

  // if (selectedComponents.includes("module")) {
  //   await generateModule(
  //     fullPath,
  //     namespace,
  //     singularName,
  //     pluralName,
  //     singularNameKebab,
  //     pluralNameKebab,
  //     singularNameSnake,
  //     pluralNameSnake,
  //     singularNameCamel,
  //     pluralNameCamel,
  //     columns
  //   );
  // }

  // if (selectedComponents.includes("seeder")) {
  //   await generateSeeder(
  //     fullPath,
  //     namespace,
  //     singularName,
  //     pluralName,
  //     singularNameKebab,
  //     pluralNameKebab,
  //     singularNameSnake,
  //     pluralNameSnake,
  //     singularNameCamel,
  //     pluralNameCamel,
  //     columns
  //   );
  // }

  // if (selectedComponents.includes("postman")) {
  //   await generatePostman(
  //     fullPath,
  //     namespace,
  //     singularName,
  //     pluralName,
  //     singularNameKebab,
  //     pluralNameKebab,
  //     singularNameSnake,
  //     pluralNameSnake,
  //     singularNameCamel,
  //     pluralNameCamel,
  //     columns
  //   );
  // }

};




// /**
//  * Create Module
//  *
//  * @param {*} fullPath
//  * @param {*} namespace
//  * @param {*} pluralNameKebab
//  */
// const createModule = async (fullPath, namespace, pluralNameKebab) => {

//   const targetDir = path.join(fullPath, "src", namespace);
//   const cmd = `npx nest g resource ${namespace}/${pluralNameKebab} --no-spec`;

//   // Asegura que existe src/<namespace>
//   createFolder(targetDir);

//   printMessage("Creando Modulo...", "cyan");
//   await runExec(cmd, fullPath);
//   printMessage("Módulo creado correctamente.", "green");

// };
