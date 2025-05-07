import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';


export const generateApp = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath);
    
    // File
    const filePath = path.join(folderPath, 'app.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
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
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}