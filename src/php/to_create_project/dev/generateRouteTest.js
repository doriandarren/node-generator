import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';




export const generateRouteTest = async (fullPath) => {
  // Folder
  const folderPath = path.join(fullPath, 'routes', 'SHARED');

  // File
  const filePath = path.join(folderPath, 'dev.php');

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  // Code
  const code = `<?php

use App\\Http\\Controllers\\Dev\\ExecuteController;
use App\\Http\\Controllers\\Dev\\TestController;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Route;

/*
|--------------------------------------------------------------------------
| DEV
|--------------------------------------------------------------------------
|
*/

Route::get('dev/execute', ExecuteController::class . '@__invoke')->name('dev/execute');

Route::get('dev/test', TestController::class . '@__invoke')->name('dev/test');
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }
};
