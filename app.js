import 'dotenv/config';
import { clearScreen, exitScreen, menuMain, pause } from "./src/helpers/inquirer.js";
import { nodeMain } from './src/node/ nodeMain.js';
import { databaseMain } from './src/database/databaseMain.js';



const main = async() => {
    let opt = '';

    clearScreen();
    console.log('🔧 Generador de Código');

    do{

        opt = await menuMain(['Database', 'NodeJS', 'Salir']);

        switch (opt) {

            case 'Database':
                await databaseMain();
                break;

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