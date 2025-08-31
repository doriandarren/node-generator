import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../helpers/helperFile.js';


export const generateAlert = async (fullPath) => {
  const folder = path.join(fullPath, 'src', 'components', 'Alerts');
  createFolder(folder);

  const filePath = path.join(folder, 'ThemedAlert.jsx');

  const content = `import classNames from "classnames";
import { getVariantBgClass, getVariantTextClass } from "../../helpers/helperVariantClass";

export const Alert = ({ text, variant = "info", icon = null, className = "" }) => {
  return (
    <div
      role="alert"
      className={classNames(
        "flex items-center gap-3 rounded-lg px-4 py-3 text-sm",
        getVariantBgClass(variant),
        getVariantTextClass(variant),
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{text}</span>
    </div>
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
