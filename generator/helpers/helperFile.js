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







/**
 * Busca una línea exacta en un archivo y la reemplaza por otra.
 *
 * @param {string} filePath - Ruta completa del archivo a modificar.
 * @param {string} searchLine - Línea que se desea encontrar (coincidencia exacta).
 * @param {string} newLine - Nueva línea con la que se reemplazará.
 */
export async function replaceLineInFile(filePath, searchLine, newLine) {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Archivo no encontrado: ${filePath}`);
      return;
    }

    const fileContent = fs.readFileSync(filePath, "utf8");

    // Divide el archivo en líneas
    const lines = fileContent.split(/\r?\n/);

    // Reemplaza la línea exacta
    let found = false;
    const updatedLines = lines.map((line) => {
      if (line.trim() === searchLine.trim()) {
        found = true;
        return newLine;
      }
      return line;
    });

    if (!found) {
      console.warn(`⚠️ No se encontró la línea: "${searchLine}"`);
      return;
    }

    // Escribir el nuevo contenido al archivo
    fs.writeFileSync(filePath, updatedLines.join("\n"), "utf8");
    console.log(`✅ Línea reemplazada correctamente en: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error al reemplazar línea: ${error.message}`);
  }
}
