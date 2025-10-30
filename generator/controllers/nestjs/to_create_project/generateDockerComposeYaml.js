import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';


export const generateDockerComposeYaml = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath);
    
    // File
    const filePath = path.join(folderPath, 'docker-compose.yaml');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `version: '3'

services:
  db:
    image: postgres:14.3
    restart: always
    ports: 
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    container_name: teslodb
    volumes:
      - ./postgres:/var/lib/postgresql/data
    
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }

}