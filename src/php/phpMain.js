import { clearScreen, menuMain, pause } from "../helpers/inquirer.js";
import { startModulePHP } from "./to_create_module/startModulePHP.js";
import { startProjectPHP } from "./to_create_project/startProjectPHP.js";



export const phpMain = async () => {
  let opt = "";

  clearScreen();

  console.log("PHP");

  do {
    opt = await menuMain(["Proyecto", "Modulo", "Salir"]);

    switch (opt) {
      case "Proyecto":
        await startProjectPHP();
        break;

      case "Modulo":
        await startModulePHP();
        break;

      default:
        break;
    }

    await pause();
  } while (opt != "Salir");
};
