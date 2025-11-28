import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';

export const generateControllerShowPHP = async (
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

  const folderPath = path.join(fullPath, 'app', 'Http', 'Controllers', namespace, pluralName);
  
  const filePath = path.join(folderPath, `${singularName}ShowController.php`);

  createFolder(folderPath);

  
  const code = `<?php

namespace App\\Http\\Controllers\\${namespace}\\${pluralName};

use App\\Models\\${pluralName}\\${singularName};
use Illuminate\\Http\\JsonResponse;
use App\\Http\\Controllers\\Controller;
use App\\Repositories\\${namespace}\\${pluralName}\\${singularName}Repository;

class ${singularName}ShowController extends Controller
{
    private ${singularName}Repository $repository;

    public function __construct()
    {
        $this->repository = new ${singularName}Repository();
    }

    /**
    * @header Authorization Bearer TOKEN 
    * @urlParam id required The ID of the table.
    *
    * @param ${singularName} $${singularNameSnake}
    * @return JsonResponse
    */
    public function __invoke(${singularName} $${singularNameSnake}): JsonResponse
    {
        if ($this->isAdmin(auth()->user()->roles)) {
            $data = $this->repository->show($${singularNameSnake}->id);
            return $this->respondWithData('${singularName} show', $data);
        } else if ($this->isManager(auth()->user()->roles)) {
            $data = $this->repository->showByRoleManager($${singularNameSnake}->id);
            return $this->respondWithData('${singularName} show', $data);
        } else {
            $data = $this->repository->showByRoleUser($${singularNameSnake}->id);
            return $this->respondWithData('${singularName} show', $data);
        }
    }
}
`.trimStart();

  // Escribir el archivo
  try {
    fs.writeFileSync(filePath, code, 'utf-8');
    console.log(`✅ Archivo controlador creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo controlador: ${error.message}`.red);
  }
};
