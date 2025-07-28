import fs from 'fs';
import path from 'path';
import { printMessage } from '../../../helpers/inquirer.js';
import { createFolder, runExec } from '../../../helpers/helperFile.js';

export const generateRedux = async (fullPath) => {
  await reduxInstall(fullPath);
  await createFileStoreJs(fullPath);
  await createBarrelFileStoreJs(fullPath);
};

const reduxInstall = async (fullPath) => {
  printMessage('🔧 Instalando Redux Toolkit y React Redux...', 'cyan');
  await runExec('npm install @reduxjs/toolkit react-redux', fullPath);
  printMessage('✅ Redux instalado correctamente.', 'green');
};

const createFileStoreJs = async (fullPath) => {
  const storeDir = path.join(fullPath, 'src', 'store');
  const filePath = path.join(storeDir, 'store.js');

  const content = `import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
`;

  createFolder(storeDir);

  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    printMessage(`✅ Archivo creado: ${filePath}`, 'green');
  } catch (error) {
    printMessage(`❌ Error al crear el archivo ${filePath}: ${error.message}`, 'red');
  }
};

const createBarrelFileStoreJs = async (fullPath) => {
  const storeDir = path.join(fullPath, 'src', 'store');
  const filePath = path.join(storeDir, 'index.js');

  const content = `export * from './store';`;

  createFolder(storeDir);

  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    printMessage(`✅ Archivo creado: ${filePath}`, 'green');
  } catch (error) {
    printMessage(`❌ Error al crear el archivo ${filePath}: ${error.message}`, 'red');
  }
};
