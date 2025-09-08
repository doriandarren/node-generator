import fs from 'fs';
import path from 'path';
import { runExec, createFolder } from "../../../helpers/helperFile.js";
import { printMessage } from '../../../helpers/inquirer.js';



export const generateCommandLine = async(fullPath) => {    

    await createProject(fullPath);
    await createInstallSanctum(fullPath);

};



const createProject = async (fullPath) => {
    // Verifica si el directorio ya existe
    if (fs.existsSync(fullPath)) {
        printMessage(`El directorio ${fullPath} ya existe. Abortando.`);
        return;
    }

    const cmd = `composer create-project --prefer-dist laravel/laravel ${fullPath}`;
    await runExec(cmd);
    printMessage(`Proyecto Laravel creado en: ${fullPath}`);
};



const createInstallSanctum = async (fullPath) => {
    printMessage('Instalando Sanctum...', 'cyan');
    await runExec(`php artisan install:api -n`, fullPath);
    printMessage('Sanctum instalado correctamente.');
};
