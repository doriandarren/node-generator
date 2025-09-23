import inquirer from "inquirer";
import { clearScreen, pause, readInput } from "../../../helpers/inquirer.js";
import { parseColumns } from "../../../helpers/helperString.js";
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
    { name: "Factory", value: "factory", checked: true },
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
    "/Users/dorian/PhpstormProjects81/app-1"
    //"/Users/dorian/PhpstormProjects81/docker-laravel-84/projects/api.truckwashvilamalla.eu",
    //"/Users/dorian/PhpstormProjects81/docker-laravel-84/projects/api.splytin.com"
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
    "customer_id:fk name:string amount:float description has_active:boolean"
  );

  const columns = parseColumns(inputColumns);
  
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
