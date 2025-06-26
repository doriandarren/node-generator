import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';


export const generateReadme = async(fullPath) => {    
    createReadme(fullPath)
}



export const createReadme = (fullPath) => {
  const filePath = path.join(fullPath, "README.md");

  const content = `# Project

## Setup

\`\`\`sh
npm install
\`\`\`

### Compile and Hot-Reload for Development

\`\`\`sh
npm run dev
\`\`\`

### Compile and Minify for Production

\`\`\`sh
npm run build
\`\`\`
`;

  try {
    fs.writeFileSync(filePath, content);
    printMessage(`Archivo creado: ${filePath}`, GREEN);
  } catch (error) {
    printMessage(`Error al crear el archivo ${filePath}: ${error.message}`, CYAN);
  }
};