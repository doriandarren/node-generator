import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { createFolder } from '../../helpers/helperFile.js';


export const generatePostman = async(
  fullPath, 
  namespace,
  singularName,
  pluralName,
  singularNameKebab,
  pluralNameKebab,
  singularNameSnake,
  pluralNameSnake,
  singularNameCamel,
  pluralNameCamel,
  columns
) => {    

    // Folder
    const folderPath = path.join(fullPath, 'public', 'scripts');
    
    // File
    const filePath = path.join(folderPath, `${singularName}Collection.json`);

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Obtener nombres de columnas
    const columnNames = columns.map(col => col.name);


// Generar contenido Postman con UUID dinámico
  const postmanContent = {
    info: {
      _postman_id: uuidv4(),
      name: singularName,
      schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
      _exporter_id: "5599797"
    },
    item: [
      {
        name: pluralName,
        item: [
          {
            name: "List",
            protocolProfileBehavior: { disableBodyPruning: true },
            request: {
              method: "GET",
              header: [
                { key: "Accept", value: "application/json", type: "text" },
                { key: "Authorization", value: "Bearer {{token_api}}", type: "text" }
              ],
              url: {
                raw: `{{base_url}}${pluralNameKebab}/list`,
                host: [`{{base_url}}${pluralNameKebab}`],
                path: ["list"]
              }
            },
            response: []
          },
          {
            name: "Show",
            protocolProfileBehavior: { disableBodyPruning: true },
            request: {
              method: "GET",
              header: [
                { key: "Accept", value: "application/json", type: "text" },
                { key: "Authorization", value: "Bearer {{token_api}}", type: "text" }
              ],
              url: {
                raw: `{{base_url}}${pluralNameKebab}/show/1`,
                host: [`{{base_url}}${pluralNameKebab}`],
                path: ["show", "1"]
              }
            },
            response: []
          },
          {
            name: "Store",
            request: {
              method: "POST",
              header: [
                { key: "Accept", value: "application/json", type: "text" },
                { key: "Authorization", value: "Bearer {{token_api}}", type: "text" }
              ],
              body: {
                mode: "formdata",
                formdata: columnNames.map(col => ({
                  key: col,
                  value: `New ${col}`,
                  type: "text"
                }))
              },
              url: {
                raw: `{{base_url}}${pluralNameKebab}/store`,
                host: [`{{base_url}}${pluralNameKebab}`],
                path: ["store"]
              }
            },
            response: []
          },
          {
            name: "Update",
            request: {
              method: "PUT",
              header: [
                { key: "Accept", value: "application/json", type: "text" },
                { key: "Authorization", value: "Bearer {{token_api}}", type: "text" }
              ],
              body: {
                mode: "urlencoded",
                urlencoded: columnNames.map(col => ({
                  key: col,
                  value: `Update ${col}`,
                  type: "text"
                }))
              },
              url: {
                raw: `{{base_url}}${pluralNameKebab}/update/1`,
                host: [`{{base_url}}${pluralNameKebab}`],
                path: ["update", "1"]
              }
            },
            response: []
          },
          {
            name: "Delete",
            request: {
              method: "DELETE",
              header: [
                { key: "Accept", value: "application/json", type: "text" },
                { key: "Authorization", value: "Bearer {{token_api}}", type: "text" }
              ],
              url: {
                raw: `{{base_url}}${pluralNameKebab}/delete/1`,
                host: [`{{base_url}}${pluralNameKebab}`],
                path: ["delete", "1"]
              }
            },
            response: []
          }
        ]
      }
    ]
  };

  


  try {
    fs.writeFileSync(filePath, JSON.stringify(postmanContent, null, 4));
    console.log(`✅ Archivo Postman creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }

}