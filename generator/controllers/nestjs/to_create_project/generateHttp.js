import fs from "fs";
import path from "path";
import { createFolder, runExec } from "../../../helpers/helperFile.js";
import { printMessage } from "../../../helpers/inquirer.js";
import {
  addHeaderLine,
  addModuleProvider,
  addModuleExport,
} from "../helpers/helperFileWrite.js";

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
  const code = `import { Injectable, HttpException } from "@nestjs/common";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";


@Injectable()
export class AxiosAdapter implements HttpAdapter {

    
    private readonly axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            //timeout: 60000, // 60 segundos de espera máximo
        });
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const { data } = await this.axios.get<T>(url, config);
            return data;
        } catch (error: any) {
            const status = error?.response?.status ?? 500;
            const message = error?.response?.data ?? error?.message ?? 'GET failed';
            console.error('❌ GET error:', { url, status, message });
            throw new HttpException(message, status);
        }
    }

    async post<T>(url: string, body?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const { data } = await this.axios.post<T>(url, body, config);
            return data;
        } catch (error: any) {
            const status = error?.response?.status ?? 500;
            const message = error?.response?.data ?? error?.message ?? 'POST failed';
            console.error('❌ POST error:', { url, status, message });
            throw new HttpException(message, status);
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
  get<T>(url: string, config?: any): Promise<T>;
  post<T>(url: string, body?: any, config?: any): Promise<T>;
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
