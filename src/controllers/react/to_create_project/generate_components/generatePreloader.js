import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../helpers/helperFile.js';




export const generatePreloader = async (fullPath) => {
  // Ruta a la carpeta del componente
  const preloaderDir = path.join(fullPath, 'src', 'components', 'Preloader');
  createFolder(preloaderDir);

  // Ruta completa del archivo
  const filePath = path.join(preloaderDir, 'Preloader.jsx');

  // Contenido JSX del componente
  const content = `import { PreloaderSVG } from "./PreloaderSVG";

export const Preloader = () => {
  return (
    <div className="flex justify-center">
      <PreloaderSVG />
    </div>
  );
};
`.trimStart();

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo generado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al generar el archivo ${filePath}: ${error.message}`);
  }
}