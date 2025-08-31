import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../helpers/helperFile.js';



export const generatePreloaderButton = async (fullPath) => {
  const stylesPath = path.join(fullPath, 'src', 'components', 'Preloader');
  const filePath = path.join(stylesPath, 'PreloaderButton.jsx');

  createFolder(stylesPath);

  const content = `import { PreloaderSVG } from "./PreloaderSVG";

export const PreloaderButton = () => {
  return (
    <div className="w-8 h-8">
      <PreloaderSVG />  
    </div>
  );
};
`;

  try {
    await fs.promises.writeFile(filePath, content);
    console.log(`✅ Archivo generado: ${filePath}`.green);
  } catch (e) {
    printMessage(`❌ Error al generar el archivo ${filePath}: ${e}`, 'cyan');
  }
}
