import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';


export const generate = async(fullPath) => {    
    updateMainJsx(fullPath)
}


export const updateMainHtml = (fullPath) => {
  const filePath = path.join(fullPath, "index.html");

  // Verificar si el archivo existe
  if (!fs.existsSync(filePath)) {
    printMessage(`Error: ${filePath} no existe.`, CYAN);
    return;
  }

  try {
    // Leer el contenido
    let content = fs.readFileSync(filePath, "utf-8");

    // Reemplazos
    content = content.replace('<html lang="en">', '<html lang="es">');
    content = content.replace('<title>Vite + React</title>', '<title>Site</title>');

    // Escribir el archivo
    fs.writeFileSync(filePath, content);
    printMessage("index.html configurado correctamente.", GREEN);
  } catch (error) {
    printMessage(`Error al actualizar ${filePath}: ${error.message}`, CYAN);
  }
};