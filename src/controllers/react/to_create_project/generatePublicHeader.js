import fs from 'fs';
import path from 'path';
import colors from 'colors';
import { createFolder } from '../../../helpers/helperFile.js';



export const generatePublicHeader = async(fullPath) => {
    await createPublicHeaderLayout(fullPath);
    await createPublicLayout(fullPath);
}






/**
 * Genera el archivo HeaderLayout.jsx dentro de src/layouts/public.
 * @param {string} projectPath - Ruta base del proyecto.
 */
const createPublicHeaderLayout = async (projectPath) => {
  console.log('🛠️  Generando HeaderLayout.jsx...'.cyan);

  // Rutas
  const layoutsDir = path.join(projectPath, 'src', 'layouts', 'public');
  const filePath = path.join(layoutsDir, 'HeaderLayout.jsx');
  const templatePath = path.join(process.cwd(), 'templates', 'HeaderLayout.template.txt');

  // Crear carpeta si no existe
  createFolder(layoutsDir);

  // Leer plantilla
  let content = '';
  try {
    content = fs.readFileSync(templatePath, 'utf-8');
  } catch (err) {
    console.error(`❌ Plantilla no encontrada: ${templatePath}`.red);
    return;
  }

  // Escribir archivo
  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`.red);
  }
};






/**
 * Genera el archivo PublicLayout.jsx dentro de src/layouts/public.
 * @param {string} projectPath - Ruta base del proyecto.
 */
const createPublicLayout = async (projectPath) => {
  console.log('🛠️  Generando PublicLayout.jsx...'.cyan);

  // Ruta de carpetas y archivo
  const layoutsDir = path.join(projectPath, 'src', 'layouts', 'public');
  const filePath = path.join(layoutsDir, 'PublicLayout.jsx');

  // Crear carpeta si no existe
  createFolder(layoutsDir);

  // Contenido del archivo
  const mainLayoutContent = `
import { FooterLayout } from "./FooterLayout";
import { HeaderLayout } from "./HeaderLayout";

export const PublicLayout = ({ children }) => {
  return (
    <div className="bg-white">
      <HeaderLayout />
      {children}
      <FooterLayout />
    </div>
  );
};
`.trimStart();

  // Crear archivo
  try {
    fs.writeFileSync(filePath, mainLayoutContent);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear el archivo ${filePath}: ${error.message}`.red);
  }
};
