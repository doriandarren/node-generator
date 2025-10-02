import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { createFolder } from '../../../helpers/helperFile.js';

export const generatePostmanPHP = async (
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

  const folderPath = path.join(fullPath, 'public', 'Scripts');
  
  const filePath = path.join(folderPath, `${singularName}Collection.json`);

  
  createFolder(folderPath);

  const columnNames = columns.map(col => col.name);

  // Generar datos para body (formdata y urlencoded)
  const formdata = columnNames.map(column => ({
    key: column,
    value: `New ${column}`,
    type: 'text'
  }));

  const urlencoded = columnNames.map(column => ({
    key: column,
    value: `Update ${column}`,
    type: 'text'
  }));



  const queryList =  columnNames.map(column => ({
    key: column,
    value: "",
    disabled: true
  }));



  const postmanContent = {
    info: {
      _postman_id: uuid(),
      name: singularName,
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
      _exporter_id: '5599797'
    },
    item: [
      {
        name: pluralName,
        item: [
          {
            name: 'List',
            protocolProfileBehavior: { disableBodyPruning: true },
            request: {
              method: 'GET',
              header: [
                { key: 'Accept', value: 'application/json', type: 'text' },
                { key: 'Authorization', value: 'Bearer {{token_api}}', type: 'text' }
              ],
              url: {
                raw: `{{base_url}}${pluralNameKebab}/list`,
                host: [`{{base_url}}${pluralNameKebab}`],
                path: ['list'],
                query: queryList,
              }
            },
            response: []
          },
          {
            name: 'Show',
            protocolProfileBehavior: { disableBodyPruning: true },
            request: {
              method: 'GET',
              header: [
                { key: 'Accept', value: 'application/json', type: 'text' },
                { key: 'Authorization', value: 'Bearer {{token_api}}', type: 'text' }
              ],
              url: {
                raw: `{{base_url}}${pluralNameKebab}/show/1`,
                host: [`{{base_url}}${pluralNameKebab}`],
                path: ['show', '1']
              }
            },
            response: []
          },
          {
            name: 'Store',
            request: {
              method: 'POST',
              header: [
                { key: 'Accept', value: 'application/json', type: 'text' },
                { key: 'Authorization', value: 'Bearer {{token_api}}', type: 'text' }
              ],
              body: {
                mode: 'formdata',
                formdata: formdata
              },
              url: {
                raw: `{{base_url}}${pluralNameKebab}/store`,
                host: [`{{base_url}}${pluralNameKebab}`],
                path: ['store']
              }
            },
            response: []
          },
          {
            name: 'Update',
            request: {
              method: 'PUT',
              header: [
                { key: 'Accept', value: 'application/json', type: 'text' },
                { key: 'Authorization', value: 'Bearer {{token_api}}', type: 'text' }
              ],
              body: {
                mode: 'urlencoded',
                urlencoded: urlencoded
              },
              url: {
                raw: `{{base_url}}${pluralNameKebab}/update/1`,
                host: [`{{base_url}}${pluralNameKebab}`],
                path: ['update', '1']
              }
            },
            response: []
          },
          {
            name: 'Delete',
            request: {
              method: 'DELETE',
              header: [
                { key: 'Accept', value: 'application/json', type: 'text' },
                { key: 'Authorization', value: 'Bearer {{token_api}}', type: 'text' }
              ],
              url: {
                raw: `{{base_url}}${pluralNameKebab}/delete/1`,
                host: [`{{base_url}}${pluralNameKebab}`],
                path: ['delete', '1']
              }
            },
            response: []
          }
        ]
      }
    ]
  };

  // Escribir archivo JSON
  try {
    fs.writeFileSync(filePath, JSON.stringify(postmanContent, null, 4), 'utf-8');
    console.log(`✅ Archivo de colección Postman creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear colección Postman: ${error.message}`.red);
  }
};
