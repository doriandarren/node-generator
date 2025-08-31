import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../helpers/helperFile.js';



export const generateBadge = async (fullPath) => {
  const badgeDir = path.join(fullPath, 'src', 'components', 'Badges');
  createFolder(badgeDir);

  const filePath = path.join(badgeDir, 'ThemedBadge.jsx');

  const content = `import classNames from "classnames";
import { getVariantBgClass } from "../../helpers/helperVariantClass";

export const ThemedBadge = ({ text, variant = "gray", className = "" }) => {
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        getVariantBgClass(variant),
        "text-white",
        className
      )}
    >
      {text}
    </span>
  );
};
`.trimStart();

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo generado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al generar el archivo ${filePath}: ${error.message}`);
  }
}
