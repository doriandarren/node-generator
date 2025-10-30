import { clearScreen, menuMain, pause } from "../../helpers/inquirer.js";
import { startModuleCrudNestJS } from "./to_create_module_crud/startModuleCrudNestJS.js";
import { startProjectNestJS } from "./to_create_project/startProjectNestJS.js";

// Snippet: 1) Minúscula 2) Mayúcula
export const nestJSMain = async () => {
  let opt = "";

  clearScreen();

  do {
    opt = await menuMain(
      [
        { name: "Proyecto", value: "proyect" },
        { name: "Módulo - CRUD", value: "module_crud" },
        { name: "Módulo - SINGLE", value: "module_single" },
        { name: "Módulo - Eliminar", value: "module_delete" },
        { name: "Atrás", value: "back" },
      ],
      "NestJS"
    );

    switch (opt) {
      case "proyect":
        await startProjectNestJS();
        break;

      case "module_crud":
        await startModuleCrudNestJS();
        break;

      //   case "module_single":
      //     await startModuleSingleNestJS();
      //     break;

      //   case "module_delete":
      //     await startModuleDeleteNestJS();
      //     break;

      default:
        break;
    }

    await pause();
  } while (opt != "back");
};
