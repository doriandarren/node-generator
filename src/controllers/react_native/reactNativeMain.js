import { clearScreen, menuMain, pause } from "../../helpers/inquirer.js";
import { startModuleReactNative } from "./to_create_module_crud/startModuleReactNative";
import { startProjectReactNative } from "./to_create_project/startProjectReactNative";


export const reactNativeMain = async () => {
  let opt = "";

  clearScreen();
  
  do {

    opt = await menuMain([
      { name: "Proyecto", value: "proyect" },
      { name: "Módulo - CRUD", value: "module_crud" },
      { name: "Atrás", value: "back" },
    ], 'REACT NATIVE');


    switch (opt) {
      case "proyect":
        await startProjectReactNative();
        break;

      case "module_crud":
        await startModuleReactNative();
        break;
      
        
      default:
        break;
    }

    await pause();

  } while (opt != "back");
};
