import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';





/**
 * Genera bloques PHP de filtros LIKE a partir de columns[]
 * @param {Array<{name:string,type?:string,allowNull?:boolean}>} columns
 * @returns {string} Código PHP concatenado con los filtros
 */
export const buildPhpLikeFilters = (columns = []) => {
  // 1) Extraer y limpiar nombres (quita sufijos como ":fk")
  const names = [...new Set(
    columns
      .map(c => (typeof c === 'string' ? c : c?.name))
      .filter(Boolean)
      .map(n => String(n).split(':')[0].trim())
  )];

  // 2) Construir bloques PHP estilo:
  // // Filtro por plate
  // if (!empty($filters['plate'])) {
  //     $plate = trim($filters['plate']);
  //     $q->where('plate', 'LIKE', '%' . $plate . '%');
  // }
  const blocks = names.map((name) => {
    const label = name.replace(/_/g, ' '); // Comentario legible
    return (
`        // Filter by ${label}
        if (!empty($filters['${name}'])) {
            $${name} = trim($filters['${name}']);
            $q->where('${name}', 'LIKE', '%' . $${name} . '%');
        }`
    );
  });

  return blocks.join('\n\n');
};










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

  const updateAssignments = columnNames.map(col =>
    `        if (isset($payload->${col})) {
            if ($payload->${col} != '' && !empty($payload->${col})) {
                $model->${col} = $payload->${col};
            }
        }`
  ).join('\n\n');

  const setParams = columnNames.map(col => `\n        $${col},`).join('');

  const setAssignments = columnNames.map(col =>
    `        $model->${col} = $${col};`
  ).join('\n');

  const paramDoc = columnNames.map(col => `    * @param $${col}`).join('\n');

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