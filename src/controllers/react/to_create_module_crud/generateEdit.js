import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';
import { pascalToCamelCase } from '../../../helpers/helperString.js';
import { buildInputFields, buildYupSchemaFields } from '../helpers/helperFormGenerator.js';
import { 
  buildComboboxImport, 
  buildVariables, 
  hasFk, 
  buildEditFetchPieces,
  buildBooleanImport,
  hasBoolean,
  buildBooleanEditSetValues,
} from '../helpers/helperReactRelations.js';

export const generateEdit = async (
  fullPath, 
  singularName, 
  pluralName, 
  singularNameKebab, 
  pluralNameKebab, 
  singularNameSnake, 
  pluralNameSnake, 
  singularNameCamel, 
  pluralNameCamel,
  columns
) => {
  const pagesDir = path.join(fullPath, 'src', 'modules', pluralNameSnake, 'pages');
  createFolder(pagesDir);

  const filePath = path.join(pagesDir, `${singularName}EditPage.jsx`);


  const lowerFirst = pascalToCamelCase(singularName);
  const columnNames = columns.map(col => col.name);
  
  const setValues = columnNames
    .map(col => `setValue("${col}", data.${col});`)
    .join('\n          ');


  const schemaFields = buildYupSchemaFields(columns);
  const inputFields  = buildInputFields(columns);


  // Combobox
  const createVariables = buildVariables(columns);
  const comboboxImport  = buildComboboxImport(columns);
  const hasAnyFk        = hasFk(columns);

  // Piezas para Promise.all y asignaciones FK en EDIT
  const { resNames, promiseCalls, fkLoadBlocks, fkSelectBlocks } = buildEditFetchPieces(columns);


  // Boolean
  const booleanImport  = buildBooleanImport(columns);
  const needsWatch     = hasBoolean(columns);
  const booleanEditSetValues = buildBooleanEditSetValues(columns);



  const content = `
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { SessionLayout } from "../../../layouts/private/SessionLayout";
import { ThemedButton } from "../../../components/Buttons/ThemedButton";
import { Preloader } from "../../../components/Preloader/Preloader";
import { PreloaderButton } from "../../../components/Preloader/PreloaderButton";
import { get${singularName}ById, update${singularName} } from "../services/${singularNameCamel}Service";${booleanImport}${comboboxImport}

export const ${singularName}EditPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataLoading, setDataLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  ${createVariables}

  const schema = yup.object().shape({
    ${schemaFields}
  });

  const {
    register,
    handleSubmit,
    setValue,${needsWatch ? '\n    watch,' : ''}
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataLoading(true);

        const [ ${lowerFirst}Res${resNames ? `, ${resNames}` : ""} ] = await Promise.all([
          get${singularName}ById(id), 
          ${promiseCalls ? `${promiseCalls},` : ""}
        ]);

        ${fkLoadBlocks}

        if (${lowerFirst}Res.success) {

          const {data} = ${lowerFirst}Res;
          ${setValues} 

          ${fkSelectBlocks}

          ${booleanEditSetValues}

        } else {

          Swal.fire({
            title: t("error"),
            icon: "error",
            confirmButtonText: t("message.ok"),
            confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_DANGER
          });
          navigate("/admin/${pluralNameKebab}");

        }
      } catch (error) {

        console.error("Error al obtener los datos:", error);
        Swal.fire({
          title: t("errors.error_process"),
          icon: "error",
          confirmButtonText: t("message.ok"),
          confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_DANGER
        });
        navigate("/admin/${pluralNameKebab}");

      } finally {

        setDataLoading(false);

      }
    };

    fetchData();
  }, [id, navigate, setValue, t]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await update${singularName}(id, data);

      if (response.success) {
        Swal.fire({
          title: t("message.record_updated"),
          icon: "success",
          confirmButtonText: t("message.ok"),
          confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS
        }).then(() => {
          navigate("/admin/${pluralNameKebab}");
        });
      } else {
        Swal.fire({
          title: t("error"),
          icon: "error",
          confirmButtonText: t("message.ok"),
          confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_DANGER
        });
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
      Swal.fire({
        title: t("errors.error_process"),
        icon: "error",
        confirmButtonText: t("message.ok"),
        confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_DANGER
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onClickCancel = (e) => {
    e.preventDefault();
    navigate("/admin/${pluralNameKebab}");
  };

  return (
    <SessionLayout>
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {t("edit")}
        </h2>
      </div>

      <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
        {dataLoading ? (
          <Preloader />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-6">
            ${inputFields}

            <div className="col-span-12 flex justify-center items-center mt-7 gap-4 flex-wrap">
              <ThemedButton 
                type="submit"
                disabled={isLoading}
                className="w-32 h-10 flex items-center justify-center"
              >
                { 
                  isLoading 
                  ? <PreloaderButton /> 
                  : t("save")
                }
              </ThemedButton>
              <ThemedButton variant="danger" onClick={onClickCancel}>
                {t("cancel")}
              </ThemedButton>
            </div>
          </form>
        )}
      </div>
    </SessionLayout>
  );
};
`.trimStart();

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo ${filePath}: ${error.message}`);
  }
};
