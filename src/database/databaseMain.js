import { clearScreen, menuMain, pause } from "../helpers/inquirer.js";
import { startGenerate } from "./to_generate/startGenerate.js";
import { listTables } from "./to_list/listTables.js";

export const databaseMain = async () => {

  clearScreen();
  console.log("DATABASE");

  // Elegir acción
  const generatorType = await menuMain([
    { name: "[1] Listar", value: "listar" },
    { name: "[2] Generar", value: "generar" },
  ]);

  // Elegir base de datos
  const dbType = await menuMain([
    { name: "[1] Local (3306)", value: "local" },
    { name: "[2] Docker (3307)", value: "docker1" },
    { name: "[3] Docker (3308)", value: "docker2" },
  ]);

  // Leer nombre base de datos (con valor por defecto)
  const dbName = await readInput(
    "Nombre de la base de datos [portuarios_api]:",
    true,
    "portuarios_api"
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
    local: process.env.DATABASE_LOCAL_PASSWORD || "",
    docker1: process.env.DATABASE_DOCKER_PASSWORD || "",
    docker2: process.env.DATABASE_DOCKER_PASSWORD || "",
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
    await listTablesAndColumns(config);
  }

  if (generatorType === "generar") {
    await generateTablesAndColumns(config);
  }

  console.log("\n✅ Operación finalizada.\n".green);

  // do{

  //     opt = await menuMain(['Listar', 'Generar', 'Salir']);

  //     switch (opt) {
  //         case 'Listar':
  //             await listTables();
  //             break;

  //         case 'Generar':
  //             await startGenerate();
  //             break;

  //         default:
  //             break;
  //     }

  //     //TODO: Comentar luego para no hacer doble el entrer atras
  //     await pause();

  // }while(opt != 'Salir')
};
