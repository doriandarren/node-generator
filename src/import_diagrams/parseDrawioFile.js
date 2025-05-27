import fs from 'fs';
import pkg from 'xmlbuilder2';
const { convert } = pkg;



export const parseDrawioFile = async (filePath) => {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Archivo no encontrado: ${filePath}`);
    return null;
  }

  const xmlContent = fs.readFileSync(filePath, 'utf8');
  const doc = convert(xmlContent, { format: 'object' });

  const rawCells = doc?.mxfile?.diagram?.mxGraphModel?.root?.mxCell;
  if (!rawCells) {
    console.error(`❌ No se encontraron mxCell en el archivo.`);
    return null;
  }

  const cells = Array.isArray(rawCells) ? rawCells : [rawCells];

  const tables = {};

  // 1. Detectar tablas por estilo "swimlane"
  for (const cell of cells) {
    const id = cell['@id'];
    const value = decodeURIComponent(cell['@value'] || '');
    const style = cell['@style'] || '';

    if (style.includes('swimlane') && value) {
      tables[id] = {
        table: value,
        columns: []
      };
    }
  }

  // 2. Detectar columnas (celdas cuyo parent es una tabla detectada)
  for (const cell of cells) {
    const value = decodeURIComponent(cell['@value'] || '');
    const parent = cell['@parent'];

    if (tables[parent] && value) {
      tables[parent].columns.push(value);
    }
  }

  return Object.values(tables);
}