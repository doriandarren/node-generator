import fs from "fs";
import path from "path";
import { createFolder, runExec } from "../../../helpers/helperFile.js";
import { printMessage } from "../../../helpers/inquirer.js";
import {
  addHeaderLine,
  addModuleProvider,
  addModuleExport,
} from "../helpers/helperNestAppModule.js";

export const generateHttp = async (fullPath) => {
  await installAxios(fullPath);

  await createAdapters(fullPath);
  await createInterfaces(fullPath);

  await addHeader(fullPath);
  await addModuleProviderAdapter(fullPath);
  await addModuleExportAdapter(fullPath);
};

const installAxios = async (fullPath) => {
  printMessage("Intalando Axios...", "cyan");
  await runExec("npm install axios", fullPath);
  printMessage("Axios instalado correctamente.", "green");
};

const createAdapters = async (fullPath) => {
  // Folder
  const folderPath = path.join(fullPath, "src", "common", "adapters");

  // File
  const filePath = path.join(folderPath, "axios.adapter.ts");

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  // Code
  const code = `import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import { Injectable } from "@nestjs/common";


@Injectable()
export class AxiosAdapter implements HttpAdapter {

    private axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        try {
            
            const {data} = await this.axios.get<T>(url);
            return data;

        } catch (error) {
            
            throw new Error('This is an error - Check logs');
            
        }
    }

}   
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }
};

const createInterfaces = async (fullPath) => {
  // Folder
  const folderPath = path.join(fullPath, "src", "common", "interfaces");

  // File
  const filePath = path.join(folderPath, "http-adapter.interface.ts");

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  // Code
  const code = `export interface HttpAdapter {
    get<T>(url: string): Promise<T>;
}
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }
};

const addHeader = async (fullPath) => {
  const filePath = path.join(fullPath, "src", "common", "common.module.ts");
  addHeaderLine(
    filePath,
    `import { AxiosAdapter } from './adapters/axios.adapter';`
  );
};

const addModuleProviderAdapter = async (fullPath) => {
  const filePath = path.join(fullPath, "src", "common", "common.module.ts");
  addModuleProvider(filePath, `AxiosAdapter`);
};

const addModuleExportAdapter = async (fullPath) => {
  const filePath = path.join(fullPath, "src", "common", "common.module.ts");

  addModuleExport(filePath, `AxiosAdapter`);
};
