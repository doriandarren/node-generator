import fs from 'fs';
import path from 'path';
import { create } from 'xmlbuilder2';


let currentX = 220;
let currentY = 120;

const fullPathDefault = path.join(process.cwd(), 'src', 'assets', 'diagrams');
const fileNameDefault =  new Date().getTime();


export const createDiagrams = async (tables, fullPath = null, fileName = null) => {
  const root = {
    mxfile: {
      '@host': 'app.diagrams.net',
      '@agent': 'NodeGenerated',
      '@version': '26.1.3',
      diagram: {
        '@id': 'diagram-all-tables',
        '@name': 'Page-1',
        mxGraphModel: {
          '@dx': '1434',
          '@dy': '785',
          '@grid': '1',
          '@gridSize': '10',
          '@guides': '1',
          '@tooltips': '1',
          '@connect': '1',
          '@arrows': '1',
          '@fold': '1',
          '@page': '1',
          '@pageScale': '1',
          '@pageWidth': '827',
          '@pageHeight': '1169',
          '@math': '0',
          '@shadow': '0',
          root: {
            mxCell: [
              { '@id': '0' },
              { '@id': '1', '@parent': '0' }
            ]
          }
        }
      }
    }
  };

  const mxCellArray = root.mxfile.diagram.mxGraphModel.root.mxCell;

  for (const { table, columns } of tables) {
    const parentId = "1";
    const tableId = `${table}-0`;
    const fullColumns = ["id", ...columns, "created_at", "updated_at", "deleted_at"];

    mxCellArray.push({
      '@id': tableId,
      '@value': table,
      '@style': 'swimlane;fontStyle=2;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeLast=0;collapsible=1;marginBottom=0;rounded=0;shadow=0;strokeWidth=1;',
      '@parent': parentId,
      '@vertex': '1',
      mxGeometry: {
        '@x': `${currentX}`,
        '@y': `${currentY}`,
        '@width': '240',
        '@height': `${30 + 26 * fullColumns.length}`,
        '@as': 'geometry',
        mxRectangle: {
          '@x': `${currentX + 10}`,
          '@y': `${currentY + 20}`,
          '@width': '240',
          '@height': '26',
          '@as': 'alternateBounds'
        }
      }
    });

    fullColumns.forEach((col, i) => {
      mxCellArray.push({
        '@id': `${tableId}-${i + 1}`,
        '@value': col,
        '@style': 'text;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;',
        '@parent': tableId,
        '@vertex': '1',
        mxGeometry: {
          '@y': `${26 * (i + 1)}`,
          '@width': '240',
          '@height': '26',
          '@as': 'geometry'
        }
      });
    });

    currentY += 60 + 26 * fullColumns.length;
  }

  const doc = create(root);
  const xml = doc.end({ prettyPrint: true });

  if(!fileName){
    fileName = fileNameDefault; 
  }

  if(!fullPath){
    fullPath = fullPathDefault;
  }

  const outputFilename = path.join(fullPath, `${fileName}_diagram.drawio`);
  fs.writeFileSync(outputFilename, xml, 'utf8');
  console.log(`✅ Diagrama con todas las tablas generado en ${outputFilename}`);

};
