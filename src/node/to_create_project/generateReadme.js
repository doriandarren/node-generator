import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';


export const generateReadme = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath);
    
    // File
    const filePath = path.join(folderPath, 'readme.md');

    // Asegurar que la carpeta 'src' exista
    createFolder(folderPath);


    // Code
    const code = `
# Project TODO

## Installation

\`\`\`sh

npm init -y

npm i express                           // Express
npm i express-validator                 // Validator fields
npm i bcryptjs                          // Encriptar password
npm i dotenv                            // DotEnv
npm i cors                              // Cors

npm install sequelize mysql2            // ORM Sequelize
npm i jsonwebtoken                      // JSON webtoken

\`\`\`



## Run Server

\`\`\`sh

npm run dev

npm run db:connection                   // Test DB connection

\`\`\`



## Opcional Handlebars

Fuente: https://github.com/pillarjs/hbs

\`\`\`sh

npm install hbs

\`\`\`

`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}