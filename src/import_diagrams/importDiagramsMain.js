import fs from 'fs';
import path from 'path';
import { parseDrawioFile } from './parseDrawioFile.js';
import inquirer from 'inquirer';



export const importDiagramsMain = async () => {
  const folderPath = path.join(process.cwd(), 'src', 'assets', 'diagrams');

  // Obtener todos los archivos .xml o .drawio.xml
  const allFiles = fs.readdirSync(folderPath);
  const xmlFiles = allFiles.filter(f => f.endsWith('.xml') || f.endsWith('.drawio'));

  if (xmlFiles.length === 0) {
    console.log('❌ No se encontraron archivos .xml en la carpeta.');
    return;
  }

  // Mostrar lista para elegir
  const { fileName } = await inquirer.prompt([
    {
      type: 'list',
      name: 'fileName',
      message: '📂 Selecciona un archivo para importar:',
      choices: xmlFiles,
    },
  ]);

  const filePath = path.join(folderPath, fileName);
  const result = await parseDrawioFile(filePath);

  if (result) {

    //console.log('✅ Tablas importadas:', JSON.stringify(result, null, 2));

    result.forEach( el => {
      console.log(`📄 Table: ${el.table}`);

      const cleanColumns = el.columns.filter( c => 
        !['id', 'created_at', 'updated_at', 'deleted_at'].includes(c)
      );

      let str = '';

      cleanColumns.forEach( c => {
        str += c + ' ';
      });

      if(str.length > 0){

        console.log(`Columns: ${str}`);
      }

      console.log(" ");
    });

  }
}

