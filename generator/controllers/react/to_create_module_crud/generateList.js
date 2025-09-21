import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';



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







export const generateList = async(
  projectPath,
  singularName,
  pluralName,
  singularNameKebab,
  pluralNameKebab,
  singularNameSnake,
  pluralNameSnake,
  singularFirstCamel, 
  columns
) => {
  const pagesDir = path.join(projectPath, 'src', 'modules', pluralNameSnake, 'pages');
  const filePath = path.join(pagesDir, `${singularName}Page.jsx`);

  createFolder(pagesDir);

  const columnNames = columns.map(col => col.name);
  const uniqueCols = [...new Set(columnNames)]; // por si vinieran repetidas


  // 🔑 función helper para limpiar el sufijo "_id"
  const cleanName = (name) => name.replace(/_id$/, "");

  const dataHeaders = columnNames
    .map(col => {
      const cleanCol = cleanName(col);
      return `    { key: "${col}", label: t("${cleanCol}") },`;
    })
    .join("\n");


  // --- GENERACIÓN DINÁMICA DE FILTROS DESDE COLUMNS ---

  // 🔧 bloques construidos FUERA
  const filtersState = buildFiltersState(uniqueCols);
  const resetFiltersBody = buildResetFiltersBody(uniqueCols);
  const filtersObject = buildFiltersObject(uniqueCols);
  const effectDeps = buildEffectDeps(uniqueCols);

  

  const content = `import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { SessionLayout } from "../../../layouts/private/SessionLayout";
import { Toast } from "../../../helpers/helperToast";
import { Preloader } from "../../../components/Preloader/Preloader";
import { ThemedDataTable } from "../../../components/DataTables/ThemedDataTable";
import { ThemedButton } from "../../../components/Buttons/ThemedButton";
import { ThemedText } from "../../../components/Text/ThemedText";
import { delete${singularName}, get${pluralName} } from "../services/${singularFirstCamel}Service";


export const ${singularName}Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


// --- filtros (UI) ---
  ${filtersState}


  const resetFilters = useCallback(() => {
${resetFiltersBody}
});

  const dataHeader = [
${dataHeaders}
  ];

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        
        const response = await get${pluralName}({
          ${filtersObject}
        });
        
        const { data } = response;

        if (Array.isArray(data)) {
          setData(data);
        } else {
          console.warn("La API no devolvió un array:", response);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApi();
  }, [${effectDeps}]);

  const onDeleteClick = async (id, description = "") => {
    Swal.fire({
      icon: "warning",
      title: t("message.are_you_sure"),
      text: t("delete") + (description !== "" ? ": " + description : ""),
      showCancelButton: true,
      confirmButtonText: t("delete"),
      cancelButtonText: t("cancel"),
      confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await delete${singularName}(id);
          const { success, errors } = response;

          if (success) {
            setData((prevData) => prevData.filter((item) => item.id !== id));
            await Toast(t("message.record_deleted"), "success");
          } else {
            await Toast(errors?.[0]?.e || t("message.error_deleting"), "error");
          }
        } catch (error) {
          console.error("Error al eliminar el registro:", error);
          await Toast(t("message.error_deleting"), "error");
        }
      }
    });
  };

  const onAddClick = (e) => {
    e.preventDefault();
    navigate("/admin/${pluralNameKebab}/create");
  };

  return (
    <SessionLayout>
      <div className="flex items-center justify-between mb-5">
        
        <ThemedText type="h2">{t("${pluralNameSnake}")}</ThemedText>

        <div className="sm:flex sm:items-center">
          <div className="mt-4 sm:mt-0 sm:flex-none">
            <ThemedButton type="button" onClick={onAddClick}>
              {t("add")}
            </ThemedButton>
          </div>
        </div>
      </div>

      {/* filters */}
      ${buildRenderFiltersFn(uniqueCols)}

      {loading ? (
        <Preloader />
      ) : (
        <ThemedDataTable
          columns={dataHeader}
          data={data}
          editPath="/admin/${pluralNameKebab}"
          onDelete={onDeleteClick}
        />
      )}
    </SessionLayout>
  );
};
`;

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo creado: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error al crear el archivo ${filePath}: ${error}`);
  }
};
