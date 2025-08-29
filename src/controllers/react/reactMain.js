import { clearScreen, menuMain, pause } from "../../helpers/inquirer.js";
import { startModuleReact } from "./to_create_module_crud/startModuleReact.js";
import { startModuleSingleReact } from "./to_create_module_single/startModuleSingleReact.js";
import { startProjectReact } from "./to_create_project/startProjectReact.js";



export const reactMain = async () => {
  let opt = "";

  clearScreen();
  
  do {

    opt = await menuMain([
      { name: "Proyecto", value: "proyect" },
      { name: "Módulo - CRUD", value: "module_crud" },
      { name: "Módulo - SINGLE", value: "module_single" },
      { name: "Atrás", value: "back" },
    ], 'REACT');


    switch (opt) {
      case "proyect":
        await startProjectReact();
        break;

      case "module_crud":
        await startModuleReact();
        break;
      
        
      case "module_single":
        await startModuleSingleReact();
        break;

      default:
        break;
    }

    await pause();

  } while (opt != "back");
};
