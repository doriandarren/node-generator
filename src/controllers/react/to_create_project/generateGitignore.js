import fs from 'fs';
import path from 'path';
import { printMessage } from '../../../helpers/inquirer.js';


export const generateGitingore = async(fullPath) => {    
    await createGitignore(fullPath)
}


const createGitignore = async (projectPath) => {
  const filePath = path.join(projectPath, ".gitignore");

  const content = `# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
.vscode
.env
`;

  try {
    fs.writeFileSync(filePath, content);
    printMessage(`Archivo creado: ${filePath}`, 'green');
  } catch (error) {
    printMessage(`Error al crear el archivo ${filePath}: ${error.message}`, 'cyan');
  }
};