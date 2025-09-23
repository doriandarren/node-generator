import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';
import {
  buildMigrationTimestamp,
  buildMigrationColumnsAndDown
} from '../helpers/helperPHPMigration.js';




export const generateMigrationPHP = async (
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

  const folderPath = path.join(fullPath, 'database', 'migrations');
  createFolder(folderPath);

  // Nombre de archivo estilo Laravel
  const fileName = `${buildMigrationTimestamp()}_create_${pluralNameSnake}_table.php`;
  const filePath = path.join(folderPath, fileName);

  // Bloques de columnas (UP/DOWN)
  const { upColumnsBlock, downForeignsBlock } =
    buildMigrationColumnsAndDown(pluralNameSnake, columns, { connection: 'api' });

  // Contenido del archivo PHP
  const code = `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        if (!Schema::connection('api')->hasTable('${pluralNameSnake}')) {

            Schema::connection('api')->create('${pluralNameSnake}', function (Blueprint $table) {
${upColumnsBlock}
            });
        }
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
${downForeignsBlock}        Schema::connection('api')->dropIfExists('${pluralNameSnake}');
    }
};
`.trimStart();

  try {
    fs.writeFileSync(filePath, code, 'utf-8');
    console.log(`✅ Archivo de migración creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo de migración: ${error.message}`.red);
  }
};
