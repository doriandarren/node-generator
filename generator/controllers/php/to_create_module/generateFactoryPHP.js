import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";

export const generateFactoryPHP = async (
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
  // Carpeta: database/factories/{pluralName}
  const folderPath = path.join(
    fullPath,
    "database",
    "factories",
    namespace,
    pluralName
  );
  const fileName = `${singularName}Factory.php`;
  const filePath = path.join(folderPath, fileName);

  // Crear carpeta si no existe
  createFolder(folderPath);

  // Columnas en el array de definition()
  const definitionFields = columns
    .map((col) => `            '${col.name}' => \$this->faker->word(),`)
    .join("\n");

  // Contenido del archivo PHP del Factory
  const code = `<?php

namespace Database\\Factories\\${namespace}\\${pluralName};

use Illuminate\\Database\\Eloquent\\Factories\\Factory;

/**
* @extends \\Illuminate\\Database\\Eloquent\\Factories\\Factory<\\App\\Models\\${namespace}\\${pluralName}\\${singularName}>
*/
class ${singularName}Factory extends Factory
{
    /**
    * Define the model's default state.
    *
    * @return array<string, mixed>
    */
    public function definition()
    {
        // php artisan make:factory ${singularName}Factory

        return [
${definitionFields}
        ];
    }
}
`.trimStart();

  // Escribir el archivo PHP
  try {
    fs.writeFileSync(filePath, code, "utf-8");
    console.log(`✅ Archivo factory creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo factory: ${error.message}`.red);
  }
};
