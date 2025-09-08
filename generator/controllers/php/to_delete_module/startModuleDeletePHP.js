import { clearScreen, menuMain, pause } from "../../helpers/inquirer.js";

export const phpMain = async () => {
  let opt = "";

  clearScreen();

  console.log("PHP");

  do {
    opt = await menuMain([
      { name: "Proyecto", value: "proyect" },
      { name: "Módulo", value: "module" },
      { name: "Módulo - Eliminar", value: "module_delete" },
      { name: "Atrás", value: "back" },
    ], 'PHP');

    switch (opt) {
      case "proyect":
        await startProjectPHP();
        break;

      case "module":
        await startModulePHP();
        break;
      
      case "module_delete":
        await startModuleDeletePHP();
        break;

      default:
        break;
    }

    await pause();
    
  } while (opt != "back");
};