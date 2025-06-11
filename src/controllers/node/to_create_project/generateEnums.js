import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';


export const generateEnums = async(fullPath) => {
    await createEnumRole(fullPath);
    await createEnumUserStatuses(fullPath);
}


const createEnumRole = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'enums');
    
    // File
    const filePath = path.join(folderPath, 'enumRole.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
export const EnumRole = {
  // Slugs / nombres cortos
  ADMIN: "admin",
  MANAGER: "manager",
  USER: "user",
  ERP: "erp",

  // Descripciones
  ADMIN_DESCRIPTION: "Admin",
  MANAGER_DESCRIPTION: "Manager",
  USER_DESCRIPTION: "User",
  ERP_DESCRIPTION: "Erp",

  // IDs
  ADMIN_ID: 1,
  MANAGER_ID: 2,
  USER_ID: 3,
  ERP_ID: 4,
};
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}





const createEnumUserStatuses = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'enums');
    
    // File
    const filePath = path.join(folderPath, 'enumsUserStatuses.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
export const EnumUserStatus = {
  STATUS_ACTIVE_ID: 1,
  STATUS_INACTIVE_ID: 2,

  STATUS_ACTIVE_NAME: "ACTIVE",
  STATUS_INACTIVE_NAME: "INACTIVE",
};

`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}