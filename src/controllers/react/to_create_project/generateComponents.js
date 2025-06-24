import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';

export const generateButton = async (fullPath) => {
  // Ruta de la carpeta Buttons
  const stylesPath = path.join(fullPath, 'src', 'components', 'Buttons');
  createFolder(stylesPath);

  // Ruta del archivo Button.jsx
  const filePath = path.join(stylesPath, 'Button.jsx');

  // Contenido del componente Button
  const content = `import classNames from "classnames";

export const Button = ({ children, type = "button", variant = "primary", onClick, className, disabled = false }) => {
  return (
    <button
      type={type}
      className={classNames(
        "py-2 px-4 w-full xl:w-32 xl:mr-3 rounded-md text-white font-semibold transition-all duration-200 cursor-pointer",
        {
          "bg-primary hover:bg-primary-dark": !disabled && variant === "primary",
          "bg-gray-400 cursor-not-allowed": disabled,
          "bg-danger hover:bg-danger-dark": !disabled && variant === "danger",
          "bg-secondary hover:bg-secondary-dark": !disabled && variant === "secondary",
          "bg-success hover:bg-success-dark": !disabled && variant === "success",
          "bg-info hover:bg-info-dark": !disabled && variant === "info",
        },
        className
      )}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
`.trimStart();

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo generado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al generar el archivo ${filePath}: ${error.message}`);
  }
};




/**
 * Genera el componente Section.jsx dentro de:
 * src/components/Sections/Section.jsx
 */
export const generateSection = async (fullPath) => {
  // Carpeta destino
  const sectionsDir = path.join(fullPath, 'src', 'components', 'Sections');
  createFolder(sectionsDir);

  // Archivo a crear
  const filePath = path.join(sectionsDir, 'Section.jsx');

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
};




export const generatePreloaderSvg = async (fullPath) => {
  // Carpeta destino
  const preloaderDir = path.join(fullPath, 'src', 'components', 'Preloader');
  createFolder(preloaderDir);

  // Archivo a crear
  const filePath = path.join(preloaderDir, 'PreloaderSVG.jsx');

  // Contenido SVG
  const content = `export const PreloaderSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M2,12A10.94,10.94,0,0,1,5,4.65c-.21-.19-.42-.36-.62-.55h0A11,11,0,0,0,12,23c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z"
      >
        <animateTransform
          attributeName="transform"
          dur="0.6s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        />
      </path>
    </svg>
  );
};
`.trimStart();

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo generado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al generar el archivo ${filePath}: ${error.message}`);
  }
};




export const generatePreloader = async (fullPath) => {
  // Ruta a la carpeta del componente
  const preloaderDir = path.join(fullPath, 'src', 'components', 'Preloader');
  createFolder(preloaderDir);

  // Ruta completa del archivo
  const filePath = path.join(preloaderDir, 'Preloader.jsx');

  // Contenido JSX del componente
  const content = `import { PreloaderSVG } from "./PreloaderSVG";

export const Preloader = () => {
  return (
    <div className="flex justify-center">
      <PreloaderSVG />
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
};