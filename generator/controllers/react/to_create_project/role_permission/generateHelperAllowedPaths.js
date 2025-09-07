import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../helpers/helperFile.js';


export const generateHelperAllowedPaths = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'helpers');
    
    // File
    const filePath = path.join(folderPath, 'helperAllowedPaths.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
// helpers/helperAllowedPaths.js
import { ROLE_MENU_ACCESS } from "./helperRoleMenuAccess.js";

// Dashboard siempre permitido
export const DEFAULT_ITEMS = new Set(["dashboard"]);

/**
 * Mapea IDs raíz de tu navigation → rutas base reales del router.
 * Deben existir en tu AppRouter (path=".../*").
 */
export const ROOT_ID_TO_HREF = {
  dashboard: "/admin/dashboard",
  teams: "/admin/teams",
  // Usa la página índice real de Settings como base:
  settings: "/admin/systems",
  // Si prefieres no tener base para settings, elimina la línea de arriba.
};

/**
 * Convierte roles del usuario → conjunto de rutas permitidas.
 * - Admin/manager (all:true): permite todo /admin/*
 * - Para el resto: permite las bases por id y los hijos explícitos.
 */
export function getAllowedPathsByRoles(rolesArr = []) {
  const roleNames = (Array.isArray(rolesArr) ? rolesArr : [])
    .map((r) => (r?.name ?? r))
    .filter(Boolean)
    .map((s) => String(s).toLowerCase().trim());

  // Acceso total
  if (roleNames.some((r) => ROLE_MENU_ACCESS[r]?.all)) {
    return new Set(["/admin"]);
  }

  const allowedRootIds = new Set(DEFAULT_ITEMS); // arranca con dashboard
  const allowedChildren = new Set();

  for (const r of roleNames) {
    const conf = ROLE_MENU_ACCESS[r];
    if (!conf) continue;

    (conf.items || []).forEach((id) => allowedRootIds.add(id));

    if (conf.children) {
      Object.values(conf.children).forEach((hrefs) => {
        hrefs.forEach((h) => allowedChildren.add(h));
      });
    }
  }

  // ids raíz → rutas base reales
  const allowedPaths = new Set(
    [...allowedRootIds]
      .map((id) => ROOT_ID_TO_HREF[id])
      .filter(Boolean)
  );

  // hijos explícitos
  allowedChildren.forEach((h) => allowedPaths.add(h));

  return allowedPaths;
} 
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }

}