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

export const generatePreloaderMain = async (fullPath) => {
  // Carpeta destino
  const preloaderDir = path.join(fullPath, 'src', 'components', 'Preloader');
  createFolder(preloaderDir);

  // Archivo a crear
  const filePath = path.join(preloaderDir, 'PreloaderMain.jsx');

  // Contenido del componente
  const content = `import { PreloaderSVG } from "./PreloaderSVG";
import "./PreloaderMain.css";

export const PreloaderMain = () => {
  return (
    <div className="preloader flex justify-center">
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


export const generatePreloaderMainCss = async (fullPath) => {
  // Carpeta destino
  const preloaderDir = path.join(fullPath, 'src', 'components', 'Preloader');
  createFolder(preloaderDir);

  // Archivo a crear
  const filePath = path.join(preloaderDir, 'PreloaderMain.css');

  // Contenido CSS
  const content = `.preloader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`.trimStart();

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo generado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al generar el archivo ${filePath}: ${error.message}`);
  }
};


export const generateDatatable = async (fullPath) => {
  const datatableDir = path.join(fullPath, 'src', 'components', 'DataTables');
  createFolder(datatableDir);

  const filePath = path.join(datatableDir, 'DataTable.jsx');

  const content = `import { useEffect, useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Pencil, Trash2, ChevronUp, ChevronDown, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "../Tooltips/Tooltip";

// (Contenido completo omitido por brevedad. Pegaste el código completo antes.)
// Puedes pegar aquí TODO el contenido tal como lo tienes en Python sin necesidad de escaparlo.

`.trimStart(); // Puedes reemplazar esta línea por el contenido completo del componente

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo generado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al generar el archivo ${filePath}: ${error.message}`);
  }
};


export const generatePreloaderButtonCss = async (fullPath) => {
  const preloaderDir = path.join(fullPath, 'src', 'components', 'Preloader');
  createFolder(preloaderDir);

  const filePath = path.join(preloaderDir, 'PreloaderButton.css');

  const content = `.preloader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`.trimStart();

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo generado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al generar el archivo ${filePath}: ${error.message}`);
  }
};


