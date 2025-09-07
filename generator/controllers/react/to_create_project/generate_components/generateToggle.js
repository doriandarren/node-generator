import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../helpers/helperFile.js';



export const generateToggle = async (fullPath) => {
  const toggleDir = path.join(fullPath, 'src', 'components', 'Toggles');
  createFolder(toggleDir);

  const filePath = path.join(toggleDir, 'ThemedToggle.jsx');

  const content = `'use client'

import { Switch } from '@headlessui/react'

export const ThemedToggle = ({
  label,
  enabled,
  setEnabled,
  error,
}) => {
  return (
    <div>
      {label && (
        <label className="block text-gray-700 mb-1">{label}</label>
      )}
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={\`group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:outline-hidden \${
          enabled ? 'bg-indigo-600' : 'bg-gray-200'
        }\`}
      >
        <span className="sr-only">{label ?? 'Toggle setting'}</span>
        <span
          className={\`pointer-events-none relative inline-block size-5 transform rounded-full bg-white ring-0 shadow-sm transition duration-200 ease-in-out \${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }\`}
        >
          {/* Iconos */}
          <span
            aria-hidden="true"
            className={\`absolute inset-0 flex size-full items-center justify-center transition-opacity duration-200 ease-in \${
              enabled ? 'opacity-0 duration-100 ease-out' : 'opacity-100'
            }\`}
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
            className={\`absolute inset-0 flex size-full items-center justify-center transition-opacity duration-200 ease-in \${
              enabled ? 'opacity-100' : 'opacity-0'
            }\`}
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
  )
}
`.trimStart();

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo generado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al generar el archivo ${filePath}: ${error.message}`);
  }
}