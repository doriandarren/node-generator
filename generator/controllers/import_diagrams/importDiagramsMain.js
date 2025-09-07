import fs from 'fs';
import path from 'path';
import { parseDrawioFile } from './parseDrawioFile.js';
import inquirer from 'inquirer';
import { convertSnakeCaseToPascalCase, convertSnakeCaseToPascalSingularCase } from '../../helpers/helperString.js';



export const importDiagramsMain = async () => {

  console.clear();
  console.log('========================================'.green);
  console.log('    Seleccione un opción IMPORT DIAGRAMS'.white);
  console.log('========================================\n'.green);

  const folderPath = path.join(process.cwd(), 'src', 'assets', 'diagrams');

  // Obtener todos los archivos .xml o .drawio.xml
  const allFiles = fs.readdirSync(folderPath);
  const xmlFilesTemp = allFiles.filter(f => f.endsWith('.xml') || f.endsWith('.drawio'));

  const xmlFiles = [ ...xmlFilesTemp,  { name: "Atrás", value: "back" }];

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



  if (fileName.value === "back") {
    return;
  }


  const filePath = path.join(folderPath, fileName);
  const result = await parseDrawioFile(filePath);

  if (result) {

    result.forEach( el => {
      
      const tableNamePluralPascal = convertSnakeCaseToPascalCase(el.table);
      const tableNameSingularPascal = convertSnakeCaseToPascalSingularCase(el.table);

      console.log(`📄 Table: ${el.table} - ${tableNameSingularPascal} - ${tableNamePluralPascal}`);

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