export const generateComboBox = async (fullPath) => {
  const comboDir = path.join(fullPath, 'src', 'components', 'ComboBoxes');
  createFolder(comboDir);

  const filePath = path.join(comboDir, 'ComboBox.jsx');

  const content = `"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { useState } from "react";

export default function CustomCombobox({
  label = "Select an option",
  options = [],
  selected,
  setSelected,
  onChange,
  error,
  getLabel = (item) => item?.name,
  disabled = false,
}) {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((item) =>
          getLabel(item).toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div>
      <label className="block text-gray-700">{label}</label>
      <Combobox
        autoComplete="off"
        value={selected}
        onChange={(value) => {
          setQuery("");
          setSelected(value);
          onChange?.(value);
        }}
        disabled={disabled}
      >
        <div className="relative">
          <ComboboxInput
            disabled={disabled}
            autoComplete="off"
            className={classNames(
              "block w-full rounded-md bg-white py-2.5 pr-12 pl-3 text-base text-gray-900 outline-1 placeholder:text-gray-400 sm:text-sm",
              {
                "border border-danger": error,
                "outline-gray-300 focus:outline-indigo-600": !error,
              },
              disabled && "disabled"
            )}
            onChange={(e) => !disabled && setQuery(e.target.value)}
            onBlur={() => setQuery("")}
            displayValue={(item) => getLabel(item)}
          />

          <ComboboxButton
            disabled={disabled}
            className={classNames(
              "absolute inset-y-0 right-0 flex items-center px-2",
              disabled && "disabled"
            )}
          >
            <ChevronUpDownIcon className="size-5 text-gray-400" />
          </ComboboxButton>

          {filteredOptions.length > 0 && (
            <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredOptions.map((item) => (
                <ComboboxOption
                  key={item.id}
                  value={item}
                  className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-focus:bg-indigo-600 data-focus:text-white"
                >
                  <span className="block truncate group-data-selected:font-semibold">
                    {getLabel(item)}
                  </span>
                  <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-focus:text-white group-data-selected:flex">
                    <CheckIcon className="size-5" aria-hidden="true" />
                  </span>
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
      {error && <p className="text-danger text-sm mt-1">{error}</p>}
    </div>
  );
}
`.trimStart();

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo generado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al generar el archivo ${filePath}: ${error.message}`);
  }
};

export const generateToggleButton = async (fullPath) => {
  const toggleDir = path.join(fullPath, 'src', 'components', 'Toggles');
  createFolder(toggleDir);

  const filePath = path.join(toggleDir, 'ToggleButton.jsx');

  const content = `'use client';

import { Switch } from '@headlessui/react';

export default function ToggleButton({
  label,
  enabled,
  setEnabled,
  error,
}) {
  return (
    <div>
      {label && (
        <label className="block text-gray-700 mb-1">{label}</label>
      )}
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={\`group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:outline-hidden \${enabled ? 'bg-indigo-600' : 'bg-gray-200'}\`}
      >
        <span className="sr-only">{label ?? 'Toggle setting'}</span>
        <span
          className={\`pointer-events-none relative inline-block size-5 transform rounded-full bg-white ring-0 shadow-sm transition duration-200 ease-in-out \${enabled ? 'translate-x-5' : 'translate-x-0'}\`}
        >
          {/* Iconos */}
          <span
            aria-hidden="true"
            className={\`absolute inset-0 flex size-full items-center justify-center transition-opacity duration-200 ease-in \${enabled ? 'opacity-0 duration-100 ease-out' : 'opacity-100'}\`}
          >
            <svg fill="none" viewBox="0 0 12 12" className="size-3 text-gray-400">
              <path
                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span
            aria-hidden="true"
            className={\`absolute inset-0 flex size-full items-center justify-center transition-opacity duration-200 ease-in \${enabled ? 'opacity-100' : 'opacity-0'}\`}
          >
            <svg fill="currentColor" viewBox="0 0 12 12" className="size-3 text-indigo-600">
              <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
            </svg>
          </span>
        </span>
      </Switch>
      {error && (
        <p className="text-danger text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
`.trimStart();

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo generado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al generar el archivo ${filePath}: ${error.message}`);
  }
};

export const generateBadge = async (fullPath) => {
  const badgeDir = path.join(fullPath, 'src', 'components', 'Badges');
  createFolder(badgeDir);

  const filePath = path.join(badgeDir, 'Badge.jsx');

  const content = `import classNames from "classnames";
import { getVariantBgClass } from "../../helpers/helperVariantClass";

export const Badge = ({ text, variant = "gray", className = "" }) => {
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
};

export const generateTooltip = async (fullPath) => {
  const tooltipDir = path.join(fullPath, 'src', 'components', 'Tooltips');
  createFolder(tooltipDir);

  const filePath = path.join(tooltipDir, 'Tooltip.jsx');

  const content = `import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const Tooltip = ({ children, text }) => {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const ref = useRef(null);

  useEffect(() => {
    if (show && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const tooltipHeight = 30; // altura aprox del tooltip
      const spaceAbove = rect.top;
      const top = spaceAbove < tooltipHeight
        ? rect.bottom + window.scrollY + 8
        : rect.top + window.scrollY - tooltipHeight - 8;

      setCoords({
        top,
        left: rect.left + rect.width / 2,
      });
    }
  }, [show]);

  return (
    <div
      ref={ref}
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show &&
        createPortal(
          <div
            style={{
              position: "absolute",
              top: \`\${coords.top}px\`,
              left: \`\${coords.left}px\`,
              transform: "translateX(-50%)",
              zIndex: 9999,
            }}
            className="bg-black text-white text-xs rounded px-2 py-1 shadow-lg whitespace-nowrap"
          >
            {text}
          </div>,
          document.body
        )}
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

export const generateInvoiceIcon = async (fullPath) => {
  const stylesPath = path.join(fullPath, 'src', 'components', 'Icons');
  createFolder(stylesPath);

  const filePath = path.join(stylesPath, 'InvoiceIcon.jsx');

  const content = `import classNames from "classnames";

export const ImageInvoiceIcon = ({ variant = "neutral", className = "w-6 h-6" }) => {
  return (
    <svg
      className={classNames(className, {
        "text-neutral": variant === "neutral",
        "text-danger": variant === "danger",
        "text-warning": variant === "warning",
        "text-success": variant === "success",
        "text-info": variant === "info",
        "text-primary": variant === "primary",
        "text-secondary": variant === "secondary",
      })}
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
};