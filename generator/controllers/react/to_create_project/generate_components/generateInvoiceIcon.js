import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../helpers/helperFile.js';



export const generateInvoiceIcon = async (fullPath) => {
  const stylesPath = path.join(fullPath, 'src', 'components', 'Icons');
  createFolder(stylesPath);

  const filePath = path.join(stylesPath, 'ThemedInvoiceIcon.jsx');

  const content = `import classNames from "classnames";
import { getVariantTextClass } from "../../helpers/helperVariantClass";

export const ThemedInvoiceIcon = ({ variant = "neutral", className = "w-6 h-6" }) => {
  return (
    <svg
      className={classNames(className, getVariantTextClass(variant))}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 2a2 2 0 0 0-2 2v16l4-2 4 2 4-2 4 2V4a2 2 0 0 0-2-2H6zm2 4h8v2H8V6zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
    </svg>
  );
};
`;

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo generado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al generar el archivo ${filePath}: ${error.message}`);
  }
}
