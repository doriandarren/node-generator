
// --- Helpers globales (fuera de generateList) ---

// snake.case / dot.notation -> PascalCase (para nombres de estado: qCustomerCompanyName)
export const toVarSuffix = (str) =>
  str
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/(^|_)(\w)/g, (_, __, c) => c.toUpperCase());

// Limpia sufijo _id para etiquetas i18n
export const cleanName = (name) => name.replace(/_id$/, "");

// Heurística: columnas con "customer" un poco más anchas
export const spanFor = (name) => (name.includes('customer') ? 4 : 3);

// Genera el bloque de <div> con inputs por cada columna
export const buildFilterBlocks = (columnNames) => {
  const uniqueCols = [...new Set(columnNames)];
  return uniqueCols.map((name) => {
    const pascal = toVarSuffix(name);
    const span = spanFor(name);
    const phKey = `search_by_${cleanName(name)}`;
    return `
          <div className="md:col-span-${span}">
            <label className="block text-sm font-medium mb-1">{t("${cleanName(name)}")}</label>
            <input
              type="text"
              value={q${pascal}}
              onChange={(e) => setQ${pascal}(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder={t("${phKey}")}
            />
          </div>`.trim();
  }).join('\n');
};

// Función que construye la función JSX `renderFilters` (como string para el template)
export const buildRenderFiltersFn = (columnNames) => {
  const blocks = buildFilterBlocks(columnNames);
  return `
      <div className="border border-gray-100 shadow-sm rounded-xl px-4 py-4 mb-5">
        <div className="mb-4 grid grid-cols-1 md:grid-cols-12 gap-3">
${blocks}
          <div className="md:col-span-2 flex items-end">
            <ThemedButton variant="warning" type="button" onClick={resetFilters} className="w-full">
              {t("clear_filters")}
            </ThemedButton>
          </div>
        </div>
      </div>
    `;
};

// Estados de filtros (qX / setQX) para TODAS las columnas
export const buildFiltersState = (columnNames) => {
  const uniqueCols = [...new Set(columnNames)];
  return uniqueCols
    .map(name => `const [q${toVarSuffix(name)}, setQ${toVarSuffix(name)}] = useState("");`)
    .join('\n  ');
};

// Cuerpo del reset (setters a "")
export const buildResetFiltersBody = (columnNames) => {
  const uniqueCols = [...new Set(columnNames)];
  return uniqueCols
    .map(name => `    setQ${toVarSuffix(name)}("");`)
    .join('\n');
};

// Objeto para el service: { col: qCol, ... }
export const buildFiltersObject = (columnNames, indent = '          ') => {
  const uniqueCols = [...new Set(columnNames)];
  return uniqueCols
    .map(name => `${indent}${name}: q${toVarSuffix(name)},`)
    .join('\n');
};

// Dependencias del useEffect
export const buildEffectDeps = (columnNames) => {
  const uniqueCols = [...new Set(columnNames)];
  return uniqueCols
    .map(name => `q${toVarSuffix(name)}`)
    .join(', ');
};