import inquirer from "inquirer";
import { clearScreen, pause, readInput } from "../../helpers/inquirer.js";
import { generateModuleStandardPHP } from "./generateModuleStandardPHP.js";



export const startModulePHP = async () => {
  
  await clearScreen();

  const opt = [
    { name: "Modelo", value: "model", checked: true },
    { name: "Controlador - List", value: "controller_list", checked: true },
    { name: "Controlador - Show", value: "controller_show", checked: true },
    { name: "Controlador - Store", value: "controller_store", checked: true },
    { name: "Controlador - Update", value: "controller_update", checked: true },
    { name: "Controlador - Destroy", value: "controller_destroy", checked: true, },
    { name: "Repositorio", value: "repository", checked: true },
    { name: "Rutas", value: "route", checked: true },
    { name: "Migración", value: "migration", checked: true },
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
    "Ruta Proyecto:",
    false,
    "/Users/dorian/PhpstormProjects81/app-1"
  );
  const namespace = await readInput(
    "Namespace (erp / api / invoices):",
    false,
    "API"
  );
  const singularName = await readInput(
    "Nombre singular:",
    false,
    "AgendaUnloading"
  );
  const pluralName = await readInput(
    "Nombre plural:",
    false,
    "AgendaUnloadings"
  );
  const inputColumns = await readInput(
    "Columnas (separadas por espacio):",
    false,
    "name amount description"
  );


  const cleanedInput = inputColumns.replace(/[.,;:]+/g, ' '); // reemplaza comas, puntos, punto y coma, dos puntos por espacio

  const columns = cleanedInput
    .split(/\s+/) // divide por uno o más espacios
    .filter(Boolean) // elimina vacíos
    .map((col) => ({
      name: col.trim(),
      type: "STRING",
      allowNull: true,
    }));


  await generateModuleStandardPHP(
    fullPath,
    selectedComponents,
    namespace,
    singularName,
    pluralName,
    columns
  );


  //await pause();

};
