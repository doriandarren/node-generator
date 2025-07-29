import fs from 'fs';
import path from 'path';
import { printMessage } from '../../../helpers/inquirer.js';



export const generateIndexHtml = async(fullPath) => {    
    
  const filePath = path.join(fullPath, "index.html");

  // Verificar si el archivo existe
  if (!fs.existsSync(filePath)) {
    printMessage(`Error: ${filePath} no existe.`, 'cyan');
    return;
  }

  try {
    // Leer el contenido
    let content = fs.readFileSync(filePath, "utf-8");

    // Reemplazos
    content = content.replace('<html lang="en">', '<html lang="es">');
    content = content.replace('/vite.svg', '/favicon.svg');
    content = content.replace('<title>Vite + React</title>', '<title>Site</title>');

    // Escribir el archivo
    fs.writeFileSync(filePath, content);
    printMessage("index.html configurado correctamente.", 'green');
  } catch (error) {
    printMessage(`Error al actualizar ${filePath}: ${error.message}`, 'cyan');
  }
};