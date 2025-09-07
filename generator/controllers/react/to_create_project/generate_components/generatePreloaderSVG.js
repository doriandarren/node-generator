import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../helpers/helperFile.js';


export const generatePreloaderSVG = async (fullPath) => {
  // Carpeta destino
  const preloaderDir = path.join(fullPath, 'src', 'components', 'Preloader');
  createFolder(preloaderDir);

  // Archivo a crear
  const filePath = path.join(preloaderDir, 'PreloaderSVG.jsx');

  // Contenido SVG
  const content = `export const PreloaderSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M2,12A10.94,10.94,0,0,1,5,4.65c-.21-.19-.42-.36-.62-.55h0A11,11,0,0,0,12,23c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z"
      >
        <animateTransform
          attributeName="transform"
          dur="0.6s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        />
      </path>
    </svg>
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