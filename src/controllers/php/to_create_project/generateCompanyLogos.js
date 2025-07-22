import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';



export const generateCompanyLogos = async (fullPath) => {

	await createLogoSVG(fullPath);
	await createFaviconSVG(fullPath);

}




const createLogoSVG = async (fullPath) => {
  // Ruta a la carpeta donde se colocará el logo
  const folderPath = path.join(fullPath, 'public', 'brand', 'images', 'company_logos');

  // Ruta completa del archivo SVG
  const filePath = path.join(folderPath, 'logo.svg');

  // Crear carpeta si no existe
  createFolder(folderPath);

  // Contenido del archivo SVG
  const code = `
<svg class="w-10 h-10 mr-3" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 904.79 991.96"><defs><radialGradient id="Degradado_sin_nombre_8" cx="449.25" cy="516.28" r="136.76" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="0.57" stop-color="#1e77bc"/></radialGradient></defs><path d="M590.08,10.72" transform="translate(-59.84 -20.85)" style="fill:none;stroke:#a4e80f;stroke-miterlimit:10"/><ellipse cx="449.25" cy="516.28" rx="131.6" ry="141.72" style="fill:url(#Degradado_sin_nombre_8)"/><path d="M995,253.68" transform="translate(-59.84 -20.85)" style="fill:none;stroke:#a4e80f;stroke-miterlimit:10;stroke-width:0.5px"/><path d="M964.63,162.57" transform="translate(-59.84 -20.85)" style="fill:none;stroke:#a4e80f;stroke-miterlimit:10"/><path d="M934.26,203.06" transform="translate(-59.84 -20.85)" style="fill:none;stroke:#a4e80f;stroke-miterlimit:10;stroke-width:0.5px"/><path d="M964.63,20.85V192.94H934.26c-17.31-.2-34.21-.2-50.61,0-362,4.25-534.5,101.23-536.53,101.23-179.58,99.71-103.56,327.28-101.33,334C63.68,557.27,104.17,354.91,104.17,354.91c7.93-42.28,27.51-81.46,53.3-115.64,23.41-31,51.73-58.19,82.36-82,44.22-34.4,91.65-62.38,145.87-77.58,15.32-4.29,30.84-7.86,46.42-11.12,32.34-6.78,65-12,97.74-16.47,35.68-4.89,71.47-8.85,107.32-12.27q53.27-5.09,106.66-8.66,47.86-3.27,95.8-5.63,37.35-1.84,74.72-3.19,21.71-.77,43.43-1.34Z" transform="translate(-59.84 -20.85)" style="fill:#03aeef"/><path d="M867.31,160" transform="translate(-59.84 -20.85)" style="fill:#f9f9f9;stroke:#a4e80f;stroke-miterlimit:10;stroke-width:0.5px"/><path d="M790.89,153.6" transform="translate(-59.84 -20.85)" style="fill:#f9f9f9;stroke:lime;stroke-miterlimit:10;stroke-width:0.5px"/><path d="M778,140.73" transform="translate(-59.84 -20.85)" style="fill:#f9f9f9;stroke:lime;stroke-miterlimit:10;stroke-width:0.5px"/><path d="M929.2,53.75V160H882.51a15.08,15.08,0,1,1-.23-15.19H914V68.93H792.16a15,15,0,1,1,.23-15.18Z" transform="translate(-59.84 -20.85)" style="fill:#f9f9f9"/><path d="M905.89,98.77a15,15,0,0,1-15,15,14.66,14.66,0,0,1-12.6-6.91H805.45v45.56h-61.2a15,15,0,0,1-27.63-7.6v-.53a15,15,0,0,1,28.24-7.06h45.4V91.71h87.46a15,15,0,0,1,28.17,7.06Z" transform="translate(-59.84 -20.85)" style="fill:#f9f9f9"/><path d="M29.47,780" transform="translate(-59.84 -20.85)" style="fill:none;stroke:#a4e80f;stroke-miterlimit:10;stroke-width:0.5px"/><path d="M59.84,871.08" transform="translate(-59.84 -20.85)" style="fill:none;stroke:#a4e80f;stroke-miterlimit:10"/><path d="M90.21,830.59" transform="translate(-59.84 -20.85)" style="fill:none;stroke:#a4e80f;stroke-miterlimit:10;stroke-width:0.5px"/><path d="M59.84,1012.81V840.71H90.21c17.31.21,34.22.21,50.61,0,362-4.25,534.5-101.23,536.53-101.23,179.58-99.71,103.56-327.28,101.33-334C960.79,476.38,920.3,678.74,920.3,678.75,912.37,721,892.79,760.21,867,794.38c-23.41,31-51.73,58.19-82.36,82C740.42,910.79,693,938.77,638.77,954c-15.32,4.3-30.84,7.86-46.42,11.12-32.34,6.78-65,12-97.74,16.47-35.68,4.89-71.47,8.86-107.31,12.27q-53.28,5.08-106.67,8.66-47.87,3.27-95.8,5.63-37.35,1.85-74.72,3.19-21.7.78-43.43,1.34Z" transform="translate(-59.84 -20.85)" style="fill:#1e77bc"/><path d="M157.16,873.61" transform="translate(-59.84 -20.85)" style="fill:#f9f9f9;stroke:#a4e80f;stroke-miterlimit:10;stroke-width:0.5px"/><path d="M233.58,880.05" transform="translate(-59.84 -20.85)" style="fill:#f9f9f9;stroke:lime;stroke-miterlimit:10;stroke-width:0.5px"/><path d="M246.46,892.93" transform="translate(-59.84 -20.85)" style="fill:#f9f9f9;stroke:lime;stroke-miterlimit:10;stroke-width:0.5px"/><path d="M95.27,979.91V873.61H142a15.08,15.08,0,1,1,.23,15.19H110.46v75.92H232.31a15,15,0,1,1-.23,15.19Z" transform="translate(-59.84 -20.85)" style="fill:#f9f9f9"/><path d="M118.58,934.88a15,15,0,0,1,15-15,14.66,14.66,0,0,1,12.6,6.91H219V881.21h61.19a15,15,0,0,1,27.64,7.59v.53a15,15,0,0,1-28.25,7.06h-45.4V942H146.75a15,15,0,0,1-28.17-7.07Z" transform="translate(-59.84 -20.85)" style="fill:#f9f9f9"/></svg>
`.trimStart();

  try {
    fs.writeFileSync(filePath, code, 'utf-8');
    console.log(`✅ Archivo generado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al generar el archivo ${filePath}: ${error.message}`.cyan);
  }
};




