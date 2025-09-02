import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';
import { buildInputFields, buildYupSchemaFields } from '../helpers/helperFormGenerator.js';
import { 
  buildComboboxImport, 
  buildVariables, 
  hasFk, 
  buildComboboxUseEffect,
  buildBooleanImport,
  hasBoolean,
  buildBooleanDefaultValuesProp,
} from '../helpers/helperReactRelations.js';


export const generateSinglePage = async(
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
  const filePath = path.join(pagesDir, `${singularName}Page.jsx`);

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
import { ThemedButton } from "../../../components/Buttons/ThemedButton";
import { ThemedText } from "../../../components/Text/ThemedText";
import { ThemedCard } from "../../../components/Cards/ThemedCard";
import { get${pluralName} } from "../services/${singularNameCamel}Service";
import { PreloaderButton } from "../../../components/Preloader/PreloaderButton";${booleanImport}${comboboxImport}

export const ${singularName}Page = () => {
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
      const { success } = await get${pluralName}();

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

  return (
    <SessionLayout>
      
      <ThemedText type="h2">{t("replace")}</ThemedText>

      <ThemedCard>
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
          </div>

        </form>
      </ThemedCard>
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
