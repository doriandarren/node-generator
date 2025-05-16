import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';
import { runExec, createFolder } from "../../helpers/helperFile.js";



export const generatePHPCommandLine = async() => {    

    await createProject(fullPath);
    await createInstallSanctum(fullPath);

};



const createProject = async (fullPath) => {
    // Verifica si el directorio ya existe
    if (fs.existsSync(fullPath)) {
        printMessage(`El directorio ${fullPath} ya existe. Abortando.`, 'green');
        return;
    }

    const cmd = `composer create-project --prefer-dist laravel/laravel ${fullPath}`;
    await runExec(cmd);
    printMessage(`Proyecto Laravel creado en: ${fullPath}`, 'green');
};



const createInstallSanctum = async (fullPath) => {
    printMessage('Instalando Sanctum...', 'cyan');
    await runExec(`php artisan install:api -n`, fullPath);
    printMessage('Sanctum instalado correctamente.', 'green');
};





// const createProject = async(fullPath) => {
//     createFolder(fullPath);
//     const cmd = `XXX`;
//     await runExec(cmd, fullPath);
// }
