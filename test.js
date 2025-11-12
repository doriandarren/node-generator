import {
  addModuleExportAdapter,
  addModuleProviderAdapter,
} from "./generator/controllers/nestjs/to_create_project/generateHttp.js";

/**
 * Para Pruebas - Dev
 */
const Main = async () => {
  // /Users/dorian/NodejsProjects/app-1 --- Ruta Dorian

  const fullPath = `/Users/dorian/NodejsProjects/app-1`;

  // addModuleProviderAdapter(fullPath);
  // addModuleExportAdapter(fullPath);

  console.log("Pasa por main");
};

Main();
