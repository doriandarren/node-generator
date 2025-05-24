import fs from 'fs';
import path from 'path';
import { runExec, createFolder } from '../../helpers/helperFile.js';
import { printMessage } from '../../helpers/inquirer.js';


export const generateStyle = async(fullPath) => {    

    await updateMainJsx(fullPath);
    await createTailwind(fullPath);
    await createTailwindStyles(fullPath);
    await createScssStyles(fullPath);
    await createScssVariables(fullPath);
    await installCompileSass(fullPath);

}


const updateMainJsx = async(fullPath) => {
    const mainJsxPath = path.join(fullPath, 'src', 'main.jsx');

    // Verificar si el archivo existe
    if (!fs.existsSync(mainJsxPath)) {
        printMessage(`Error: ${mainJsxPath} no existe.`, 'cyan');
        return;
    }

    try {
        // Leer el contenido original
        let content = fs.readFileSync(mainJsxPath, 'utf-8');

        // Reemplazo 1
        content = content.replace(
            "import './index.css'",
            "import './styles/globals.css';"
        );

        // Reemplazo 2
        content = content.replace(
            "import './styles/globals.css';",
            "import './styles/globals.css';\nimport './styles/styles.css';"
        );

        // Guardar el archivo actualizado
        fs.writeFileSync(mainJsxPath, content, 'utf-8');
        printMessage("main.jsx configurado correctamente.", 'green');

    } catch (err) {
        printMessage(`Error al actualizar ${mainJsxPath}: ${err.message}`, 'cyan');
    }
};


const createTailwind = async (fullPath) => {
    printMessage("Instalando Tailwind CSS...", 'cyan');

    try {
        await runExec("npm install tailwindcss @tailwindcss/postcss postcss", fullPath);
    } catch (err) {
        printMessage(`Error al instalar Tailwind CSS: ${err.message}`, 'red');
        return;
    }

    const tailwindConfig = `const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
`;

    const postcssConfigPath = path.join(fullPath, "postcss.config.mjs");

    try {
        await fs.promises.writeFile(postcssConfigPath, tailwindConfig, 'utf-8');
        printMessage("Tailwind CSS configurado correctamente.", 'green');
    } catch (err) {
        printMessage(`Error al crear postcss.config.mjs: ${err.message}`, 'red');
    }
};


const createTailwindStyles = async (fullPath) => {
    const stylesPath = path.join(fullPath, 'src', 'styles');

    try {
        // Crear carpeta src/styles si no existe
        if (!fs.existsSync(stylesPath)) {
            await fs.promises.mkdir(stylesPath, { recursive: true });
            printMessage(`Carpeta creada: ${stylesPath}`, 'green');
        }

        const filePath = path.join(stylesPath, 'globals.css');

        const content = `/*
|--------------------------------------------------------------------------
| Font
|--------------------------------------------------------------------------
|
*/ 
/* @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap'); */


/*
|--------------------------------------------------------------------------
| Variables
|--------------------------------------------------------------------------
|
*/ 
@import "./variables.scss";


/*
|--------------------------------------------------------------------------
| Tailwind Directives
|--------------------------------------------------------------------------
|
| Import TailwindCSS directives and swipe out at build-time with all of
| the styles it generates based on your configured design system.
|
*/ 
@import "tailwindcss";


/*
|--------------------------------------------------------------------------
| Tailwind Theme Variables
|--------------------------------------------------------------------------
|
| Definir variables personalizadas utilizando \`@theme\`.
|
*/
@theme {
  --font-display: "Roboto", "sans-serif";
  --color-primary: #0096b2;
  --color-primary-light: #00b4d6;
  --color-primary-dark: #007a91;
  --color-primary-alpha70: rgba(79, 157, 166, 0.7);

  --color-secondary: #0998FC;
  --color-secondary-light: #09C0FC;
  --color-secondary-dark: #0976FC;

  --color-danger: #f44336;
  --color-danger-light: #ff7961;
  --color-danger-dark: #b83329;
  
  --color-success: #4caf50;
  --color-success-light: #61e265;
  --color-success-dark: #3a893d;
  
  --color-info: #FFB300;
  --color-info-light: #FFD54F;
  --color-info-dark: #FFA000;
  
  --color-warning: #facc15;         
  --color-warning-light: #fef9c3;   
  --color-warning-dark: #ca8a04;
  
  --color-neutral-light: #9CA3AF;
  --color-neutral: #6B7280;
  --color-neutral-dark: #374151;
  
  --color-navbar: #222831;
  --color-background: #f8fafc;

  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);
} 


/*
|--------------------------------------------------------------------------
| Tailwind Layer
|--------------------------------------------------------------------------
|
| Import layer components.
|
*/
@layer components {
    .btn {
        @apply py-2 px-4 font-semibold rounded-lg shadow-md transition duration-300 ease-in-out;
    }

    .btn-primary {
        background-color: var(--color-primary);
        color: white;
        @apply shadow-sm hover:bg-[var(--color-primary-dark)] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)];
    }

    .btn-secondary {
        background-color: var(--color-secondary);
        color: white;
        @apply shadow-sm hover:bg-[var(--color-secondary-dark)] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)];
    }

    .btn-danger {
        background-color: var(--color-error);
        color: white;
        @apply shadow-sm hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400;
    }

    .disabled {
        @apply bg-gray-100 cursor-not-allowed pointer-events-none;
    }

    .form-control {
        @apply w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)];
    }

    .text-danger {
        color: var(--color-error);
    }

    .border-danger {
        border-color: var(--color-error);
        @apply border rounded-lg;
    }

    .card {
        @apply shadow border p-4 rounded bg-white;
    }

    .card--featured {
        background-color: var(--color-primary-alpha70);
        border-color: var(--color-primary);
    }

    .card__title {
        @apply text-2xl font-bold text-gray-800;
    }

    .card__description {
        @apply text-gray-600;
    }

    .card__button {
        background-color: var(--color-primary);
        color: white;
        @apply py-2 px-4 rounded hover:bg-[var(--color-primary-dark)] transition duration-300 ease-in-out;
    }
}`;

        await fs.promises.writeFile(filePath, content, 'utf-8');
        printMessage(`Archivo generado: ${filePath}`, 'green');
    } catch (err) {
        printMessage(`Error al generar el archivo globals.css: ${err.message}`, 'cyan');
    }
};



