import fs from 'fs';
import path from 'path';
import { runExec } from "../../../helpers/helperFile.js";
import { createFolder } from '../../../helpers/helperFile.js';
import { printMessage } from '../../../helpers/inquirer.js';


export const generateCommandLine = async(fullPath) => {    

    await createProjectReact(fullPath);

}


const createProjectReact = async(fullPath) => {
    
    const projectDir = path.dirname(fullPath);
    const projectName = path.basename(fullPath);

    // Verificar si la carpeta base existe
    if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir, { recursive: true });
        printMessage(`Directorio base ${projectDir} creado.`, 'green');
    }

    printMessage('Creando el proyecto ReactNative...', 'cyan');
    await runExec(`npx create-expo-app@latest ${projectName}`, projectDir);
    printMessage(`Proyecto React Native creado en: ${path.join(projectDir, projectName)}`, 'green');

}