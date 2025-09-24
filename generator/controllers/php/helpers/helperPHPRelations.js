// helpers/helperPHPRelations.js

// "customer_status_id" -> "customer_status"
const baseFromField = (fieldName = "") => String(fieldName).replace(/_?id$/i, "");

// "customer_status" -> "CustomerStatus"
const toPascal = (s = "") =>
  String(s)
    .trim()
    .replace(/[-_\s]+/g, " ")
    .replace(/\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .replace(/\s+/g, "");

// "customer_status" -> "customerStatus"
const toCamel = (s = "") => {
  const p = toPascal(s);
  return p ? p[0].toLowerCase() + p.slice(1) : "";
};

const isFk = (c) => String(c?.type || "").toUpperCase() === "FK";

/**
 * Genera métodos belongsTo (bloque PHP listo para pegar en el modelo).
 * @param {Array<{name:string,type:string}>} columns
 * @returns {Promise<string>}
 */
export const buildPHPRelations = async (columns = []) => {
  const fks = (columns || []).filter(isFk);
  if (!fks.length) return "";

  return fks
    .map(({ name }) => {
      const base = baseFromField(name);     // "customer_status"
      const method = toCamel(base);         // "customerStatus"
      const related = toPascal(base);       // "CustomerStatus"
      return `
    /**
     * @return BelongsTo
     */
    public function ${method}(): BelongsTo
    {
        return $this->belongsTo(${related}::class, '${name}', 'id');
    }`.trim();
    })
    .join("\n\n");
};
