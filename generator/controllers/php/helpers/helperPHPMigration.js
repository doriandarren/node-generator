// helpers/helperPHPMigration.js

/* =========================
   Pluralización básica
========================= */
export const getPlural = (str = "") => {
  const s = String(str);
  if (s.endsWith("y")) return s.slice(0, -1) + "ies";
  if (s.endsWith("s")) return s + "es";
  return s + "s";
};

/* =========================
   Timestamp estilo Laravel
   2025_09_23_131045
========================= */
export const buildMigrationTimestamp = (d = new Date()) => {
  const pad = (n) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const HH = pad(d.getHours());
  const MM = pad(d.getMinutes());
  const SS = pad(d.getSeconds());
  return `${yyyy}_${mm}_${dd}_${HH}${MM}${SS}`;
};

/* =========================
   Normalizador de columnas
   Acepta: ["name", ...] o [{name,type,allowNull,...}, ...]
========================= */
export const normalizeColumns = (columns = []) =>
  columns
    .map((c) => {
      if (typeof c === "string") {
        return { name: c, type: "", allowNull: true };
      }
      return {
        name: String(c?.name || ""),
        type: String(c?.type || ""),                 // STRING | INT | DECIMAL | FK | ...
        allowNull:
          c?.allowNull === undefined ? true : Boolean(c.allowNull),
        length: c?.length ?? undefined,              // para STRING
        precision: c?.precision ?? 10,               // DECIMAL/FLOAT/DOUBLE
        scale: c?.scale ?? 2,                        // DECIMAL/FLOAT/DOUBLE
        unsigned: Boolean(c?.unsigned),              // numéricos
        default: c?.default,                         // valor por defecto (auto-render)
        defaultRaw: c?.defaultRaw,                   // ej: "DB::raw('CURRENT_TIMESTAMP')"
        unique: Boolean(c?.unique),
        index: Boolean(c?.index),
        // Foreign key overrides:
        referencesTable: c?.referencesTable,         // si no, se infiere
        onDelete: c?.onDelete ?? "cascade",
        onUpdate: c?.onUpdate,                       // opcional
      };
    })
    .filter((c) => c.name);

/* =========================
   Render helpers
========================= */
const indent = "                "; // 16 espacios como en tu plantilla

const renderDefault = (val) => {
  if (val === null) return "->default(null)";
  if (typeof val === "number") return `->default(${val})`;
  if (typeof val === "boolean") return `->default(${val ? 1 : 0})`;
  if (typeof val === "string") return `->default('${val.replace(/'/g, "\\'")}')`;
  return ""; // objetos/arrays no se mapean aquí
};

const renderCommonModifiers = (c) => {
  let out = "";

  // Siempre nullable
  out += "->nullable()";

  if (c.unsigned) out += "->unsigned()";
  if (c.allowNull) out += "->nullable()";
  if (c.defaultRaw) out += `->default(${c.defaultRaw})`;
  else if (c.default !== undefined) out += renderDefault(c.default);
  if (c.unique) out += "->unique()";
  if (c.index) out += "->index()";
  return out;
};

