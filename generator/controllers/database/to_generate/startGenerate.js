import mysql from "mysql2/promise";
import {
  convertSnakeCaseToPascalCase,
  convertSnakeCaseToPascalSingularCase,
} from "../../../helpers/helperString.js";


const callGenerate = async(pluralName, singularName, columns) => {
  //TODO llamada de Milena----------------------------------------------

  // fullPath
  const fullPath = "C:\\Users\\miled\\Desktop\\WorkSpaceNode\\PROYECTOS\\app1";
  console.log("fullPath", fullPath);


  // selectedComponents
  const selectedComponents = [
    { name: "Modelo", value: "model", checked: true },
    { name: "Controlador - List", value: "controller_list", checked: true },
    { name: "Controlador - Show", value: "controller_show", checked: true },
    { name: "Controlador - Store", value: "controller_store", checked: true },
    { name: "Controlador - Update", value: "controller_update", checked: true },
    {
      name: "Controlador - Destroy",
      value: "controller_destroy",
      checked: true,
    },
    { name: "Repositorio", value: "repository", checked: true },
    { name: "Rutas", value: "route", checked: true },
    { name: "Migración", value: "migration", checked: true },
    { name: "Seeder", value: "seeder", checked: true },
    { name: "Archivo Postman", value: "postman", checked: true },
  ];

  // singularName
  console.log("Desde callGenerate: ",singularName);
  // pluralName
  console.log("Desde callGenerate: ",pluralName);

  // columns --> crear objeto
  console.log("Desde callGenerate: ",columns);
  // namespace 'api'

  // llamada --> 
  // await generateModuleStandardNodeJS(fullPath, selectedComponents, 'api', singularName, pluralName, columns);
};



const getAllTables = async (connection, database) => {
  const [rows] = await connection.execute(
    `
    SELECT TABLE_NAME
    FROM INFORMATION_SCHEMA.TABLES
    WHERE TABLE_SCHEMA = ?
  `,
    [database]
  );

  return rows.map((row) => row.TABLE_NAME);
};



export const startGenerate = async ({
  host,
  user,
  password,
  database,
  port,
  tables,
}) => {
  

  try {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
      port,
    });

    console.log(`\n📦 Conectado a la base de datos: ${database}\n`);

    // Obtener todas las tablas si no se especificaron
    const tablesToList =
      tables.length > 0 ? tables : await getAllTables(connection, database);

    for (const tableName of tablesToList) {
      const tableNamePluralPascal = convertSnakeCaseToPascalCase(tableName); // ClientesEstandar

      const tableNameSingularPascal =
        convertSnakeCaseToPascalSingularCase(tableName); //ClienteEstandar

      //console.log(pascalCase, pluralPascalCase);
      console.log(
        `📄 Tabla: ${tableName} ${tableNameSingularPascal} ${tableNamePluralPascal} `
      );

      const [columns] = await connection.execute(
        `
                SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_KEY
                FROM INFORMATION_SCHEMA.COLUMNS
                WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
            `,
        [database, tableName]
      );

      // Filtra las columnas id, created_at...
      const filteredColumns = columns.filter((col) =>
        col.COLUMN_NAME !== "id" &&
        col.COLUMN_NAME !== "created_at" &&
        col.COLUMN_NAME !== "updated_at" &&
        col.COLUMN_NAME !== "deleted_at"
      );

      const filteredInfo = filteredColumns.map((col) => {
        const pk = col.COLUMN_KEY === "PRI" ? " [PK]" : "";
        const nullable = col.IS_NULLABLE === "YES" ? " (nullable)" : "";
        return `  - ${col.COLUMN_NAME} (${col.DATA_TYPE})${pk}${nullable}`;
      });

      filteredInfo.forEach(line => console.log(line));

      console.log("");

      //TODO llamada de Milena----------------------------------------------
      callGenerate( tableNamePluralPascal, tableNameSingularPascal, filteredColumns);


    }

    await connection.end();
  } catch (error) {
    console.error("❌ Error al listar tablas:", error.message);
  }
};




