// helpers/helperReactRelations.js

// ---------- helpers de nombres ----------
const baseFromField = (fieldName = "") => fieldName.replace(/_?id$/i, ""); // "customer_id" -> "customer"
const toPascal = (s = "") =>
  s.replace(/[-_\s]+/g, " ")
   .replace(/\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
   .replace(/\s+/g, "");
const toCamel = (s = "") => {
  const p = toPascal(s);
  return p ? p[0].toLowerCase() + p.slice(1) : "";
};
const pluralize = (s = "") => {
  if (!s) return "";
  if (/[sxz]$/i.test(s) || /(sh|ch)$/i.test(s)) return s + "es";
  if (/y$/i.test(s)) return s.replace(/y$/i, "ies");
  return s + "s";
};

// ---------- detector de FK ----------
const isFk = (c) => (c.type || "").toUpperCase() === "FK";
export const hasFk = (columns = []) => columns.some(isFk);


// ---------- builder de variables ----------
// Devuelve un string listo para inyectar tras isLoading (uno por cada FK)
export const buildVariables = (columns = []) => {
  const fks = columns.filter(isFk);
  if (!fks.length) return "";

  return fks
    .map(({ name }) => {
      const base = baseFromField(name);          // "customer"
      const pascal = toPascal(base);             // "Customer"
      const optionsVar = toCamel(pluralize(base)); // "customers"
      // Bloque final:
      return `
  // ${pascal}
  const [${optionsVar}, set${toPascal(optionsVar)}] = useState([]);
  const [selected${pascal}, setSelected${pascal}] = useState(null);
  const onChange${pascal} = () => {};`;
    })
    .join("\n");
};



// --- NUEVO: arma import de ComboBox + imports de servicios por cada FK ---
export const buildComboboxImport = (columns = []) => {
  const fks = columns.filter(isFk);
  if (!fks.length) return "";

  const lines = new Set();
  // Import del ComboBox (una sola vez)
  lines.add(`import CustomCombobox from "../../../components/ComboBoxes/ComboBox";`);

  // Un import de servicio por cada FK
  fks.forEach(({ name }) => {
    const base = baseFromField(name);        // "customer"
    const plural = pluralize(base);          // "customers"
    const getter = `get${toPascal(plural)}`; // "getCustomers"
    // Ruta: ../../customers/services/customerService
    const servicePath = `../../${plural}/services/${base}Service`;
    lines.add(`import { ${getter} } from "${servicePath}";`);
  });

  // Devuelve con salto de línea al inicio para pegar junto a otros imports
  return `\n${Array.from(lines).join("\n")}`;
};


// --- NUEVO: useEffect de carga para todas las FKs detectadas ---
export const buildComboboxUseEffect = (columns = []) => {
  const fks = columns.filter(isFk);
  if (!fks.length) return "";

  // Nombres por cada FK
  const items = fks.map(({ name }) => {
    const base = baseFromField(name);                 // "customer"
    const plural = pluralize(base);                   // "customers"
    const getter = `get${toPascal(plural)}`;          // "getCustomers"
    const optionsVar = toCamel(plural);               // "customers"
    const setOptions = `set${toPascal(optionsVar)}`;  // "setCustomers"
    const pascal = toPascal(base);                    // "Customer"
    return { name, base, plural, getter, optionsVar, setOptions, pascal };
  });

  // Destructuring de respuestas: [customersRes, suppliersRes, ...]
  const resNames = items.map(it => `${it.optionsVar}Res`).join(", ");
  const promiseCalls = items.map(it => `${it.getter}()` ).join(", ");

  // Cuerpo por cada FK: if (xxxRes.success) { setXxx(xxxRes.data) } else { Swal... }
  const perFkAssign = items.map(it => `
      if (${it.optionsVar}Res?.success) {
        ${it.setOptions}(${it.optionsVar}Res.data);
        
        // TODO default:
        // setSelected${it.pascal}(${it.optionsVar}Res.data?.[0] ?? null);
        // setValue("${it.name}", ${it.optionsVar}Res.data?.[0]?.id, { shouldValidate: true });
      } else {
        Swal.fire({
          title: t("error"),
          icon: "error",
          confirmButtonText: t("message.ok"),
          confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_ERROR,
        });
      }`).join("\n");

  return `
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [${resNames}] = await Promise.all([${promiseCalls}]);

${perFkAssign}
      } catch (error) {
       console.error("Error al enviar los datos:", error);
        Swal.fire({
          title: t("errors.error_process"),
          icon: "error",
          confirmButtonText: t("message.ok"),
          confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_ERROR,
        });
      }
    };

    fetchData();
  }, [t]);`;
};