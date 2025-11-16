import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";

export const generateFolderStatic = async (fullPath) => {
  // Folder
  const folderPath = path.join(fullPath, "src", "static", "uploads");

  // File
  const filePath = path.join(folderPath, ".gitkeep");

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  // Code
  const code = `# .gitkeep`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }
};
