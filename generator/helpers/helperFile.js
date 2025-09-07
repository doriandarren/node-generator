import { exec } from 'child_process';
import fs from 'fs';



export function runExec(cmd, cwd = process.cwd()) {
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd }, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error al ejecutar: ${error.message}`);
        reject(error);
        return;
      }

      if (stderr) console.error(`⚠️ STDERR:\n${stderr}`);
      if (stdout) console.log(`📤 STDOUT:\n${stdout}`);

      resolve();
    });
  });
}




/**
 * Crea una carpeta si no existe.
 * @param {string} targetPath - Ruta de la carpeta.
 */
export function createFolder(targetPath) {
  try {
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true });
      console.log(`📁 Carpeta creada: ${targetPath}`.green);
    }
  } catch (error) {
    console.error(`❌ Error creando carpeta: ${targetPath}\n${error.message}`.red);
  }
}




