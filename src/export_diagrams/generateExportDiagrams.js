import { readInput } from '../helpers/inquirer.js';
import { createDiagrams } from './createDiagrams.js';


export const generateExportDiagrams = async() => {

  const table = (await readInput('🔤 Nombre de la tabla: ')).trim();
  const columnsInput = (await readInput('✏️  Escribe los campos separados por espacios (sin incluir id, timestamps): ')).trim();    
  const userColumns = columnsInput.split(/\s+/).filter(Boolean);

  await createDiagrams(table, userColumns);

}




