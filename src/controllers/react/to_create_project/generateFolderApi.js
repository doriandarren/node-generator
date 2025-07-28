import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';
import { printMessage } from '../../../helpers/inquirer.js';


export const generateFolderApi = async(fullPath) => {    
    await createApiFile(fullPath)
}



export const createApiFile = async(fullPath) => {
  const pagesDir = path.join(fullPath, "src", "api");
  const filePath = path.join(pagesDir, "api.js");

  // Crear carpeta si no existe
  createFolder(pagesDir);

  // Contenido del archivo
  const content = `const API_URL = import.meta.env.VITE_API_URL;

export const api = async (endpoint, method = "GET", body = null, token = null) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = \`Bearer \${token}\`;
  }

  try {
    const response = await fetch(\`\${API_URL}\${endpoint}\`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    // if (!response.ok) {
    //   throw new Error(\`Error \${response.status}: \${response.statusText}\`);
    // }

    return await response.json();
  } catch (error) {
    console.error("Error en la petición:", error);
    throw error;
  }
};
`;

  // Crear archivo
  try {
    fs.writeFileSync(filePath, content);
    printMessage(`Archivo creado: ${filePath}`, 'green');
  } catch (error) {
    printMessage(`Error al crear el archivo ${filePath}: ${error.message}`, 'cyan');
  }
};