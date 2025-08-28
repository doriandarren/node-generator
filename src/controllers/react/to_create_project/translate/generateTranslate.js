import fs from "fs";
import path from "path";
import { printMessage } from '../../../../helpers/inquirer.js';
import { createFolder, runExec } from '../../../../helpers/helperFile.js';
import { generateLocaleES } from "./generateLocaleES.js";
import { generateLocaleEN } from "./generateLocaleEN.js";


export const generateTranslate = async(fullPath) => {    
  
    await setupI18n(fullPath)
    await createI18n(fullPath)
    await updateFileMain(fullPath)
    

    await generateLocaleES(fullPath)
    await generateLocaleEN(fullPath)

}



const setupI18n = async (fullPath) => {
  printMessage('🌐 Instalando i18n...', 'cyan');

  await runExec(
    'npm install i18next react-i18next i18next-http-backend i18next-browser-languagedetector',
    fullPath
  );

  printMessage('✅ i18n instalado correctamente.', 'green');
}



const createI18n = async (fullPath) => {
  const srcDir = path.join(fullPath, 'src');
  const filePath = path.join(srcDir, 'i18n.js');

  // Crear carpeta src si no existe
  createFolder(srcDir);

  const content = `import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

const storedLang = localStorage.getItem("i18nextLng") || "es";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: storedLang,
    fallbackLng: "es",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator"],
      caches: ["cookie"],
    },
  });

export default i18n;
`;

  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    printMessage(`✅ Archivo creado: ${filePath}`, 'green');
  } catch (error) {
    printMessage(`❌ Error al crear el archivo ${filePath}: ${error.message}`, 'red');
  }
}




const updateFileMain = async (fullPath) => {
  const mainJsxPath = path.join(fullPath, 'src', 'main.jsx');

  // Verifica si el archivo existe
  if (!fs.existsSync(mainJsxPath)) {
    printMessage(`❌ Error: ${mainJsxPath} no existe.`, 'red');
    return;
  }

  try {
    let content = fs.readFileSync(mainJsxPath, 'utf-8');

    // Solo actualiza si no está ya importado
    if (!content.includes("import './i18n';")) {
      content = content.replace(
        "import { createRoot } from 'react-dom/client'",
        "import { createRoot } from 'react-dom/client';\nimport './i18n';"
      );

      fs.writeFileSync(mainJsxPath, content, 'utf-8');
      printMessage('✅ main.jsx configurado correctamente.', 'green');
    } else {
      printMessage('ℹ️ main.jsx ya contiene la importación de i18n.', 'yellow');
    }
  } catch (error) {
    printMessage(`❌ Error al actualizar ${mainJsxPath}: ${error.message}`, 'red');
  }
}
