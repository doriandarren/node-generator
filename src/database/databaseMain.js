import { clearScreen, menuMain, pause } from "../helpers/inquirer.js";
import { startGenerate } from "./to_generate/startGenerate.js";
import { listProject } from "./to_list/listProject.js";




export const databaseMain = async() => {
    let opt = '';
    
    clearScreen();
    console.log('DATABASE');

    do{

        opt = await menuMain(['Listar', 'Generar', 'Salir']);

        switch (opt) {
            case 'Listar':
                await listProject();
                break;
        
            case 'Generar':
                await startGenerate();
                break;
            
            default:
                break;
        }


        //TODO: Comentar luego para no hacer doble el entrer atras
        await pause();

    }while(opt != 'Salir')

    
}