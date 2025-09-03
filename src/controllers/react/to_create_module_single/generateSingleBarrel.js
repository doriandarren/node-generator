import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';

export const generateSingleBarrel = async (
  projectPath,
  singularName,
  pluralNameSnake
) => {
  // Ruta del directorio 'pages'
  const pagesDir = path.join(projectPath, 'src', 'modules', pluralNameSnake, 'pages');
  createFolder(pagesDir);

  // Ruta del archivo index.js
  const filePath = path.join(pagesDir, 'index.js');

  // Contenido del barrel file
  const content = `
export * from './${singularName}Page';
`.trimStart();

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo ${filePath}: ${error.message}`);
  }
};
