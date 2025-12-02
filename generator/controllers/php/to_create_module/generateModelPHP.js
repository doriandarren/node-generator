import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";
import { buildPHPRelations } from "../helpers/helperPHPRelations.js";

export const generateModelPHP = async (
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
  // Carpeta: app/Models/{pluralName}
  const folderPath = path.join(
    fullPath,
    "app",
    "Models",
    namespace,
    pluralName
  );
  const filePath = path.join(folderPath, `${singularName}.php`);

  // Crear carpeta si no existe
  createFolder(folderPath);

  const phpMethods = await buildPHPRelations(columns);

  const belongsToImport =
    phpMethods.trim().length > 0
      ? `\nuse Illuminate\\Database\\Eloquent\\Relations\\BelongsTo;`
      : "";

  const namespaceNew = (namespace.toLowelCase() === 'shared') ? 'api' : namespace.toLowelCase();

  // Contenido del archivo
  const code = `<?php

namespace App\\Models\\${namespace}\\${pluralName};

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;${belongsToImport}
use Illuminate\\Database\\Eloquent\\Model;

class ${singularName} extends Model
{
    use HasFactory;
    // use SoftDeletes;

    protected \$connection = '${namespaceNew}';
    protected \$table = '${pluralNameSnake}';

    /***********************
    * RELATIONS
    ***********************/

    // TODO add relation tables
//    public function classrelacion()
//    {
//        return $this->hasMany(ClassRelacion::class, 'classrelacion_id', 'id');
//    }

    ${phpMethods}


}
`.trimStart();

  try {
    fs.writeFileSync(filePath, code, "utf-8");
    console.log(`✅ Archivo modelo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo modelo: ${error.message}`.red);
  }
};
