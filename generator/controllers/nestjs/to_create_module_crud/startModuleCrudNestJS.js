import inquirer from "inquirer";
import { clearScreen, pause, readInput } from "../../../helpers/inquirer.js";
import { parseColumns } from "../../../helpers/helperString.js";
import { generateModuleStandardNestJS } from "./generateModuleStandardNestJS.js";

export const startModuleCrudNestJS = async () => {
  await clearScreen();

  const opt = [
    { name: "Controlador", value: "controller", checked: true },
    { name: "DTO", value: "dto", checked: true },
    { name: "Entity", value: "entity", checked: true },
    { name: "Service", value: "service", checked: true },
    { name: "Module", value: "module", checked: true },
    { name: "Seeder", value: "seeder", checked: true },
    { name: "Archivo Postman", value: "postman", checked: true },
  ];

  const { selectedComponents } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "selectedComponents",
      message: "Componentes:",
      choices: opt,
    },
  ]);

  const fullPath = await readInput(
    "Ruta Proyecto: ",
    false,
    "/Users/dorian/NodeProjects/app-1"
  );
  const namespace = await readInput(
    "Namespace (API / SHARED / ERP): ",
    false,
    "API"
  );
  const singularName = await readInput(
    "Nombre singular: ",
    false,
    "AgendaUnloading"
  );
  const pluralName = await readInput(
    "Nombre plural: ",
    false,
    "AgendaUnloadings"
  );
  const inputColumns = await readInput(
    "Columnas (separadas por espacio): ",
    false,
    "name amount description"
  );

  const columns = parseColumns(inputColumns);

  await generateModuleStandardNestJS(
    fullPath,
    selectedComponents,
    namespace,
    singularName,
    pluralName,
    columns
  );

  //await pause();
};
