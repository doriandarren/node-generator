import { clearScreen, exitScreen, menuMain, pause } from "./src/helpers/inquirer.js";
import { startModule } from "./src/node/to_create_module/startModule.js";
import { startProject } from "./src/node/to_create_project/startProject.js";



const main = async() => {
    let opt = '';

    clearScreen();
    console.log('NODEJS');

    do{

        opt = await menuMain();

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

        await pause();

    }while(opt != 'Salir')


    exitScreen();

}


main();