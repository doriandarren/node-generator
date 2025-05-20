import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';



export const generateControllerDestroyPHP = async (
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
  // Carpeta: app/Http/Controllers/{namespace}/{pluralName}
  const folderPath = path.join(fullPath, 'app', 'Http', 'Controllers', namespace, pluralName);
  const filePath = path.join(folderPath, `${singularName}DestroyController.php`);

  // Crear carpeta si no existe
  createFolder(folderPath);

  // Contenido del archivo PHP
  const code = `<?php

namespace App\\Http\\Controllers\\${namespace}\\${pluralName};

use App\\Models\\${pluralName}\\${singularName};
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;
use App\\Http\\Controllers\\Controller;
use App\\Repositories\\${pluralName}\\${singularName}Repository;

class ${singularName}DestroyController extends Controller
{
    private ${singularName}Repository \$repository;

    public function __construct()
    {
        \$this->repository = new ${singularName}Repository();
    }

    /**
    * @header Authorization Bearer TOKEN 
    * @urlParam id required The ID of the table.
    *
    * @param Request \$request
    * @param ${singularName} \$${singularNameSnake}
    * @return JsonResponse
    */
    public function __invoke(Request \$request, ${singularName} \$${singularNameSnake}): JsonResponse
    {
        if (\$this->isAdmin(auth()->user()->roles)) {
            \$data = \$this->repository->destroy(\$${singularNameSnake}->id);
            return \$this->respondWithData('${singularName} deleted', \$data);
        } else {
            \$data = \$this->repository->destroy(\$${singularNameSnake}->id);
            return \$this->respondWithData('${singularName} deleted', \$data);
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
