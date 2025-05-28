import { clearScreen, menuMain, pause } from "../helpers/inquirer.js";
import { startModuleNodeJS } from "./to_create_module/startModuleNodeJS.js";
import { startProjectNodeJS } from "./to_create_project/startProjectNodeJS.js";


export const nodeMain = async() => {
    let opt = '';

    clearScreen();

    do{

        opt = await menuMain([
            { name: "Proyecto", value: "proyect" },
            { name: "Módulo", value: "module" },
            { name: "Atrás", value: "back" },
        ], 'NODEJS');

        switch (opt) {
            case 'proyect':
                await startProjectNodeJS();
                break;
        
            case 'module':
                await startModuleNodeJS();
                break;
            
            default:
                break;
        }

        //await pause();

    }while(opt != 'back')

}