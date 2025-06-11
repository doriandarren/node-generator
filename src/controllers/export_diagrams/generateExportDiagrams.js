import { readInput } from '../../helpers/inquirer.js';
import { createDiagrams } from './createDiagrams.js';


export const generateExportDiagrams = async() => {

  console.clear();
  console.log('========================================'.green);
  console.log('    Seleccione un opción EXPORT DIAGRAMS'.white);
  console.log('========================================\n'.green);

  const myTables = [];

  let more = true;
  while (more) {
    const table = (await readInput('🔤 Nombre de la tabla: ')).trim();
    const columnsInput = (await readInput('✏️  Escribe los campos separados por espacios (sin incluir id, timestamps): ')).trim();    
    const columns = columnsInput.split(/\s+/).filter(Boolean);

    myTables.push({ table, columns });

    const again = (await readInput('➕ ¿Quieres añadir otra tabla? (s/n): ')).trim().toLowerCase();
    more = again === 's';
  }

  await createDiagrams(myTables);

}




