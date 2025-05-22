import { clearScreen, menuMain, pause } from "../helpers/inquirer.js";
import { startModuleReact } from "./to_create_module/startModuleReact.js";
import { startProjectReact } from "./to_create_project/startProjectReact.js";



export const reactMain = async () => {
  let opt = "";

  clearScreen();

  console.log("REACT");

  do {
    opt = await menuMain([
      { name: "Proyecto", value: "proyect" },
      { name: "Módulo", value: "module" },
      { name: "Atrás", value: "back" },
    ]);

    switch (opt) {
      case "proyect":
        await startProjectReact();
        break;

      case "module":
        await startModuleReact();
        break;

      default:
        break;
    }

    await pause();
  } while (opt != "back");
};
