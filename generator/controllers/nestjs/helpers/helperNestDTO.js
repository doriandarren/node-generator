/**
 * Construye los campos de un DTO (Create*) a partir de columns.
 * columns: [{ name: 'name', type: 'STRING', allowNull: false }, ...]
 *
 * Devuelve:
 *  - imports: string con el import de class-validator según lo usado
 *  - fields: string con las propiedades decoradas para el DTO
 */
export function buildDtoFromColumns(columns = []) {
  const used = new Set();
  const lines = [];

  for (const c of columns) {
    if (!c?.name) continue;
    const name = c.name.trim();
    if (!name || name.toLowerCase() === "id") continue;

    const upperType = (c.type || "STRING").toUpperCase();
    const allowNull = !!c.allowNull;

    const { tsType, decorators } = mapValidatorsAndTsType(
      upperType,
      allowNull,
      used
    );

    const block = `
  ${decorators.join("\n  ")}
  ${name}: ${tsType};`.trimEnd();

    lines.push(block);
  }

  const imports = `import { ${Array.from(used)
    .sort()
    .join(", ")} } from 'class-validator';`;
  const fields = lines.join("\n");
  return { imports, fields };
}

/**
 * Mapea el tipo a decoradores y tipo TS.
 * Marca en "used" los decoradores a importar.
 */
function mapValidatorsAndTsType(type, allowNull, usedSet) {
  let tsType = "any";
  const decorators = [];

  // Comunes por nullability
  if (allowNull) {
    decorators.push("@IsOptional()");
    usedSet.add("IsOptional");
  } else {
    // Solo aplicamos IsNotEmpty a string/number/boolean/date/uuid apropiados
    usedSet.add("IsNotEmpty");
  }

  switch (type) {
    case "STRING":
    case "CHAR":
    case "VARCHAR":
    case "TEXT":
      tsType = "string";
      usedSet.add("IsString");
      decorators.push("@IsString()");
      if (!allowNull) decorators.push("@IsNotEmpty()");
      break;

    case "UUID":
      tsType = "string";
      usedSet.add("IsUUID");
      decorators.push("@IsUUID()");
      if (!allowNull) decorators.push("@IsNotEmpty()");
      break;

    case "INT":
    case "INTEGER":
    case "BIGINT":
      tsType = "number";
      usedSet.add("IsInt");
      decorators.push("@IsInt()");
      if (!allowNull) decorators.push("@IsNotEmpty()");
      break;

    case "FLOAT":
    case "DOUBLE":
    case "DECIMAL":
      tsType = "number";
      usedSet.add("IsNumber");
      decorators.push(
        `@IsNumber({ allowNaN: false, allowInfinity: false }, { message: '${type.toLowerCase()} inválido' })`
      );
      if (!allowNull) decorators.push("@IsNotEmpty()");
      break;

    case "BOOLEAN":
      tsType = "boolean";
      usedSet.add("IsBoolean");
      decorators.push("@IsBoolean()");
      if (!allowNull) decorators.push("@IsNotEmpty()");
      break;

    case "DATE":
    case "DATETIME":
    case "TIMESTAMP":
      tsType = "string"; // en DTO suele recibirse como ISO string
      usedSet.add("IsDateString");
      decorators.push("@IsDateString()");
      if (!allowNull) decorators.push("@IsNotEmpty()");
      break;

    default:
      tsType = "string";
      usedSet.add("IsString");
      decorators.push("@IsString()");
      if (!allowNull) decorators.push("@IsNotEmpty()");
      break;
  }

  return { tsType, decorators };
}
