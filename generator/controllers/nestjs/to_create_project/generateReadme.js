import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";

export const generateReadme = async (fullPath, projectName) => {
  // Folder
  const folderPath = path.join(fullPath);

  // File
  const filePath = path.join(folderPath, "README.md");

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  // Code
  const code = `# ${projectName} - NestJS and Postgre

The project ${projectName} development with NestJs and database Postgre.

## Settings

1. Clonar proyecto
2. \`\`\`npm install\`\`\`
3. Clonar el archivo \`\`\`.env.template\`\`\` y renombrarlo a \`\`\`.env\`\`\`
4. Cambiar las variables de entorno
5. Levantar la base de datos
\`\`\`
docker-compose up -d
\`\`\`

6. Levantar: \`\`\`npm run start:dev\`\`\`

7. Ejecutar SEED
\`\`\`
http://localhost:3000/api/v1/seed
\`\`\`



## Librerias instaladas:

\`\`\`sh
npm i uuid                                                      // UUID
npm i -D @types/uuid                                            // UUID TypeScript
npm i class-validator class-transformer                         // Para Validacion en el controlador | @UsePipes()
npm i @nestjs/mapped-types                                      // MappedTypes
npm i @nestjs/serve-static                                      // Contenido en carpeta "public"
npm i @nestjs/schedule                                          // Cron 
npm install --save-dev @types/cron                              // Cron 
npm install winston nest-winston winston-daily-rotate-file      // Logs
npm install --save @nestjs/typeorm typeorm pg                   // TypeORM + Postgre
npm install axios                                               // Axios
npm i -D @types/multer                                          // Send and receiver Files

\`\`\`



## Settings

\`\`\`sh

1. Create Project
nest new app-1


2. Remover paquete Prettier:
npm remove prettier eslint-config-prettier eslint-plugin-prettier


3. Agregar en el archivo: "eslint.config.mjs"
...
rules: {
  '@typescript-eslint/no-unused-vars': [
    'warn',
    { argsIgnorePattern: '^_' },
  ],
}
...


4. Librerias para instalar:
npm i uuid                                  // UUID
npm i -D @types/uuid                        // UUID TypeScript
npm i class-validator class-transformer     // Para Validacion en el controlador | @UsePipes()


5. Crear recurso seeder
nest g res seed --no-spec



6. Contenido estatico. Instalar y configurar:
npm i @nestjs/serve-static

--> Y en el archivo "app.module.ts":
...
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),
  ],
})
export class AppModule {}
...



7. Agregar Prefijo: "api/v1". En el archivo: "main.ts":
...
app.setGlobalPrefix('api/v1');
...


8. Crear module Common:

nest g mo common                        // crear un Module Common
nest g pi common/pipes/parseMongoId     // Crear los Pipes

\`\`\`



# Docker

\`\`\`sh

// crear el archivo "docker-compose.yaml"

// Luego:
docker compose up -d

\`\`\`




## Para crear el .env

\`\`\`sh
npm i @nestjs/config

1.- Luego se crea el archivo .env 
2.- Se agrega en el .gitignore. 
3.- Luego En app.module.ts SE AGREGA EN LA PRIMERA LINEA de los "imports":

...
ConfigModule.forRoot({
  load: [ EnvConfiguration ]
}),
...

// Luego crear la carpeta __.src/config/env.config.ts.__ 

...
export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3002,
    defaultLimit: process.env.DEFAULT_LIMIT || 7,
})
...


// Para instalar JOI

npm i joi

// crear archivo: __.src/config/joi.validation.ts.__

...
import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
    NODE_ENV: Joi.required(),
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3005),
    DEFAULT_LIMIT: Joi.number().default(6),
})
...

// Y luego en el __.src/app.module.ts.__:

...
ConfigModule.forRoot({
  ...
  validationSchema: JoiValidationSchema,
}),
...
\`\`\`





## Para crear Modulos

\`\`\`sh

// Create Modules
nest --help
nest g mo cars                          // Module
nest g co cars                          // Controller
nest g s cars --no-spec                 // Service
nest g res brands --no-spec


# Notas importantes:
DTO:
Los dto siempre son clases

\`\`\`


`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }
};
