// ./helpers/helperNestEntity.js


/**
 * Convierte un array de columnas en código TypeORM
 * para una entidad NestJS.
 *
 * @param {Array} columns - Lista de columnas con formato:
 *   { name: string, type: string, allowNull?: boolean, unique?: boolean, primaryKey?: boolean }
 * @returns {string} - Código de las columnas formateado
 */
export function buildEntityColumns(columns = []) {
  return columns
    .map((col) => {
      const { name, type, allowNull, unique, primaryKey } = col;

      // Si el campo es 'id', lo omitimos (ya lo maneja @PrimaryGeneratedColumn)
      if (name.toLowerCase() === "id") return "";

      // Determinar tipo TypeORM y TypeScript
      const columnType = mapTypeORMType(type);
      const tsType = mapTypeScriptType(type);

      // Opciones del decorador
      const options = [];
      if (columnType) options.push(`type: '${columnType}'`);
      if (allowNull === true) options.push("nullable: true");
      else options.push("nullable: false");
      if (unique) options.push("unique: true");

      const optionsString = options.length ? `{ ${options.join(", ")} }` : "";

      // Decorador principal
      const decorator =
        primaryKey === true
          ? "@PrimaryColumn()"
          : `@Column(${optionsString})`;

      return `
  ${decorator}
  ${name}: ${tsType};
      `.trimEnd();
    })
    .join("\n\n");
}

/**
 * Mapea tipos genéricos a tipos de columna TypeORM
 */
function mapTypeORMType(type) {
  switch (type?.toUpperCase()) {
    case "STRING":
    case "CHAR":
    case "VARCHAR":
    case "TEXT":
      return "varchar";
    case "INT":
    case "INTEGER":
    case "BIGINT":
    case "FLOAT":
    case "DOUBLE":
    case "DECIMAL":
      return "int";
    case "BOOLEAN":
      return "boolean";
    case "DATE":
    case "DATETIME":
    case "TIMESTAMP":
      return "timestamp";
    default:
      return "varchar";
  }
}

/**
 * Mapea tipos genéricos a tipos de TypeScript
 */
function mapTypeScriptType(type) {
  switch (type?.toUpperCase()) {
    case "STRING":
    case "CHAR":
    case "VARCHAR":
    case "TEXT":
      return "string";
    case "INT":
    case "INTEGER":
    case "BIGINT":
    case "FLOAT":
    case "DOUBLE":
    case "DECIMAL":
      return "number";
    case "BOOLEAN":
      return "boolean";
    case "DATE":
    case "DATETIME":
    case "TIMESTAMP":
      return "Date";
    default:
      return "any";
  }
}
