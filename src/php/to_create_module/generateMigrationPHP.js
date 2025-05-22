import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';

/**
 * Helper para pluralizar nombres simples (por defecto)
 */
const getPlural = (str) => {
  return str.endsWith('y')
    ? str.slice(0, -1) + 'ies'
    : str.endsWith('s')
    ? str + 'es'
    : str + 's';
};

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
  const now = new Date();
  const formattedDate = now.toISOString().replace(/[-:T]/g, '_').split('.')[0]; // yyyy_MM_dd_HH_MM_SS
  const fileName = `${formattedDate}_create_${pluralNameSnake}_table.php`;
  const filePath = path.join(folderPath, fileName);

  // Crear carpeta si no existe
  createFolder(folderPath);

  // Construcción dinámica del bloque de columnas
  let columnDefinitions = `                $table->id();\n`;
  let downForeigns = ``;

  for (const col of columns) {
    if (col.name.includes('_id')) {
      const refTable = getPlural(col.name.replace('_id', ''));
      columnDefinitions += `                $table->unsignedBigInteger('${col.name}');\n`;
      columnDefinitions += `                $table->foreign('${col.name}')->references('id')->on('${refTable}')->onDelete('cascade');\n`;
      downForeigns += `        if (Schema::connection('api')->hasColumn('${pluralNameSnake}', '${col.name}')) {\n`;
      downForeigns += `            Schema::connection('api')->table('${pluralNameSnake}', function (Blueprint $table) {\n`;
      downForeigns += `                $table->dropForeign(['${col.name}']);\n`;
      downForeigns += `                $table->dropColumn('${col.name}');\n`;
      downForeigns += `            });\n`;
      downForeigns += `        }\n\n`;
    } else {
      columnDefinitions += `                $table->string('${col.name}')->nullable();\n`;
    }
  }

  columnDefinitions += `\n                $table->timestamps();\n                $table->softDeletes();`;

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
${columnDefinitions}
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
${downForeigns}        Schema::connection('api')->dropIfExists('${pluralNameSnake}');
    }
};
`.trimStart();

  // Escribir archivo
  try {
    fs.writeFileSync(filePath, code, 'utf-8');
    console.log(`✅ Archivo de migración creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo de migración: ${error.message}`.red);
  }
};
