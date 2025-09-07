import { runExec } from '../../../helpers/helperFile.js';
import { printMessage } from '../../../helpers/inquirer.js';

export const generateMaatwebsiteExcel = async (fullPath) => {
  await installExcel(fullPath);
  await publishExcel(fullPath);
};

const installExcel = async (fullPath) => {
  printMessage('Instalando Excel...', 'cyan');
  await runExec('composer require maatwebsite/excel', fullPath);
  printMessage('Excel instalado correctamente.', 'green');
};

const publishExcel = async (fullPath) => {
  printMessage('Publicando Excel...', 'cyan');
  await runExec(
    'php artisan vendor:publish --provider="Maatwebsite\\Excel\\ExcelServiceProvider"',
    fullPath
  );
  printMessage('Excel publicado correctamente.', 'green');
};