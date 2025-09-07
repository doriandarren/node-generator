import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';

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


  // 🔑 función helper para limpiar el sufijo "_id"
  const cleanName = (name) => name.replace(/_id$/, "");

  const dataHeaders = columnNames
    .map(col => {
      const cleanCol = cleanName(col);
      return `    { key: "${col}", label: t("${cleanCol}") },`;
    })
    .join("\n");


  const content = `import { useEffect, useState } from "react";
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

  const dataHeader = [
${dataHeaders}
  ];

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const response = await get${pluralName}();
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
  }, []);

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