/* =========================
   Builder: línea de columna (no FK)
========================= */
const buildNonFkColumnLine = (c) => {
  const t = String(c.type || "").toUpperCase();
  const name = c.name;

  const numMods = renderCommonModifiers(c);

  // Tipos
  if (t === "STRING" || t === "" /* default */) {
    const len = c.length ? `, ${c.length}` : "";
    return `${indent}$table->string('${name}'${len})${numMods};`;
  }
  if (t === "TEXT") {
    return `${indent}$table->text('${name}')${numMods};`;
  }
  if (t === "BOOLEAN" || t === "BOOL") {
    // Si no permites null y no seteas default, Laravel exigirá valor; puedes añadir default 0 si quieres.
    return `${indent}$table->boolean('${name}')${numMods};`;
  }
  if (t === "INT" || t === "INTEGER") {
    return `${indent}$table->integer('${name}')${numMods};`;
  }
  if (t === "BIGINT" || t === "BIGINTEGER") {
    return `${indent}$table->bigInteger('${name}')${numMods};`;
  }
  if (t === "SMALLINT" || t === "SMALLINTEGER") {
    return `${indent}$table->smallInteger('${name}')${numMods};`;
  }
  if (t === "TINYINT" || t === "TINYINTEGER") {
    return `${indent}$table->tinyInteger('${name}')${numMods};`;
  }
  if (t === "DECIMAL" || t === "NUMERIC") {
    const p = Number(c.precision ?? 10);
    const s = Number(c.scale ?? 2);
    return `${indent}$table->decimal('${name}', ${p}, ${s})${numMods};`;
  }
  if (t === "FLOAT") {
    const p = Number(c.precision ?? 10);
    const s = Number(c.scale ?? 2);
    return `${indent}$table->decimal('${name}', ${p}, ${s})${numMods};`;
  }
  if (t === "DOUBLE") {
    const p = Number(c.precision ?? 10);
    const s = Number(c.scale ?? 2);
    return `${indent}$table->double('${name}', ${p}, ${s})${numMods};`;
  }
  if (t === "DATE") {
    return `${indent}$table->date('${name}')${numMods};`;
  }
  if (t === "DATETIME") {
    return `${indent}$table->dateTime('${name}')${numMods};`;
  }
  if (t === "TIMESTAMP") {
    return `${indent}$table->timestamp('${name}')${numMods};`;
  }
  if (t === "JSON") {
    return `${indent}$table->json('${name}')${numMods};`;
  }
  if (t === "UUID") {
    return `${indent}$table->uuid('${name}')${numMods};`;
  }
  if (t === "ENUM" && Array.isArray(c.values) && c.values.length) {
    const values = c.values.map((v) => `'${String(v).replace(/'/g, "\\'")}'`).join(", ");
    return `${indent}$table->enum('${name}', [${values}])${numMods};`;
  }

  // fallback
  return `${indent}$table->string('${name}')${numMods};`;
};

/* =========================
   Builder de columnas (UP/DOWN)
   - FK: unsignedBigInteger + foreign()->references()->on() (+ onDelete/onUpdate)
   - Tipos mapeados arriba
========================= */
export const buildMigrationColumnsAndDown = (
  pluralNameSnake,
  columns = [],
  { connection = "api" } = {}
) => {
  const cols = normalizeColumns(columns);

  let up = `${indent}$table->id();\n`;
  let downForeigns = "";

  for (const col of cols) {
    const isFk =
      /_id$/i.test(col.name) || String(col.type).toUpperCase() === "FK";

    if (isFk) {
      const refTable =
        col.referencesTable ||
        getPlural(col.name.replace(/_id$/i, "")); // ej: customer_id -> customers

      up += `${indent}$table->unsignedBigInteger('${col.name}');\n`;
      up += `${indent}$table->foreign('${col.name}')`
          + `->references('id')->on('${refTable}')`;

      if (col.onDelete) up += `->onDelete('${col.onDelete}')`;
      if (col.onUpdate) up += `->onUpdate('${col.onUpdate}')`;
      up += `;\n\n`;

      downForeigns += `        if (Schema::connection('${connection}')->hasColumn('${pluralNameSnake}', '${col.name}')) {\n`;
      downForeigns += `            Schema::connection('${connection}')->table('${pluralNameSnake}', function (Blueprint $table) {\n`;
      downForeigns += `                $table->dropForeign(['${col.name}']);\n`;
      downForeigns += `                $table->dropColumn('${col.name}');\n`;
      downForeigns += `            });\n`;
      downForeigns += `        }\n\n`;
      continue;
    }

    // No FK -> mapeo por tipo
    up += buildNonFkColumnLine(col) + "\n";
  }

  up += `\n${indent}$table->timestamps();\n${indent}$table->softDeletes();`;

  return { upColumnsBlock: up, downForeignsBlock: downForeigns };
};
