import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';


export const generateRedux = async(fullPath) => {    
    reduxInstall(fullPath)
    createFileStorejs(fullPath)
    createBarrelFileStorejs(fullPath)
}


export const reduxInstall = (fullPath) => {
  console.log("🔧 Instalando redux...");

  exec("npm install @reduxjs/toolkit react-redux", { cwd: fullPath }, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error al instalar Redux: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`⚠️ Advertencia: ${stderr}`);
    }
    console.log("✅ Redux instalado correctamente");
    console.log(stdout);
  });
};


export const createFileStoreJs = (fullPath) => {
  const storeDir = path.join(fullPath, "src", "store");
  const filePath = path.join(storeDir, "store.js");

  const content = `import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
`;

  // Crear la carpeta si no existe
  if (!fs.existsSync(storeDir)) {
    fs.mkdirSync(storeDir, { recursive: true });
  }

  // Crear y escribir el archivo
  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo creado: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error al crear el archivo ${filePath}: ${error.message}`);
  }
};


export const createBarrelFileStoreJs = (fullPath) => {
  const storeDir = path.join(fullPath, "src", "store");
  const filePath = path.join(storeDir, "index.js");

  const content = `export * from './store';`;

  // Crear la carpeta si no existe
  if (!fs.existsSync(storeDir)) {
    fs.mkdirSync(storeDir, { recursive: true });
  }

  // Crear y escribir el archivo
  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo creado: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error al crear el archivo ${filePath}: ${error.message}`);
  }
};