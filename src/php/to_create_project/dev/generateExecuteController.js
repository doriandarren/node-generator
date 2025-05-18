import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';





export const generateExecuteController = async (fullPath) => {
    
  const folderPath = path.join(fullPath, 'app', 'Http', 'Controllers', 'Dev');
  const filePath = path.join(folderPath, 'ExecuteController.php');

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  const code = `<?php

namespace App\\Http\\Controllers\\Dev;

use App\\Http\\Controllers\\Controller;
use Illuminate\\Http\\Request;

class ExecuteController extends Controller
{

    public function __invoke(Request \$request)
    {
        dd("pasa");
    }

}
`.trimStart();

  try {
    fs.writeFileSync(filePath, code, 'utf-8');
    console.log(`✅ Archivo generado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al generar el archivo ${filePath}: ${error.message}`.cyan);
  }
};
