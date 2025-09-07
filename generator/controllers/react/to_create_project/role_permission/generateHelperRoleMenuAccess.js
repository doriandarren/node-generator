import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../helpers/helperFile.js';


export const generateHelperRoleMenuAccess = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'helpers');
    
    // File
    const filePath = path.join(folderPath, 'helperRoleMenuAccess.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
export const ROLE_MENU_ACCESS = {
  admin: { all: true },
  manager: { all: true },

  user: {
    items: ['dashboard', 'washes', 'customers'],
    children: {
      customers: ['/admin/companies', '/admin/customer-vehicles'],
    },
  },

  //TODO other roles

};
    
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }

}