import { clearScreen, menuMain, pause } from "../helpers/inquirer.js";
import { startModuleNodeJS } from "./to_create_module/startModuleNodeJS.js";
import { startProjectNodeJS } from "./to_create_project/startProjectNodeJS.js";


export const nodeMain = async() => {
    let opt = '';

    clearScreen();
    console.log('NODEJS');

    do{

        opt = await menuMain(['Proyecto', 'Modulo', 'Salir']);

        switch (opt) {
            case 'Proyecto':
                await startProjectNodeJS();
                break;
        
            case 'Modulo':
                await startModuleNodeJS();
                break;
            
            default:
                break;
        }

        //await pause();

    }while(opt != 'Salir')

}