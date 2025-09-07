import fs from 'fs';
import path from 'path';
import { printMessage } from '../../../helpers/inquirer.js';


export const generateReadme = async(fullPath) => {    
    await createReadme(fullPath)
}



const createReadme = async (fullPath) => {
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
    printMessage(`Archivo creado: ${filePath}`, 'green');
  } catch (error) {
    printMessage(`Error al crear el archivo ${filePath}: ${error.message}`, 'cyan');
  }
}