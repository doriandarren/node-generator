import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../helpers/helperFile.js';



export const generatePreloaderMain = async (fullPath) => {
  // Carpeta destino
  const preloaderDir = path.join(fullPath, 'src', 'components', 'Preloader');
  createFolder(preloaderDir);

  // Archivo a crear
  const filePath = path.join(preloaderDir, 'PreloaderMain.jsx');

  // Contenido del componente
  const content = `import { PreloaderSVG } from "./PreloaderSVG";
import "./PreloaderMain.css";

export const PreloaderMain = () => {
  return (
    <div className="preloader flex justify-center">
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