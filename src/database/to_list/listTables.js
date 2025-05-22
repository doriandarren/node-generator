import mysql from "mysql2/promise";
import {
  convertSnakeCaseToPascalCase,
  convertSnakeCaseToPascalSingularCase,
} from "../../helpers/helperString.js";
import { printMessage } from "../../helpers/inquirer.js";

export const listTables = async ({
  host,
  user,
  password,
  database,
  port,
  tables,
}) => {
  console.log("Lista DATABASE", {
    host,
    user,
    password,
    database,
    port,
    tables,
  });

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

      printMessage(
        `📄 Tabla: ${tableName} ${tableNameSingularPascal} ${tableNamePluralPascal}`,
        "yellow"
      );

      const [columns] = await connection.execute(
        `
                SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_KEY
                FROM INFORMATION_SCHEMA.COLUMNS
                WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
            `,
        [database, tableName]
      );

      columns.forEach((col) => {
        if (
          col.COLUMN_NAME !== "id" &&
          col.COLUMN_NAME !== "created_at" &&
          col.COLUMN_NAME !== "updated_at" &&
          col.COLUMN_NAME !== "deleted_at"
        ) {
          const pk = col.COLUMN_KEY === "PRI" ? " [PK]" : "";
          const nullable = col.IS_NULLABLE === "YES" ? " (nullable)" : "";
          console.log(
            `  - ${col.COLUMN_NAME} (${col.DATA_TYPE})${pk}${nullable}`
          );
        }
      });

      console.log("");
    }

    await connection.end();
  } catch (error) {
    console.error("❌ Error al listar tablas:", error.message);
  }
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
