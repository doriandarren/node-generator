// helpers/helperReactFormGenerator.js

const baseFromField = (fieldName) => (fieldName || "").replace(/_?id$/i, "");

const toPascal = (s) =>
  s.replace(/[-_\s]+/g, " ")
   .replace(/\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase())
   .replace(/\s+/g, "");

const toCamel = (s) => { const p = toPascal(s); return p ? p[0].toLowerCase() + p.slice(1) : ""; };

const pluralize = (s) => {
  if (!s) return "";
  if (/[sxz]$/i.test(s) || /(sh|ch)$/i.test(s)) return s + "es";
  if (/y$/i.test(s)) return s.replace(/y$/i, "ies");
  return s + "s";
};



// Devuelve el encadenado de Yup como string (p.ej. "yup.number().integer().required(...)")
export const toYupSchemaFor = (type, required) => {
  const T = (type || "STRING").toUpperCase();

  let base =
    T === "BOOLEAN" ? 'yup.number().oneOf([0,1])' :
    (T === "INTEGER" || T === "INT" || T === "BIGINT") ? 'yup.number().typeError(t("form.number")).integer()' :
    (T === "FLOAT" || T === "DOUBLE" || T === "DECIMAL" || T === "NUMERIC") ? 'yup.number().typeError(t("form.number"))' :
    T === "DATE" ? 'yup.string().required(t("form.required"))' :
    (T === "DATETIME" || T === "TIMESTAMP") ? 'yup.string().required(t("form.required"))' :
    T === "EMAIL" ? 'yup.string().email(t("form.email"))' :
    T === "UUID" ? 'yup.string()' :
    T === "JSON" ? 'yup.mixed()' :
    T === "FK" ? 'yup.mixed()' :
    'yup.string()';

    
    base += required ? '.required(t("form.required"))' : '.nullable()';

  return base;
};

// Devuelve el bloque JSX como string para un campo concreto
export const inputFor = (col) => {
  const name = col.name;
  const T = (col.type || "STRING").toUpperCase();
  //const label = `<label className="block text-gray-700">{t("${name}")}</label>`;
  const errorMsg = `{errors.${name} && <p className="text-danger text-sm">{errors.${name}?.message}</p>}`;
  
  const requiredStar = col.allowNull === false ? ' + " *"' : '';



  // ====== NUEVO: caso FK con tu CustomCombobox ======
  if (T === "FK") {
    const base = baseFromField(name);         // "customer_id" -> "customer"
    const pascal = toPascal(base);            // "Customer"
    const optionsVar = toCamel(pluralize(base));       // "customers"
    const selectedVar = `selected${pascal}`;           // "selectedCustomer"
    const setSelectedVar = `setSelected${pascal}`;     // "setSelectedCustomer"
    const onChangeVar = `onChange${pascal}`;           // "onChangeCustomer"

    return `
            {/* ${name} */}
            <div className="col-span-12 md:col-span-6 lg:col-span-6">
              <CustomCombobox
                label={t("${base}")${requiredStar}}
                options={${optionsVar}}
                selected={${selectedVar}}
                setSelected={(item) => {
                  ${setSelectedVar}(item);
                  setValue("${name}", item?.id, { shouldValidate: true });
                }}
                error={errors.${name}?.message}
                getLabel={(item) =>
                  \`\${item?.name ?? ""}\`.trim()
                }
                onChange={(value) => ${onChangeVar}(value)}
              />
            </div>`;
  }
  // ====== FIN caso FK ======



  // === NUEVO: BOOLEAN con ToggleButton (1/0) ===
  if (T === "BOOLEAN") {
    return `
            {/* ${name} */}
            <div className="col-span-12 md:col-span-3 lg:col-span-3">
              <ToggleButton
                <label className="block text-gray-700">{t("${name}")${requiredStar}}</label>
                enabled={watch("${name}") === 1}
                setEnabled={(value) =>
                  setValue("${name}", value ? 1 : 0, { shouldValidate: true })
                }
                error={errors.${name}?.message}
              />
              <input type="hidden" {...register("${name}")} />
            </div>`;
  }


  if (T === "TEXT" || T === "JSON") {
    return `
            {/* ${name} */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <label className="block text-gray-700">{t("${name}")${requiredStar}}</label>
              <textarea
                rows={4}
                {...register("${name}")}
                className={\`w-full p-2 border \${errors["${name}"] ? "border-danger" : "border-gray-300"} rounded-md\`}
              />
              ${errorMsg}
            </div>`;
  }

  if (T === "INTEGER" || T === "INT" || T === "BIGINT") {
    return `
            {/* ${name} */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <label className="block text-gray-700">{t("${name}")${requiredStar}}</label>
              <input
                type="number"
                step="1"
                {...register("${name}", { valueAsNumber: true })}
                className={\`w-full p-2 border \${errors["${name}"] ? "border-danger" : "border-gray-300"} rounded-md\`}
              />
              ${errorMsg}
            </div>`;
  }

  if (T === "FLOAT" || T === "DOUBLE" || T === "DECIMAL" || T === "NUMERIC") {
    return `
            {/* ${name} */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <label className="block text-gray-700">{t("${name}")${requiredStar}}</label>
              <input
                type="number"
                step="any"
                {...register("${name}", { valueAsNumber: true })}
                className={\`w-full p-2 border \${errors["${name}"] ? "border-danger" : "border-gray-300"} rounded-md\`}
              />
              ${errorMsg}
            </div>`;
  }

  if (T === "DATE") {
    return `
            {/* ${name} */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <label className="block text-gray-700">{t("${name}")${requiredStar}}</label>
              <input
                type="date"
                {...register("${name}")}
                className={\`w-full p-2 border \${errors["${name}"] ? "border-danger" : "border-gray-300"} rounded-md\`}
              />
              ${errorMsg}
            </div>`;
  }

  if (T === "DATETIME" || T === "TIMESTAMP") {
    return `
            {/* ${name} */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <label className="block text-gray-700">{t("${name}")${requiredStar}}</label>
              <input
                type="datetime-local"
                {...register("${name}")}
                className={\`w-full p-2 border \${errors["${name}"] ? "border-danger" : "border-gray-300"} rounded-md\`}
              />
              ${errorMsg}
            </div>`;
  }

  if (T === "EMAIL") {
    return `
            {/* ${name} */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <label className="block text-gray-700">{t("${name}")${requiredStar}}</label>
              <input
                type="email"
                {...register("${name}")}
                className={\`w-full p-2 border \${errors["${name}"] ? "border-danger" : "border-gray-300"} rounded-md\`}
              />
              ${errorMsg}
            </div>`;
  }

  // default STRING/UUID/otros → text
  return `
            {/* ${name} */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <label className="block text-gray-700">{t("${name}")${requiredStar}}</label>
              <input
                type="text"
                {...register("${name}")}
                className={\`w-full p-2 border \${errors["${name}"] ? "border-danger" : "border-gray-300"} rounded-md\`}
              />
              ${errorMsg}
            </div>`;
};



// Builders de bloques completos
export const buildYupSchemaFields = (columns) =>
  columns.map(col => {
    const required = col.allowNull === false;
    return `${col.name}: ${toYupSchemaFor(col.type, required)}`;
  }).join(',\n    ');




export const buildInputFields = (columns) =>
  columns.map(col => inputFor(col)).join('\n');
