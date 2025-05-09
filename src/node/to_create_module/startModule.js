import inquirer from "inquirer";
import { pause, readInput, clearScreen } from "../../helpers/inquirer.js";

export const startModule = async () => {
  await clearScreen();

  const opt = [
    { name: "Modelo", value: "model", checked: true },
    { name: "Controlador - List", value: "controller_list", checked: true },
    { name: "Controlador - Show", value: "controller_show", checked: true },
    { name: "Controlador - Store", value: "controller_store", checked: true },
    { name: "Controlador - Update", value: "controller_update", checked: true },
    { name: "Controlador - Destroy", value: "controller_destroy",checked: true },
    { name: "Repositorio", value: "repository", checked: true },
    { name: "Rutas", value: "routes", checked: true },
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

  await pause();

  const defaultPath = "/Users/dorian/NodeProjects/";
  console.log(`[Directorio por defecto es: ${defaultPath}]`.cyan);



  const nameProject = await readInput("Carpeta Proyecto:", false, "example");
  const namespace = await readInput("Namespace (ERP / API / INVOICES):", false, "API");
  const singularName = await readInput("Nombre singular:", false, "AgendaUnloading");
  const pluralName = await readInput("Nombre plural:", false, "AgendaUnloadings");
  const inputColumns = await readInput("Columnas (separadas por espacio):", false, "name amount description");


  const columns = inputColumns.split(" ").map((col) => ({ name: col }));


  await generateModuleStandard(
    selectedComponents,
    namespace,
    nameProject,
    projectPath,
    singularName,
    pluralName,
    columns
  );



};
