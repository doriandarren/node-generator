import { clearScreen, menuMain, pause } from "../helpers/inquirer.js";
import { startModulePHP } from "./to_create_module/startModulePHP.js";
import { startProjectPHP } from "./to_create_project/startProjectPHP.js";



export const phpMain = async () => {
  let opt = "";

  clearScreen();

  console.log("PHP");

  do {
    opt = await menuMain([
      { name: "Proyecto", value: "proyect" },
      { name: "Módulo", value: "module" },
      { name: "Atrás", value: "back" },
    ], 'PHP');

    switch (opt) {
      case "proyect":
        await startProjectPHP();
        break;

      case "module":
        await startModulePHP();
        break;

      default:
        break;
    }

    await pause();
  } while (opt != "back");
};
