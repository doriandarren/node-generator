import fs from 'fs';
import { readInput } from '../helpers/inquirer.js';
import { createDiagrams } from './createDiagrams.js';
import { getBaseDiagramStructure } from './diagramStructure.js';
import { create } from 'xmlbuilder2';


export const generateExportDiagrams = async() => {

  const structure = getBaseDiagramStructure();


  let more = true;
  while (more) {


    const table = (await readInput('🔤 Nombre de la tabla: ')).trim();
    const columnsInput = (await readInput('✏️  Escribe los campos separados por espacios (sin incluir id, timestamps): ')).trim();    
    
    const columns = columnsInput.split(/\s+/).filter(Boolean);

    await createDiagrams(structure, table, columns);

    const again = (await readInput('➕ ¿Quieres añadir otra tabla? (s/n): ')).trim().toLowerCase();
    more = again === 's';
  }




  // Guardar archivo
  const doc = create(structure);
  const xml = doc.end({ prettyPrint: true });

  const outputFilename = `all_tables_diagram.drawio`;
  fs.writeFileSync(outputFilename, xml, 'utf8');
  console.log(`✅ Diagrama con varias tablas generado en ${outputFilename}`);



}




