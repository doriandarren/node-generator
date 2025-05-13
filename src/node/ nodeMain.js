import { clearScreen, menuMain, pause } from "../helpers/inquirer.js";
import { startModule } from "./to_create_module/startModule.js";
import { startProject } from "./to_create_project/startProject.js";


export const nodeMain = async() => {
    let opt = '';

    clearScreen();
    console.log('NODEJS');

    do{

        opt = await menuMain(['Proyecto', 'Modulo', 'Salir']);

        switch (opt) {
            case 'Proyecto':
                await startProject();
                break;
        
            case 'Modulo':
                await startModule();
                break;
            
            default:
                break;
        }

        //await pause();

    }while(opt != 'Salir')

}