// helpers/helperPHPRepository.js

/* =========================
   Normalizadores
========================= */
const normalizeColumns = (columns = []) =>
  [...new Set(columns)]
    .map((c) =>
      typeof c === "string"
        ? { name: String(c).split(":")[0].trim(), type: "" }
        : {
            name: String(c?.name || "").split(":")[0].trim(),
            type: String(c?.type || ""),
          }
    )
    .filter((c) => c.name);

/* =========================
   Filtros LIKE
========================= */
/**
 * Genera bloques PHP de filtros LIKE a partir de columns[]
 * @param {Array<{name:string,type?:string,allowNull?:boolean}>} columns
 * @returns {string}
 */
export const buildPhpLikeFilters = (columns = []) => {
  const names = normalizeColumns(columns).map((c) => c.name);

  return names
    .map((name) => {
      const label = name.replace(/_/g, " ");
      return (
`        // Filter by ${label}
        if (!empty($filters['${name}'])) {
            $${name} = trim($filters['${name}']);
            $q->where('${name}', 'LIKE', '%' . $${name} . '%');
        }`
      );
    })
    .join("\n\n");
};

/* =========================
   Update assignments
========================= */
/**
 * Genera los bloques de asignación para UPDATE.
 * - BOOLEAN => usa property_exists + asignación directa (permite false/null)
 * - default => respeta tu lógica con isset + no vacío
 *
 * @param {Array<{name:string,type?:string}>} columns
 * @param {{payloadVar?: string, modelVar?: string}} opts
 * @returns {string}
 */
export const buildUpdateAssignments = (
  columns = [],
  { payloadVar = "$payload", modelVar = "$model" } = {}
) => {
  const cols = normalizeColumns(columns);

  return cols
    .map(({ name, type }) => {
      const t = String(type || "").toUpperCase();

      if (t === "BOOLEAN") {
        return (
`        if (property_exists(${payloadVar}, '${name}')) {
            ${modelVar}->${name} = ${payloadVar}->${name};
        }`
        );
      }

      return (
`        if (isset(${payloadVar}->${name})) {
            if (${payloadVar}->${name} != '' && !empty(${payloadVar}->${name})) {
                ${modelVar}->${name} = ${payloadVar}->${name};
            }
        }`
      );
    })
    .join("\n\n");
};
