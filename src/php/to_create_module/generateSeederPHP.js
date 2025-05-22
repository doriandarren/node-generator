import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';

export const generateSeederPHP = async (
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
  

  const folderPath = path.join(fullPath, 'database', 'seeders', pluralName);
  
  const filePath = path.join(folderPath, `${singularName}Seeder.php`);
  
  
  createFolder(folderPath);

  // Columnas en el factory
  const columnAssignments = columns
    .map(col => `            '${col.name}' => '${col.name}',`)
    .join('\n');

  // Contenido del archivo PHP del seeder
  const code = `<?php

namespace Database\\Seeders\\${pluralName};

use Illuminate\\Database\\Seeder;
use App\\Models\\${pluralName}\\${singularName};

class ${singularName}Seeder extends Seeder
{
    /**
    * Run the settings seeds.
    *
    * @return void
    */
    public function run()
    {
        // php artisan make:seeder ${singularName}Seeder

        ${singularName}::factory()->create([
${columnAssignments}
        ]);
    }
}
`.trimStart();

  // Escribir el archivo
  try {
    fs.writeFileSync(filePath, code, 'utf-8');
    console.log(`✅ Archivo seeder creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo seeder: ${error.message}`.red);
  }
};