const createFaviconSVG = async (fullPath) => {
  // Ruta a la carpeta donde se colocará el logo
  const folderPath = path.join(fullPath, 'public', 'brand', 'images', 'company_logos');

  // Ruta completa del archivo SVG
  const filePath = path.join(folderPath, 'favicon.svg');

  // Crear carpeta si no existe
  createFolder(folderPath);

  // Contenido del archivo SVG
  const code = `
<svg class="w-10 h-10 mr-3" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 904.79 991.96"><defs><radialGradient id="Degradado_sin_nombre_8" cx="449.25" cy="516.28" r="136.76" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="0.57" stop-color="#1e77bc"/></radialGradient></defs><path d="M590.08,10.72" transform="translate(-59.84 -20.85)" style="fill:none;stroke:#a4e80f;stroke-miterlimit:10"/><ellipse cx="449.25" cy="516.28" rx="131.6" ry="141.72" style="fill:url(#Degradado_sin_nombre_8)"/><path d="M995,253.68" transform="translate(-59.84 -20.85)" style="fill:none;stroke:#a4e80f;stroke-miterlimit:10;stroke-width:0.5px"/><path d="M964.63,162.57" transform="translate(-59.84 -20.85)" style="fill:none;stroke:#a4e80f;stroke-miterlimit:10"/><path d="M934.26,203.06" transform="translate(-59.84 -20.85)" style="fill:none;stroke:#a4e80f;stroke-miterlimit:10;stroke-width:0.5px"/><path d="M964.63,20.85V192.94H934.26c-17.31-.2-34.21-.2-50.61,0-362,4.25-534.5,101.23-536.53,101.23-179.58,99.71-103.56,327.28-101.33,334C63.68,557.27,104.17,354.91,104.17,354.91c7.93-42.28,27.51-81.46,53.3-115.64,23.41-31,51.73-58.19,82.36-82,44.22-34.4,91.65-62.38,145.87-77.58,15.32-4.29,30.84-7.86,46.42-11.12,32.34-6.78,65-12,97.74-16.47,35.68-4.89,71.47-8.85,107.32-12.27q53.27-5.09,106.66-8.66,47.86-3.27,95.8-5.63,37.35-1.84,74.72-3.19,21.71-.77,43.43-1.34Z" transform="translate(-59.84 -20.85)" style="fill:#03aeef"/><path d="M867.31,160" transform="translate(-59.84 -20.85)" style="fill:#f9f9f9;stroke:#a4e80f;stroke-miterlimit:10;stroke-width:0.5px"/><path d="M790.89,153.6" transform="translate(-59.84 -20.85)" style="fill:#f9f9f9;stroke:lime;stroke-miterlimit:10;stroke-width:0.5px"/><path d="M778,140.73" transform="translate(-59.84 -20.85)" style="fill:#f9f9f9;stroke:lime;stroke-miterlimit:10;stroke-width:0.5px"/><path d="M929.2,53.75V160H882.51a15.08,15.08,0,1,1-.23-15.19H914V68.93H792.16a15,15,0,1,1,.23-15.18Z" transform="translate(-59.84 -20.85)" style="fill:#f9f9f9"/><path d="M905.89,98.77a15,15,0,0,1-15,15,14.66,14.66,0,0,1-12.6-6.91H805.45v45.56h-61.2a15,15,0,0,1-27.63-7.6v-.53a15,15,0,0,1,28.24-7.06h45.4V91.71h87.46a15,15,0,0,1,28.17,7.06Z" transform="translate(-59.84 -20.85)" style="fill:#f9f9f9"/><path d="M29.47,780" transform="translate(-59.84 -20.85)" style="fill:none;stroke:#a4e80f;stroke-miterlimit:10;stroke-width:0.5px"/><path d="M59.84,871.08" transform="translate(-59.84 -20.85)" style="fill:none;stroke:#a4e80f;stroke-miterlimit:10"/><path d="M90.21,830.59" transform="translate(-59.84 -20.85)" style="fill:none;stroke:#a4e80f;stroke-miterlimit:10;stroke-width:0.5px"/><path d="M59.84,1012.81V840.71H90.21c17.31.21,34.22.21,50.61,0,362-4.25,534.5-101.23,536.53-101.23,179.58-99.71,103.56-327.28,101.33-334C960.79,476.38,920.3,678.74,920.3,678.75,912.37,721,892.79,760.21,867,794.38c-23.41,31-51.73,58.19-82.36,82C740.42,910.79,693,938.77,638.77,954c-15.32,4.3-30.84,7.86-46.42,11.12-32.34,6.78-65,12-97.74,16.47-35.68,4.89-71.47,8.86-107.31,12.27q-53.28,5.08-106.67,8.66-47.87,3.27-95.8,5.63-37.35,1.85-74.72,3.19-21.7.78-43.43,1.34Z" transform="translate(-59.84 -20.85)" style="fill:#1e77bc"/><path d="M157.16,873.61" transform="translate(-59.84 -20.85)" style="fill:#f9f9f9;stroke:#a4e80f;stroke-miterlimit:10;stroke-width:0.5px"/><path d="M233.58,880.05" transform="translate(-59.84 -20.85)" style="fill:#f9f9f9;stroke:lime;stroke-miterlimit:10;stroke-width:0.5px"/><path d="M246.46,892.93" transform="translate(-59.84 -20.85)" style="fill:#f9f9f9;stroke:lime;stroke-miterlimit:10;stroke-width:0.5px"/><path d="M95.27,979.91V873.61H142a15.08,15.08,0,1,1,.23,15.19H110.46v75.92H232.31a15,15,0,1,1-.23,15.19Z" transform="translate(-59.84 -20.85)" style="fill:#f9f9f9"/><path d="M118.58,934.88a15,15,0,0,1,15-15,14.66,14.66,0,0,1,12.6,6.91H219V881.21h61.19a15,15,0,0,1,27.64,7.59v.53a15,15,0,0,1-28.25,7.06h-45.4V942H146.75a15,15,0,0,1-28.17-7.07Z" transform="translate(-59.84 -20.85)" style="fill:#f9f9f9"/></svg>
`.trimStart();

  try {
    fs.writeFileSync(filePath, code, 'utf-8');
    console.log(`✅ Archivo generado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al generar el archivo ${filePath}: ${error.message}`.cyan);
  }
};