const createScssStyles = async (fullPath) => {
    const stylesPath = path.join(fullPath, 'src', 'styles');

    try {
        // Crear carpeta src/styles si no existe
        if (!fs.existsSync(stylesPath)) {
            await fs.promises.mkdir(stylesPath, { recursive: true });
            printMessage(`Carpeta creada: ${stylesPath}`, 'green');
        }

        const filePath = path.join(stylesPath, 'styles.scss');
        const content = `\n`;

        await fs.promises.writeFile(filePath, content, 'utf-8');
        printMessage(`Archivo generado: ${filePath}`, 'green');
    } catch (err) {
        printMessage(`Error al generar el archivo styles.scss: ${err.message}`, 'cyan');
    }
};


const createScssVariables = async (fullPath) => {
    const stylesPath = path.join(fullPath, 'src', 'styles');

    try {
        // Crear carpeta src/styles si no existe
        if (!fs.existsSync(stylesPath)) {
            await fs.promises.mkdir(stylesPath, { recursive: true });
            printMessage(`Carpeta creada: ${stylesPath}`, 'green');
        }

        const filePath = path.join(stylesPath, 'variables.scss');

        const content = `// 📌 src/styles/variables.scss
:root {
  --primary-color: #1e40af;
  --secondary-color: #9333ea;
  --danger-color: #dc2626;
  --success-color: #16a34a;
}

// Variables de SASS para usar en otros archivos SCSS
$primary-color: var(--primary-color);
$secondary-color: var(--secondary-color);
$danger-color: var(--danger-color);
$success-color: var(--success-color);
`;

        await fs.promises.writeFile(filePath, content, 'utf-8');
        printMessage(`Archivo generado: ${filePath}`, 'green');
    } catch (err) {
        printMessage(`Error al generar el archivo variables.scss: ${err.message}`, 'cyan');
    }
};


const installCompileSass = async (fullPath) => {
    try {
        printMessage("Instalando SASS...", 'cyan');
        await runExec("npm install -D sass", fullPath);
        printMessage("SASS instalado correctamente.", 'green');
    } catch (err) {
        printMessage(`Error al instalar SASS: ${err.message}`, 'red');
        return;
    }

    try {
        printMessage("Compilando SASS...", 'cyan');
        await runExec("npx sass src/styles/styles.scss src/styles/styles.css", fullPath);
        printMessage("SASS compilado correctamente.", 'green');
    } catch (err) {
        printMessage(`Error al compilar SASS: ${err.message}`, 'red');
    }
};
