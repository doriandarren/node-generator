import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../helpers/helperFile.js';


export const generateHelperBuildAccessibleNav = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'helpers');
    
    // File
    const filePath = path.join(folderPath, 'helperBuildAccessibleNav.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { ROLE_MENU_ACCESS } from "./helperRoleMenuAccess.js";

// siempre visible
const DEFAULT_ITEMS = new Set(['dashboard']);

const getRoleNames = (rolesArr) =>
  Array.isArray(rolesArr) ? rolesArr.map(r => r && r.name).filter(Boolean) : [];

export function buildAccessibleNav(nav, rolesArr) {
  const roleNames = getRoleNames(rolesArr);

  // Si algún rol tiene acceso total → todo
  if (roleNames.some(r => ROLE_MENU_ACCESS[r]?.all)) {
    return nav;
  }

  const allowedItems = new Set(DEFAULT_ITEMS); // empieza con dashboard
  const allowedChildren = {};

  // Unir permisos de todos los roles del usuario
  roleNames.forEach(r => {
    const conf = ROLE_MENU_ACCESS[r];
    if (!conf) return;
    (conf.items || []).forEach(id => allowedItems.add(id));
    if (conf.children) {
      Object.entries(conf.children).forEach(([parentId, hrefs]) => {
        if (!allowedChildren[parentId]) allowedChildren[parentId] = new Set();
        hrefs.forEach(h => allowedChildren[parentId].add(h));
      });
    }
  });

  return nav
    .map(item => {
      if (!allowedItems.has(item.id)) return null;

      if (item.children) {
        const set = allowedChildren[item.id];
        // si no hay permisos para hijos, oculta el submenú entero
        if (!set) return null;
        const children = item.children.filter(ch => set.has(ch.href));
        if (children.length === 0) return null;
        return { ...item, children };
      }

      return item;
    })
    .filter(Boolean);
}    
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }

}