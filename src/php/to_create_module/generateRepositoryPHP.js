import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';



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
    `        $objNew->${col} = $data->${col};`
  ).join('\n');

  const updateAssignments = columnNames.map(col =>
    `        if (isset($obj->${col})) {
            if ($obj->${col} != '' && !empty($obj->${col})) {
                $objOld->${col} = $obj->${col};
            }
        }`
  ).join('\n\n');

  const setParams = columnNames.map(col => `$${col}`).join(', ');

  const setAssignments = columnNames.map(col =>
    `        $obj->${col} = $${col};`
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
    * @return mixed
    */
    public function list(): mixed
    {
        return ${singularName}::latest()
                            ->limit(EnumApiSetup::QUERY_LIMIT)
                            ->get();
    }
    
    
    /**
    * List by Manager
    * @return mixed
    */
    public function listByRoleManager(): mixed
    {
        return ${singularName}::latest()
                            ->limit(EnumApiSetup::QUERY_LIMIT)
                            ->get();
    }
    
    
    /**
    * List by User
    * @return mixed
    */
    public function listByRoleUser(): mixed
    {
        return ${singularName}::latest()
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
        $objNew = new ${singularName}();
${storeAssignments}
        $objNew->save();
        return $objNew;
    }
    

    /**
    * Update
    * @param $id
    * @param $data
    * @return ${singularName}
    */
    public function update($id, $data): mixed
    {
        if (is_array($data)) {
            $obj = json_decode(json_encode($data), FALSE);
        } else {
            $obj = $data;
        }
        
        $objOld = ${singularName}::where('id', $id)->first();

${updateAssignments}

        $objOld->save();
        return $objOld;
    }


    /**
    * Destroy
    * @param $id
    * @return bool
    */
    public function destroy($id): bool
    {
        $obj = ${singularName}::find($id);
        $obj->delete();
        return true;
    }


    /**
    * Set ${singularName}
${paramDoc}
    * @return ${singularName}
    */
    public function set${singularName}(${setParams}): ${singularName}
    {
        $obj = new ${singularName}();
${setAssignments}
        return $obj;
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

