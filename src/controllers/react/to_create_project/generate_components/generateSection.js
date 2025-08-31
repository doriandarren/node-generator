import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../helpers/helperFile.js';



export const generateSection = async (fullPath) => {
  // Carpeta destino
  const sectionsDir = path.join(fullPath, 'src', 'components', 'Sections');
  createFolder(sectionsDir);

  // Archivo a crear
  const filePath = path.join(sectionsDir, 'ThemedSection.jsx');

  // Contenido del componente
  const content = `import classNames from "classnames";

export const Section = ({ title, subtitle, className, children }) => {
  return (
    <section className={classNames("section", className)}>
      <div className="section__container">
        {title && <h2 className="section__heading">{title}</h2>}
        {subtitle && <p className="section__subtitle">{subtitle}</p>}
        {children}
      </div>
    </section>
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