import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';

export const generateRoutesPHP = async (
  fullPath,
  namespace,
  singularName,
  pluralName,
  singularNameKebab,
  pluralNameKebab,
  singularNameSnake,
  pluralNameSnake,
  singularNameCamel,
  pluralNameCamel,
  columns
) => {
  
  const folderPath = path.join(fullPath, 'routes', namespace);

  const filePath = path.join(folderPath, `${pluralNameSnake}.php`);

  // Crear carpeta si no existe
  createFolder(folderPath);

  // Contenido del archivo de rutas
  const code = `<?php

use App\\Enums\\EnumAbilitySuffix;
use App\\Enums\\EnumApiSetup;
use App\\Http\\Controllers\\${namespace}\\${pluralName}\\${singularName}ListController;
use App\\Http\\Controllers\\${namespace}\\${pluralName}\\${singularName}ShowController;
use App\\Http\\Controllers\\${namespace}\\${pluralName}\\${singularName}StoreController;
use App\\Http\\Controllers\\${namespace}\\${pluralName}\\${singularName}UpdateController;
use App\\Http\\Controllers\\${namespace}\\${pluralName}\\${singularName}DestroyController;
use Illuminate\\Support\\Facades\\Route;


/**
* ${pluralName}
*/
Route::group(['prefix' => '${pluralNameKebab}/'], function () {

	Route::group(['middleware' => 'auth:sanctum'], function() {
        
		Route::get('list', [${singularName}ListController::class, '__invoke'])->middleware('abilities:${pluralNameSnake}' . EnumAbilitySuffix::LIST);
		Route::get('show/{${singularNameSnake}:id}', [${singularName}ShowController::class, '__invoke'])->middleware('abilities:${pluralNameSnake}' . EnumAbilitySuffix::SHOW);
		Route::post('store', [${singularName}StoreController::class, '__invoke'])->middleware('abilities:${pluralNameSnake}' . EnumAbilitySuffix::STORE);
		Route::put('update/{${singularNameSnake}:id}', [${singularName}UpdateController::class, '__invoke'])->middleware('abilities:${pluralNameSnake}' . EnumAbilitySuffix::UPDATE);
		Route::delete('delete/{${singularNameSnake}:id}', [${singularName}DestroyController::class, '__invoke'])->middleware('abilities:${pluralNameSnake}' . EnumAbilitySuffix::DESTROY);
		
	});
});
`.trimStart();

  // Escribir archivo de rutas
  try {
    fs.writeFileSync(filePath, code, 'utf-8');
    console.log(`✅ Archivo de rutas creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo de rutas: ${error.message}`.red);
  }
};
