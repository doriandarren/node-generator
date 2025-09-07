import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';


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

npm install multer                      // Para parse form-data

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



## Project folders


\`\`\`sh

project-root/
│── node_modules/          # Dependencias instaladas
│── public/                # Archivos estáticos (imagenes, CSS, JS del cliente)
│── src/
│   ├── config/            # Configuración global (db, server, logger, etc.)
│   ├── controllers/       # Controladores: reciben requests y llaman a services/repos
│   ├── database/          # Conexión y seeds/migrations
│   ├── enums/             # Constantes y enumeraciones
│   ├── helpers/           # Funciones utilitarias
│   ├── middlewares/       # Middlewares (auth, logs, validaciones, etc.)
│   ├── models/            # Modelos de datos (ORM: Sequelize, Mongoose, Prisma…)
│   ├── repositories/      # Acceso a datos (queries a DB)
│   ├── routes/            # Definición de endpoints
│   ├── services/          # Lógica de negocio
│   ├── scripts/           # Scripts de mantenimiento o tareas
│   ├── server/            # Inicialización del servidor
│   └── app.js             # Configuración principal de la app
│
│── .env                   # Variables de entorno
│── .env.example           # Ejemplo de variables
│── .gitignore
│── package.json
│── package-lock.json
│── README.md

\`\`\`






`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}