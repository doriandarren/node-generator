import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';




export const generateControllerStorePHP = async (
  fullPath,
  namespace,
  pathController,
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
  const folderPath = path.join(fullPath, 'app', pathController);
  const filePath = path.join(folderPath, `${singularName}StoreController.php`);

  // Crear carpeta si no existe
  createFolder(folderPath);

  // Comentarios @bodyParam
  const bodyParamComments = columns.map(col =>
    `    * @bodyParam ${col.name} string required`
  ).join('\n');

  // Reglas de validación
  const validations = columns.map(col =>
    `                '${col.name}'=>'required',`
  ).join('\n');

  // Parámetros para el set
  const parameters = columns.map(col => `$request->${col.name}`).join(', ');

  // Contenido del archivo
  const code = `<?php

namespace App\\Http\\Controllers\\${namespace}\\${pluralName};

use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;
use App\\Http\\Controllers\\Controller;
use Illuminate\\Support\\Facades\\Validator;
use App\\Repositories\\${pluralName}\\${singularName}Repository;

class ${singularName}StoreController extends Controller
{
    private ${singularName}Repository $repository;

    public function __construct()
    {
        $this->repository = new ${singularName}Repository();
    }

    /**
    * @header Authorization Bearer TOKEN 
${bodyParamComments}
    *
    * @param Request $request
    * @return JsonResponse
    */
    public function __invoke(Request $request): JsonResponse
    {
        if ($this->isAdmin(auth()->user()->roles)) {

            $validator = Validator::make($request->all(), [
${validations}
            ]); 
            if ($validator->fails()) {
                return $this->respondWithError('Error', $validator->errors());
            }

            $${singularNameCamel} = $this->repository->set${singularName}(${parameters});
            $data = $this->repository->store($${singularNameCamel});
            return $this->respondWithData('${singularName} created', $data);

        } else if ($this->isManager(auth()->user()->roles)) {

            $validator = Validator::make($request->all(), [
${validations}
            ]);
            if ($validator->fails()) {
                return $this->respondWithError('Error', $validator->errors());
            }

            $${singularNameCamel} = $this->repository->set${singularName}(${parameters});
            $data = $this->repository->store($${singularNameCamel});
            return $this->respondWithData('${singularName} created', $data);

        } else {

            $validator = Validator::make($request->all(), [
${validations}
            ]);
            if ($validator->fails()) {
                return $this->respondWithError('Error', $validator->errors());
            }

            $${singularNameCamel} = $this->repository->set${singularName}(${parameters});
            $data = $this->repository->store($${singularNameCamel});
            return $this->respondWithData('${singularName} created', $data);
        }
    }
}
`.trimStart();

  // Crear el archivo
  try {
    fs.writeFileSync(filePath, code, 'utf-8');
    console.log(`✅ Archivo controlador creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo controlador: ${error.message}`.red);
  }
};
