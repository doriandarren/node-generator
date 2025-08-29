import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';
import { buildInputFields, buildYupSchemaFields } from './helpers/helperFormGenerator.js';
import { 
  buildComboboxImport, 
  buildVariables, 
  hasFk, 
  buildComboboxUseEffect,
  buildBooleanImport,
  hasBoolean,
  buildBooleanDefaultValuesProp,
} from './helpers/helperReactRelations.js';


export const generateCreate = async(
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
  const filePath = path.join(pagesDir, `${singularName}CreatePage.jsx`);

  createFolder(pagesDir);



  const schemaFields = buildYupSchemaFields(columns);
  const inputFields  = buildInputFields(columns);


  // Combobox
  const createVariables = buildVariables(columns);
  const comboboxImport  = buildComboboxImport(columns);
  const hasInputFK = hasFk(columns);
  const comboboxUseEffect = buildComboboxUseEffect(columns);

  // Boolean
  const booleanImport  = buildBooleanImport(columns);
  const hasInputBoolean     = hasBoolean(columns);
  const booleanDefaultsProp  = buildBooleanDefaultValuesProp(columns);



  const content = `import {${ hasInputFK ? ' useEffect, ' : ' '}useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { SessionLayout } from "../../../layouts/private/SessionLayout";
import { Button } from "../../../components/Buttons/Button";
import { create${singularName} } from "../services/${singularNameCamel}Service";
import { PreloaderButton } from "../../../components/Preloader/PreloaderButton";${booleanImport}${comboboxImport}

export const ${singularName}CreatePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  ${createVariables}

  const schema = yup.object().shape({
    ${schemaFields}
  });

  const {
    register,
    handleSubmit,${ hasInputFK ? '\n    setValue,' : ''}${hasInputBoolean ? '\n    watch,' : ''}
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),${
      booleanDefaultsProp ? `\n    ${booleanDefaultsProp}` : ""
    }
  });

  ${comboboxUseEffect}

  const onSubmit = async(data) => {
    try {
      setIsLoading(true);
      const { success } = await create${singularName}(data);

      if (success) {
        Swal.fire({
          title: t("message.record_saved"),
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
      console.error("Error al enviar los datos:", error);
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
          { t("add") }
        </h2>
      </div>

      <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
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
              { t("cancel") }
            </Button>
          </div>

        </form>
      </div>
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
