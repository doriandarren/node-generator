import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';

export const generateSingleService = async (
  projectPath,
  projectName,
  singularName,
  pluralName,
  singularNameKebab,
  pluralNameKebab,
  singularNameSnake,
  pluralNameSnake,
  singularFirstCamel,
  columns
) => {
  // Ruta a la carpeta de servicios
  const servicesDir = path.join(projectPath, 'src', 'modules', pluralNameSnake, 'services');
  createFolder(servicesDir);

  // Ruta del archivo de servicio
  const filePath = path.join(servicesDir, `${singularFirstCamel}Service.js`);

  // Contenido del servicio
  const content = `
import { api } from "../../../api/api";

/**
 * List
 */
export const get${pluralName} = async () => {
  try {
    const token = localStorage.getItem("token_${projectName}");
    if (!token) {
      console.warn("No hay token disponible en localStorage");
      return [];
    }

    const response = await api("${pluralNameKebab}/list", "GET", null, token);

    if (!response || typeof response !== "object") {
      console.error("Respuesta no válida de la API:", response);
      return [];
    }

    return response;
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    return [];
  }
};

`.trimStart();

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo ${filePath}: ${error.message}`);
  }
};
