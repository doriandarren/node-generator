let currentX = 220;
let currentY = 120;

export const createDiagrams = async (structure, table, userColumns) => {
  const parentId = "1";
  const tableId = `${table}-0`;
  const columns = ["id", ...userColumns, "created_at", "updated_at", "deleted_at"];
  const mxCellArray = structure.mxfile.diagram.mxGraphModel.root.mxCell;

  // Agrega contenedor de tabla
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
      '@height': `${30 + 26 * columns.length}`,
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

  // Agrega campos
  columns.forEach((col, i) => {
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

  // Ajusta posición para siguiente tabla
  currentY += 60 + 26 * columns.length;
};
