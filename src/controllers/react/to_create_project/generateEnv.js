import fs from 'fs';
import path from 'path';
import { printMessage } from '../../../helpers/inquirer.js';


export const generateEnv = async(fullPath) => {    
    await createEnvFile(fullPath)
    await createEnvExampleFile(fullPath)
}


const createEnvFile = async (fullPath) => {
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
    printMessage(`Archivo creado: ${filePath}`, 'green');
  } catch (error) {
    printMessage(`Error al crear el archivo ${filePath}: ${error.message}`, 'cyan');
  }
}



const createEnvExampleFile = async (fullPath) => {
  const filePath = path.join(fullPath, ".env.example");

  const content = `VITE_APP_NAME=SiteLocal
VITE_APP_ENV=local

# --------------
# PROD
# --------------
# VITE_API_URL=https://project.com/api/v1/

# --------------
# DEV - DOCKER
# --------------
VITE_API_URL=http://project.test/api/v1/

# --------------
# Php server
# --------------
#VITE_API_URL=http://localhost:8010/api/v1/  


## SWEETALERT2
VITE_SWEETALERT_COLOR_BTN_SUCCESS='#10B981'  # Verde (Tailwind "emerald-500")
VITE_SWEETALERT_COLOR_BTN_DANGER='#EF4444'   # Rojo (Tailwind "red-500")
VITE_SWEETALERT_COLOR_BTN_WARNING='#F59E0B'  # Amarillo (Tailwind "amber-500")
VITE_SWEETALERT_COLOR_BTN_INFO='#3B82F6'     # Azul (Tailwind "blue-500")
`;

  try {
    fs.writeFileSync(filePath, content);
    printMessage(`Archivo creado: ${filePath}`, 'green');
  } catch (error) {
    printMessage(`Error al crear el archivo ${filePath}: ${error.message}`, 'cyan');
  }
}