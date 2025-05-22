import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';


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
        if (\$this->isAdmin(auth()->user()->roles)) {
            \$data = \$this->repository->list();
        } elseif (\$this->isManager(auth()->user()->roles)) {
            \$data = \$this->repository->listByRoleManager();
        } else {
            \$data = \$this->repository->listByRoleUser();
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
