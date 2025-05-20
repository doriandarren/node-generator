import fs from 'fs';
import path from 'path';
import { createControllerStructure } from '../../helpers/helperFile.js'; // debe existir esta función

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
  // Crear la estructura de carpetas app/pathController dentro de fullPath
  const controllerFolderPath = createControllerStructure(fullPath, pathController);

  // Nombre del archivo PHP
  const fileName = `${singularName}ShowController.php`;
  const controllerFilePath = path.join(controllerFolderPath, fileName);

  // Contenido del archivo PHP
  const controllerContent = `<?php

namespace App\\Http\\Controllers\\${namespace}\\${pluralName};

use App\\Models\\${pluralName}\\${singularName};
use Illuminate\\Http\\JsonResponse;
use App\\Http\\Controllers\\Controller;
use App\\Repositories\\${pluralName}\\${singularName}Repository;

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
`;

  // Crear el archivo
  try {
    fs.writeFileSync(controllerFilePath, controllerContent);
    console.log(`✅ Archivo PHP controlador '${fileName}' creado en: ${controllerFolderPath}`);
  } catch (error) {
    console.error(`❌ Error al crear el archivo PHP del controlador '${fileName}': ${error.message}`);
  }
};
