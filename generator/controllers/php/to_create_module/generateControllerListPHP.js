import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';


export const generateControllerListPHP = async (
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
  
  const filePath = path.join(folderPath, `${singularName}ListController.php`);

  createFolder(folderPath);


  // Generar bloque de filtros desde columns
  const filterLines =
    (Array.isArray(columns) ? columns : [])
      .filter(Boolean)
      .map((name) => `            '${name}' => $request->query('${name}'),`)
      .join('\n');

  


  const code = `<?php

namespace App\\Http\\Controllers\\${namespace}\\${pluralName};

use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;
use App\\Http\\Controllers\\Controller;
use App\\Repositories\\${pluralName}\\${singularName}Repository;

class ${singularName}ListController extends Controller
{
    private ${singularName}Repository \$repository;

    public function __construct()
    {
        \$this->repository = new ${singularName}Repository();
    }

    /**
    * @header Authorization Bearer TOKEN 
    *
    * @param Request \$request
    * @return JsonResponse
    */
    public function __invoke(Request \$request): JsonResponse
    {
       \\$filters = [
${filterLines}
            // opcional paginación:
            'per_page' => \\$request->integer('per_page'), // ej. 25
        ];


        if (\$this->isAdmin(auth()->user()->roles)) {
            \$data = \$this->repository->list(\\$filters);
        } elseif (\$this->isManager(auth()->user()->roles)) {
            \$data = \$this->repository->listByRoleManager(\\$filters);
        } else {
            \$data = \$this->repository->listByRoleUser(\\$filters);
        }
        
        return \$this->respondWithData('${pluralName} list', \$data);
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
