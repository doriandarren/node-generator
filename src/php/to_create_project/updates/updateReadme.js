import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';




export const updateReadme = async (fullPath) => {
  const folderPath = path.join(fullPath);
  const filePath = path.join(folderPath, 'README.md');

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  const content = `## Base Laravel 12

## Installation

\`\`\`sh
composer install
php artisan key:generate
php artisan config:clear
php artisan migrate  
// Lang
php artisan lang:publish

/* Seeder */
php artisan migrate:fresh --seed
\`\`\`

## Activate hablities

\`\`\`sh
Add into Http/Kernel: 

...
'abilities' => \\\\Laravel\\\\Sanctum\\\\Http\\\\Middleware\\\\CheckAbilities::class,
'ability' => \\\\Laravel\\\\Sanctum\\\\Http\\\\Middleware\\\\CheckForAnyAbility::class,
...
\`\`\`

## Snappy

File: TestController

- **[SNAPPY](https://github.com/barryvdh/laravel-snappy)**
- **[h4cc](https://packagist.org/packages/h4cc/wkhtmltopdf-amd64)**

\`\`\`sh
// Snappy
composer require barryvdh/laravel-snappy

// h4cc
composer require h4cc/wkhtmltopdf-amd64 0.12.x (4 -> lastes version)
composer require h4cc/wkhtmltoimage-amd64 0.12.x (4 -> lastes version)

// in config/app.php
...
Barryvdh\\\\Snappy\\\\ServiceProvider::class,

...
'PDF' => Barryvdh\\\\Snappy\\\\Facades\\\\SnappyPdf::class,
'SnappyImage' => Barryvdh\\\\Snappy\\\\Facades\\\\SnappyImage::class,

// Then publish the config file
php artisan vendor:publish --provider="Barryvdh\\\\Snappy\\\\ServiceProvider"
\`\`\`

## Laravel Excel

- **[Laravel-excel](https://docs.laravel-excel.com/3.1/getting-started/installation.html)**

File: TestController

Folder app/Exports/Example/ExampleExport 

\`\`\`sh
composer require maatwebsite/excel:^3.1
\`\`\`

## PDF Merge

- **[Laravel-merge](https://github.com/Setasign/FPDF)**

File: TestController

\`\`\`sh
composer require setasign/fpdf
composer require setasign/fpdi
\`\`\`

## Arquitectura DDD

### Crear Carpeta "src"

### Crear las estructuras siguientes:

Ejemplo Dev:

### Carpeta Bounded -> "Dev" y luego carpetas dentro:

- Application
- Domain
- Infraestructure

### Luego en Infraestructure crear carpetas:

- Controllers
- Routes
- Services

### Ir al composer.json y buscar ps-4 y agregar:

\`\`\`sh
"Src\\\\": "src/"
php artisan config:cache
\`\`\`

### Implememtar rutas propias

Copiar el contenido de los ejemplos:

En la carpeta Infraestructure/Services crear archivo "RouteServiceProviders.php"
En la carpeta Infraestructure/Routes crear archivo "Api.php"

### Ir a config/app

Agregar en el array de provider:

\`\`\`sh
/*
* CUSTOM ROUTES SERVICE PROVIDERS
*/
Src\\\\Api\\\\Dev\\\\Infrastructure\\\\Services\\\\RouteServiceProvider::class,

/*
 * CUSTOM DEPENDENCY SERVICE PROVIDERS
 */
//Src\\\\Api\\\\Auth\\\\Infrastructure\\\\Services\\\\DependencyServiceProvider::class,
\`\`\`

Luego regenerar los namespaces:

\`\`\`sh
composer dump-autoload
\`\`\`
`.trim();

  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Archivo generado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al generar el archivo ${filePath}: ${error.message}`.cyan);
  }
}
