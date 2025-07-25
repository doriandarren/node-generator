import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';


export const generateEnv = async(fullPath) => {    
    createEnvFile(fullPath)
    createEnvExampleFile(fullPath)
}


export const createEnvFile = (fullPath) => {
  const filePath = path.join(fullPath, ".env");

  const content = `VITE_APP_NAME=SiteLocal
VITE_APP_ENV=local
VITE_API_URL=https://api.splytin.com/api/v1/

## SWEETALERT2
VITE_SWEETALERT_COLOR_BTN_SUCCESS='#10B981'  # Verde (Tailwind "emerald-500")
VITE_SWEETALERT_COLOR_BTN_DANGER='#EF4444'   # Rojo (Tailwind "red-500")
VITE_SWEETALERT_COLOR_BTN_WARNING='#F59E0B' # Amarillo (Tailwind "amber-500")
VITE_SWEETALERT_COLOR_BTN_INFO='#3B82F6'     # Azul (Tailwind "blue-500")
`;

  try {
    fs.writeFileSync(filePath, content);
    printMessage(`Archivo creado: ${filePath}`, GREEN);
  } catch (error) {
    printMessage(`Error al crear el archivo ${filePath}: ${error.message}`, CYAN);
  }
};



export const createEnvExampleFile = (projectPath) => {
  const filePath = path.join(projectPath, ".env.example");

  const content = `VITE_APP_NAME=SiteLocal
VITE_APP_ENV=local
VITE_API_URL=http://project.test/api/v1/

## SWEETALERT2
VITE_SWEETALERT_COLOR_BTN_SUCCESS='#10B981'  # Verde (Tailwind "emerald-500")
VITE_SWEETALERT_COLOR_BTN_DANGER='#EF4444'   # Rojo (Tailwind "red-500")
VITE_SWEETALERT_COLOR_BTN_WARNING='#F59E0B'  # Amarillo (Tailwind "amber-500")
VITE_SWEETALERT_COLOR_BTN_INFO='#3B82F6'     # Azul (Tailwind "blue-500")
`;

  try {
    fs.writeFileSync(filePath, content);
    printMessage(`Archivo creado: ${filePath}`, GREEN);
  } catch (error) {
    printMessage(`Error al crear el archivo ${filePath}: ${error.message}`, CYAN);
  }
};