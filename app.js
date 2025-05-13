import 'dotenv/config';
import { clearScreen, exitScreen, menuMain, pause } from "./src/helpers/inquirer.js";
import { startModule } from "./src/node/to_create_module/startModule.js";
import { nodeMain } from './src/node/ nodeMain.js';



const main = async() => {
    let opt = '';

    clearScreen();
    console.log('🔧 Generador de Código');

    do{

        opt = await menuMain(['NodeJS', 'Salir']);

        switch (opt) {
            case 'NodeJS':
                await nodeMain();
                break;
        
            
            default:
                //console.log('❓ Opción no válida');
                break;
        }

        await pause();

    }while(opt != 'Salir')


    exitScreen();

}


main();