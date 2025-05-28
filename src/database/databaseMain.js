import { clearScreen, menuMain, pause, readInput } from "../helpers/inquirer.js";
import { startGenerate } from "./to_generate/startGenerate.js";
import { startGenerateDiagrams } from "./to_generate/startGenerateDiagrams.js";
import { listTables } from "./to_list/listTables.js";

export const databaseMain = async () => {

  clearScreen();

  // Elegir acción
  const generatorType = await menuMain([
    { name: "[1] Listar", value: "listar" },
    { name: "[2] Generar", value: "generar" },
    { name: "[3] Generar Diagrams", value: "diagrams" },
    { name: "[4] Atrás", value: "back" },
  ], 'DATABASE');


  if (generatorType === "back") {
    return;
  }


  // Elegir base de datos
  const dbType = await menuMain([
    { name: "[1] Local (3306)", value: "local" },
    { name: "[2] Docker (3307)", value: "docker1" },
    { name: "[3] Docker (3308)", value: "docker2" },
  ], 'DATABASE');

  // Leer nombre base de datos (con valor por defecto)
  const dbName = await readInput(
    "Nombre de la base de datos [splytin_api]:",
    true,
    "splytin_api"
  );

  // Leer nombres de tablas separados por espacio
  const inputTables = await readInput(
    "Nombre(s) de tabla(s) [separado por espacio / vacío para todas]:",
    true
  );
  
  const tables =
    inputTables.trim() !== "" ? inputTables.trim().split(/\s+/) : [];

  // Configuración de entorno
  const passwordMap = {
    local: process.env.DB_PASSWORD_LOCAL || "",
    docker1: process.env.DB_PASSWORD_DOCKER1 || "",
    docker2: process.env.DB_PASSWORD_DOCKER2 || "",
  };

  const portMap = {
    local: 3306,
    docker1: 3307,
    docker2: 3308,
  };

  const config = {
    host: "127.0.0.1",
    user: "root",
    password: passwordMap[dbType],
    database: dbName,
    port: portMap[dbType],
    tables,
  };

  // Ejecutar acción
  if (generatorType === "listar") {
    await listTables(config);
  }

  if (generatorType === "generar") {
    await startGenerate(config);
  }

  if (generatorType === "diagrams") {
    await startGenerateDiagrams(config);
  }

  console.log("\n✅ Operación finalizada.\n".green);

};
