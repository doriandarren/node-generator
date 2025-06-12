import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';




export const generateIndexHTML = async(fullPath) => {  

  await createRoute(fullPath);

  await createLogo(fullPath);

}    
    

const createRoute = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'public');
    
    // File
    const filePath = path.join(folderPath, 'index.html');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Project - API</title>

    <link rel="icon" type="image/ico" href="/brand/images/company_logos/logo.ico" />

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
            src="/brand/images/company_logos/logo.png"
            alt="logo"
            class="max-w-[40%] w-full h-auto mx-auto"
        />
    </div>
    <footer class="w-full text-md text-left text-black px-8 mb-5 animate__animated animate__slideInLeft">
        ©<span id="year"></span> splytin.com - Developed by <strong>SplytinDevelopers</strong>.
    </footer>
    <script>
        document.getElementById("year").textContent = new Date().getFullYear();
    </script>
</body>
</html>
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }

}



const createLogo = async(fullPath) => {  
  
  // Carpeta destino
  const folderPath = path.join(fullPath, 'public', 'brand', 'images', 'company_logos');
  createFolder(folderPath);

  // Archivos fuente
  const sourceBase = path.join(process.cwd(), 'public', 'images', 'company_logos');
  const sourcePng = path.join(sourceBase, 'logo.png');
  const sourceIco = path.join(sourceBase, 'logo.ico');

  // Archivos destino
  const destPng = path.join(folderPath, 'logo.png');
  const destIco = path.join(folderPath, 'logo.ico');


  try {
    fs.copyFileSync(sourcePng, destPng);
    fs.copyFileSync(sourceIco, destIco);
    console.log(`✅ logo.png copiado a ${destPng}`.green);
    console.log(`✅ logo.ico copiado a ${destIco}`.green);

  } catch (error) {
    console.error(`❌ Error: ${error.message}`.red);
  }

}