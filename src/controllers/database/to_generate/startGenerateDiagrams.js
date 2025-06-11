import mysql from "mysql2/promise";
import { createDiagrams } from "../../export_diagrams/createDiagrams.js";
import path from "path";



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



export const startGenerateDiagrams = async ({
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
    const tablesToList = tables.length > 0 ? tables : await getAllTables(connection, database);


    let myTables = [];



    for (const tableName of tablesToList) {
      
      //console.log(`📄 Tabla: ${tableName}`);

      const [columns] = await connection.execute(
        `
                SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_KEY
                FROM INFORMATION_SCHEMA.COLUMNS
                WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
            `,
        [database, tableName]
      );


      const filteredColumns = columns.filter((col) =>
        col.COLUMN_NAME !== "id" &&
        col.COLUMN_NAME !== "created_at" &&
        col.COLUMN_NAME !== "updated_at" &&
        col.COLUMN_NAME !== "deleted_at"
      );

      
      const filteredInfo = filteredColumns.map((col) => {
        // const pk = col.COLUMN_KEY === "PRI" ? " [PK]" : "";
        // const nullable = col.IS_NULLABLE === "YES" ? " (nullable)" : "";
        // return `  - ${col.COLUMN_NAME} (${col.DATA_TYPE})${pk}${nullable}`;
        return `${col.COLUMN_NAME}`;
      });

      //filteredInfo.forEach(line => console.log(line));


      myTables.push({
        table: tableName,
        columns: filteredInfo
      });
      
    }


    const fullPath = path.join(process.cwd(), 'src', 'assets', 'diagrams');
    await createDiagrams(myTables, fullPath, database);

    await connection.end();

  } catch (error) {
    console.error("❌ Error al listar tablas:", error.message);
  }
};
