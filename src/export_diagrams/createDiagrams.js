import fs from 'fs';
import path from 'path';
import { create } from 'xmlbuilder2';



export const createDiagrams = async(table, userColumns) => {    
   
  const parentId = 'WIyWlLk6GJQsqaUBKTNV-1';
  
  const tableId = `${table}-0`;

  const columns = ['id', ...userColumns, 'created_at', 'updated_at', 'deleted_at'];

  const root = create({ version: '1.0', encoding: 'UTF-8' })
    .ele('mxfile', {
      host: 'app.diagrams.net',
      agent: 'NodeGenerated',
      version: '26.1.3'
    })
    .ele('diagram', { id: `${table}-diagram-id`, name: 'Page-1' })
    .ele('mxGraphModel', {
      dx: '1434',
      dy: '785',
      grid: '1',
      gridSize: '10',
      guides: '1',
      tooltips: '1',
      connect: '1',
      arrows: '1',
      fold: '1',
      page: '1',
      pageScale: '1',
      pageWidth: '827',
      pageHeight: '1169',
      math: '0',
      shadow: '0'
    })
    .ele('root');

  root.ele('mxCell', { id: 'WIyWlLk6GJQsqaUBKTNV-0' }).up();
  root.ele('mxCell', { id: parentId, parent: 'WIyWlLk6GJQsqaUBKTNV-0' }).up();

  root.ele('mxCell', {
    id: tableId,
    value: table,
    style: 'swimlane;fontStyle=2;align=center;verticalAlign=top;childLayout=stackLayout;' +
      'horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeLast=0;' +
      'collapsible=1;marginBottom=0;rounded=0;shadow=0;strokeWidth=1;',
    parent: parentId,
    vertex: '1'
  })
    .ele('mxGeometry', {
      x: '220',
      y: '120',
      width: '240',
      height: `${30 + 26 * columns.length}`,
      as: 'geometry'
    })
    .ele('mxRectangle', {
      x: '230',
      y: '140',
      width: '240',
      height: '26',
      as: 'alternateBounds'
    }).up().up().up();

  columns.forEach((field, index) => {
    root.ele('mxCell', {
      id: `${tableId}-${index + 1}`,
      value: field,
      style: 'text;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;' +
        'rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;',
      parent: tableId,
      vertex: '1'
    }).ele('mxGeometry', {
      y: `${26 * (index + 1)}`,
      width: '240',
      height: '26',
      as: 'geometry'
    }).up().up();
  });

  const output = root.end({ prettyPrint: true });
  const outputFilename = path.join(process.cwd(), 'src', 'export_diagrams', `${table}_diagram_generated.drawio`);

  fs.writeFileSync(outputFilename, output, 'utf-8');

  console.log(`✅ Diagrama generado en ${outputFilename}`);

};
