import { clearScreen, menuMain, pause } from "../../helpers/inquirer.js";

 // Snippet: 1) Minúscula 2) Mayúcula
export const reactTSMain = async () => {
  let opt = "";

  clearScreen();


  do {
    opt = await menuMain([
      { name: "Proyecto", value: "proyect" },
      { name: "Módulo - CRUD", value: "module_crud" },
      { name: "Módulo - SINGLE", value: "module_single" },
      { name: "Atrás", value: "back" },
    ], 'REACTTS');

    switch (opt) {
      case "proyect":
        await startProjectREACTTS();
        break;

      case "module_crud":
        await startModuleCrudREACTTS();
        break;
      
      case "module_single":
        await startModuleSingleREACTTS();
        break;

      default:
        break;
    }

    await pause();
    
  } while (opt != "back");
};