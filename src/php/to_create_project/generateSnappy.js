import fs from 'fs';
import path from 'path';
import { createFolder, runExec } from '../../helpers/helperFile.js';
import { printMessage } from '../../helpers/inquirer.js';


export const generateSnappy = async(fullPath) => {    
    await installSnappy(fullPath);
    await publishSnappy(fullPath);
}



const installSnappy = async (fullPath) => {
  printMessage('Instalando Snappy...', 'cyan');
  await runExec('composer require barryvdh/laravel-snappy', fullPath);
  printMessage('Snappy instalado correctamente.', 'green');
};


const publishSnappy = async (fullPath) => {
  printMessage('Publicando Snappy...', 'cyan');
  await runExec(
    "php artisan vendor:publish --provider='Barryvdh\\Snappy\\ServiceProvider'",
    fullPath
  );
  printMessage('Snappy publicado correctamente.', 'green');
};