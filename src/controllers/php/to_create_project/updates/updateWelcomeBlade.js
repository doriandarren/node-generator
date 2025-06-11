import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../helpers/helperFile.js';




export const updateWelcomeBlade = async (fullPath) => {
  // Ruta a la carpeta de vistas
  const folderPath = path.join(fullPath, 'resources', 'views');

  // Ruta completa del archivo welcome.blade.php
  const filePath = path.join(folderPath, 'welcome.blade.php');

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  // Contenido del archivo blade
  const code = `<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ env('APP_NAME') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />

        <!-- Styles / Scripts -->
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

    </head>

    <body class="bg-[#e6e6e6] min-h-screen flex flex-col justify-between">
        <div class="flex flex-1 items-center justify-center px-4 animate__animated animate__zoomIn">
            <img
                src="{{ asset('brand/images/company_logos/logo.svg') }}"
                alt="logo"
                class="max-w-[70%] w-full h-auto mx-auto"
            />
        </div>
        <footer class="w-full text-md text-left text-black px-8 mb-5 animate__animated animate__slideInLeft">
            ©<span id="year"></span> GlobalFleet.es - Developed by <strong>GlobalDevelopers</strong>.
        </footer>
        <script>
            document.getElementById("year").textContent = new Date().getFullYear();
        </script>
    </body>

</html>
`.trimStart();

  try {
    fs.writeFileSync(filePath, code, 'utf-8');
    console.log(`✅ Archivo generado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al generar el archivo ${filePath}: ${error.message}`.cyan);
  }
};
