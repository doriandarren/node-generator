import { runExec } from "../../../helpers/helperFile.js";
import { printMessage } from "../../../helpers/inquirer.js";


export const generateFpdfMerge = async (fullPath) => {
  await installFpdfMerge(fullPath);
};

const installFpdfMerge = async (fullPath) => {
  printMessage('Instalando FPDF Merge...', 'cyan');
  await runExec('composer require setasign/fpdf setasign/fpdi', fullPath);
  printMessage('FPDF Merge instalado correctamente.', 'green');
};
