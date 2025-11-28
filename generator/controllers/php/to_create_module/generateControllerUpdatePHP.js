import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";

export const generateControllerUpdatePHP = async (
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
  const folderPath = path.join(
    fullPath,
    "app",
    "Http",
    "Controllers",
    namespace,
    pluralName
  );

  const filePath = path.join(folderPath, `${singularName}UpdateController.php`);

  createFolder(folderPath);

  // Comentarios @bodyParam
  const bodyParamComments = columns
    .map((col) => `    * @bodyParam ${col.name} string required`)
    .join("\n");

  // Reglas de validación
  const validationRules = columns
    .map((col) => `                '${col.name}' => 'required',`)
    .join("\n");

  // Contenido del archivo PHP
  const code = `<?php

namespace App\\Http\\Controllers\\${namespace}\\${pluralName};

use App\\Models\\${pluralName}\\${singularName};
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;
use App\\Http\\Controllers\\Controller;
use Illuminate\\Support\\Facades\\Validator;
use Illuminate\\Validation\\Rule;
use App\\Repositories\\${namespace}\\${pluralName}\\${singularName}Repository;

class ${singularName}UpdateController extends Controller
{
    private ${singularName}Repository \$repository;

    public function __construct()
    {
        \$this->repository = new ${singularName}Repository();
    }

    /**
    * @header Authorization Bearer TOKEN 
    * @urlParam id required The ID of the table.
${bodyParamComments}
    *
    * @param Request \$request
    * @param ${singularName} \$${singularNameSnake}
    * @return JsonResponse
    */
    public function __invoke(Request \$request, ${singularName} \$${singularNameSnake}): JsonResponse
    {
        if (\$this->isAdmin(auth()->user()->roles)) {
            // By Admin
            \$validator = Validator::make(\$request->all(), [
${validationRules}
            ]);

            if (\$validator->fails()) {
                return \$this->respondWithError('Error', \$validator->errors());
            }

            \$data = \$this->repository->update(\$${singularNameSnake}->id, \$request->all());
            return \$this->respondWithData('${singularName} updated', \$data);

        } else {
            // By Role Manager & User
            \$validator = Validator::make(\$request->all(), [
${validationRules}
            ]);

            if (\$validator->fails()) {
                return \$this->respondWithError('Error', \$validator->errors());
            }

            \$data = \$this->repository->update(\$${singularNameSnake}->id, \$request->all());
            return \$this->respondWithData('${singularName} updated', \$data);
        }
    }
}
`.trimStart();

  // Escribir el archivo PHP
  try {
    fs.writeFileSync(filePath, code, "utf-8");
    console.log(`✅ Archivo controlador creado: ${filePath}`.green);
  } catch (error) {
    console.error(
      `❌ Error al crear archivo controlador: ${error.message}`.red
    );
  }
};
