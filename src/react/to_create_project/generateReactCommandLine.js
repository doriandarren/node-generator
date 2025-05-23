import fs from 'fs';
import path from 'path';
import { runExec, createFolder } from "../../helpers/helperFile.js";
import { printMessage } from '../../helpers/inquirer.js';


export const generateReactCommandLine = async(fullPath) => {
    

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

    printMessage('Creando el proyecto React con Vite...', 'cyan');
    await runExec(`npm create vite@latest ${projectName} -- --template react`, projectDir);

    printMessage(`Proyecto React + Vite creado en: ${path.join(projectDir, projectName)}`, 'green');

}