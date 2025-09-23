import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';
import { buildPhpLikeFilters, buildUpdateAssignments } from '../helpers/helperPHPRepository.js';






export const generateRepositoryPHP = async (
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


  // Carpeta: app/Repositories/{pluralName}
  const folderPath = path.join(fullPath, 'app', 'Repositories', pluralName);
  const filePath = path.join(folderPath, `${singularName}Repository.php`);

  // Crear carpeta si no existe
  createFolder(folderPath);

  const columnNames = columns.map(col => col.name);

  const storeAssignments = columnNames.map(col =>
    `        $model->${col} = $data->${col};`
  ).join('\n');


  const setParams = columnNames.map(col => `\n        $${col},`).join('');

  const setAssignments = columnNames.map(col =>
    `        $model->${col} = $${col};`
  ).join('\n');

  const paramDoc = columnNames.map(col => `    * @param $${col}`).join('\n');




  // columns puede ser: ["name","amount","..."] o
  // [{ name: "has_active", type: "BOOLEAN" }, ...]
  const toName = (c) => (typeof c === "string" ? c : c.name);
  const toType = (c) => (typeof c === "string" ? "" : String(c.type || "").toUpperCase());

  const updateAssignments = columns
    .map((col) => {
      const name = toName(col);
      const type = toType(col);

      if (type === "BOOLEAN") {
        // para booleans: conserva false/null -> no uses isset/empty
        return `        if (property_exists($payload, '${name}')) {
            $model->${name} = $payload->${name};
        }`;
      }

      // default (tu lógica actual)
      return `        if (isset($payload->${name})) {
            if ($payload->${name} != '' && !empty($payload->${name})) {
                $model->${name} = $payload->${name};
            }
        }`;
    })
    .join("\n\n");







  // Contenido del archivo PHP
  const code = `<?php

namespace App\\Repositories\\${pluralName};

use App\\Enums\\EnumApiSetup;
use App\\Models\\${pluralName}\\${singularName};

class ${singularName}Repository
{
    const WITH = [];

    /**
    * List by Admin
    * @param $filters
    * @return mixed
    */
    public function list($filters): mixed
    {

        $q = ${singularName}::with(self::WITH);

${buildPhpLikeFilters(columns)}

        return $q->latest()
            ->limit(EnumApiSetup::QUERY_LIMIT)
            ->get();
        
    }
    
    
    /**
    * List by Manager
    * @param $filters
    * @return mixed
    */
    public function listByRoleManager($filters): mixed
    {
        $q = ${singularName}::with(self::WITH);

${buildPhpLikeFilters(columns)}

        return $q->latest()
            ->limit(EnumApiSetup::QUERY_LIMIT)
            ->get();
    }
    
    
    /**
    * List by User
    * @param $filters
    * @return mixed
    */
    public function listByRoleUser($filters): mixed
    {
        $q = ${singularName}::with(self::WITH);

${buildPhpLikeFilters(columns)}

        return $q->latest()
            ->limit(EnumApiSetup::QUERY_LIMIT)
            ->get();
            
    }


    /**
    * Show by Admin
	* @param $id
	* @return mixed
	*/
    public function show($id): mixed
    {
        return ${singularName}::where('id', $id)
                            ->first();
    }
    
    
    /**
    * Show by Manager
	* @param $id
	* @return mixed
	*/
    public function showByRoleManager($id): mixed
    {
        return ${singularName}::where('id', $id)
                            ->first();
    }
    
    
    /**
    * Show by User
	* @param $id
	* @return mixed
	*/
    public function showByRoleUser($id): mixed
    {
        return ${singularName}::where('id', $id)
                            ->first();
    }


    /**
    * Store
    * @param $data
    * @return ${singularName}
    */
    public function store($data): ${singularName}
    {
        $model = new ${singularName}();
${storeAssignments}
        $model->save();
        return $model;
    }
    

    /**
    * Update
    * @param $id
    * @param $data
    * @return ${singularName}
    */
    public function update($id, $data): mixed
    {
        $payload = is_array($data) ? json_decode(json_encode($data), FALSE) : $data;
        
        $model = ${singularName}::where('id', $id)->first();

${updateAssignments}

        $model->save();
        return $model;
    }


    /**
    * Destroy
    * @param $id
    * @return bool
    */
    public function destroy($id): bool
    {
        $model = ${singularName}::find($id);
        $model->delete();
        return true;
    }


    /**
    * Set ${singularName}
${paramDoc}
    * @return ${singularName}
    */
    public function set${singularName}(${setParams}
    ): ${singularName}
    {
        $model = new ${singularName}();
${setAssignments}
        return $model;
    }
}
`.trimStart();

  // Escribir el archivo PHP
  try {
    fs.writeFileSync(filePath, code, 'utf-8');
    console.log(`✅ Archivo repositorio creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo repositorio: ${error.message}`.red);
  }
};