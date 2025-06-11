import fs from 'fs';
import path from 'path';
import { runExec } from "../../../helpers/helperFile.js";
import { printMessage } from '../../../helpers/inquirer.js';


export const generateReactCommandLine = async(fullPath) => {
    

    await createProjectReact(fullPath);
    await installDependencies(fullPath);
    await setupClassNames(fullPath);
    await setupHeadlessUI(fullPath);
    await setupHeroIcons(fullPath);
    await setupLucideReact(fullPath);
    await setupAnimateCss(fullPath);
    await setupSweetAlert2(fullPath);
    await setupClsx(fullPath);
    await setupFramerMotion(fullPath);
    await setupValidationForm(fullPath);
    await setupUUID(fullPath);
    await deleteAppAndIndexCss(fullPath);


}



const createProjectReact = async(fullPath) => {

    const projectDir = path.dirname(fullPath);
    const projectName = path.basename(fullPath);

    // Verificar si la carpeta base existe
    if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir, { recursive: true });
        printMessage(`Directorio base ${projectDir} creado.`, 'green');
    }

    printMessage('Creando el proyecto React con Vite...', 'cyan');
    await runExec(`npm create vite@latest ${projectName} -- --template react`, projectDir);

    printMessage(`Proyecto React + Vite creado en: ${path.join(projectDir, projectName)}`, 'green');

}




const installDependencies = async (fullPath) => {
    printMessage("Instalando dependencias...", 'cyan');
    await runExec("npm install", fullPath);
};



const setupClassNames = async (fullPath) => {
    printMessage("Instalando ClassNames...", 'cyan');
    await runExec("npm install classnames", fullPath);
    printMessage("ClassNames instalado correctamente.", 'green');
};

const setupHeadlessUI = async (fullPath) => {
    printMessage("Instalando Headlessui...", 'cyan');
    await runExec("npm install @headlessui/react", fullPath);
    printMessage("Headlessui instalado correctamente.", 'green');
};

const setupHeroIcons = async (fullPath) => {
    printMessage("Instalando Heroicons...", 'cyan');
    await runExec("npm install @heroicons/react", fullPath);
    printMessage("Heroicons instalado correctamente.", 'green');
};

const setupLucideReact = async (fullPath) => {
    printMessage("Instalando LucideReact...", 'cyan');
    await runExec("npm install lucide-react", fullPath);
    printMessage("LucideReact instalado correctamente.", 'green');
};

const setupAnimateCss = async (fullPath) => {
    printMessage("Instalando AnimateCss...", 'cyan');
    await runExec("npm install animate.css --save", fullPath);
    printMessage("AnimateCss instalado correctamente.", 'green');
};

const setupSweetAlert2 = async (fullPath) => {
    printMessage("Instalando Sweetalert2...", 'cyan');
    await runExec("npm install sweetalert2", fullPath);
    printMessage("Sweetalert2 instalado correctamente.", 'green');
};

const setupClsx = async (fullPath) => {
    printMessage("Instalando Clsx...", 'cyan');
    await runExec("npm install clsx", fullPath);
    printMessage("Clsx instalado correctamente.", 'green');
};

const setupFramerMotion = async (fullPath) => {
    printMessage("Instalando FramerMotion...", 'cyan');
    await runExec("npm install framer-motion", fullPath);
    printMessage("FramerMotion instalado correctamente.", 'green');
};

const setupValidationForm = async (fullPath) => {
    printMessage("Instalando React Hook Form + Yup...", 'cyan');
    await runExec("npm install react-hook-form @hookform/resolvers yup", fullPath);
    printMessage("Validación con React Hook Form instalada correctamente.", 'green');
};

const setupUUID = async (fullPath) => {
    printMessage("Instalando UUID...", 'cyan');
    await runExec("npm install uuid", fullPath);
    printMessage("UUID instalado correctamente.", 'green');
};



const deleteAppAndIndexCss = async (fullPath) => {
    const filesToDelete = ['src/App.css', 'src/index.css'];

    for (const relativePath of filesToDelete) {
        const filePath = path.join(fullPath, relativePath);

        try {
            await fs.promises.access(filePath); // Verifica si existe
            await fs.promises.unlink(filePath); // Elimina el archivo
            printMessage(`${relativePath} eliminado correctamente.`, 'green');
        } catch {
            printMessage(`${relativePath} no existe, no es necesario eliminarlo.`, 'cyan');
        }
    }
};