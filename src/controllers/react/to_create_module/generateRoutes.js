import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';

export const generateRoutes = (projectPath, singularName, pluralNameSnake) => {
  // Define la ruta de la carpeta y el archivo
  const routesDir = path.join(projectPath, 'src', 'modules', pluralNameSnake, 'routes');
  const filePath = path.join(routesDir, `${singularName}Routes.jsx`);

  // Crear la carpeta si no existe
  createFolder(routesDir);

  // Contenido del archivo JSX
  const content = `import { Route, Routes } from "react-router";
import { ${singularName}Page, ${singularName}CreatePage, ${singularName}EditPage } from "../pages";

export const ${singularName}Routes = () => {
  return (
    <Routes>
      <Route path="/" element={<${singularName}Page />} />
      <Route path="create" element={<${singularName}CreatePage />} />
      <Route path="edit/:id" element={<${singularName}EditPage />} />
    </Routes>
  );
};
`;

  // Crear el archivo y escribir el contenido
  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo creado: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error al crear el archivo ${filePath}: ${error}`);
  }
};
