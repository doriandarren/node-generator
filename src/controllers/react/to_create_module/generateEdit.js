import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';

export const generateEdit = async (
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
  createFolder(pagesDir);

  const filePath = path.join(pagesDir, `${singularName}EditPage.jsx`);
  const columnNames = columns.map(col => col.name);

  const schemaFields = columnNames
    .map(col => `${col}: yup.string().required(t("form.required"))`)
    .join(',\n    ');

  const setValues = columnNames
    .map(col => `setValue("${col}", data.${col});`)
    .join('\n            ');

  const inputFields = columnNames
    .map(col => {
      return `
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <label className="block text-gray-700">{t("${col}")}</label>
            <input
              type="text"
              {...register("${col}")}
              className={\`w-full p-2 border \${errors.${col} ? "border-danger" : "border-gray-300"} rounded-md\`}
            />
            {errors.${col} && <p className="text-danger text-sm">{errors.${col}.message}</p>}
          </div>`;
    })
    .join('\n');

  const content = `
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { SessionLayout } from "../../../layouts/private/SessionLayout";
import { Button } from "../../../components/Buttons/Button";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { get${singularName}ById, update${singularName} } from "../services/${singularFirstCamel}Service";
import { Preloader } from "../../../components/Preloader/Preloader";
import { PreloaderButton } from "../../../components/Preloader/PreloaderButton";

export const ${singularName}EditPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataLoading, setDataLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object().shape({
    ${schemaFields}
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataLoading(true);
        const response = await get${singularName}ById(id);
        const data = response.data;

        if (response.success) {
            ${setValues}
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
              <Button 
                type="submit"
                disabled={isLoading}
                className="w-32 h-10 flex items-center justify-center"
              >
                { 
                  isLoading 
                  ? <PreloaderButton /> 
                  : t("save")
                }
              </Button>
              <Button variant="danger" onClick={onClickCancel}>
                {t("cancel")}
              </Button>
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
