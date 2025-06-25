import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';


export const generateModuleTeams = async(fullPath) => {    
    createRoutes(fullPath)
    createListPage(fullPath)
    createCreatePage(fullPath)
    createEditPage(fullPath)
    createBarrelFile(fullPath)

    // Service
    createServiceFile(fullPath)
}



export const generateTeamRoutes = async (fullPath) => {
  const routesDir = path.join(fullPath, 'src', 'modules', 'teams', 'routes');
  const filePath = path.join(routesDir, 'TeamRoutes.jsx');

  // Crear la carpeta si no existe
  createFolder(routesDir);

  const content = `import { Navigate, Route, Routes } from "react-router";
import { TeamPage, TeamCreatePage, TeamEditPage } from "../pages";

export const TeamRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TeamPage />} />
      <Route path="create" element={<TeamCreatePage />} />
      <Route path="edit/:id" element={<TeamEditPage />} />
    </Routes>
  );
};
`;

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear el archivo ${filePath}: ${error.message}`);
  }
};


export const generateTeamListPage = async (fullPath) => {
  const pagesDir = path.join(fullPath, 'src', 'modules', 'teams', 'pages');
  const filePath = path.join(pagesDir, 'TeamPage.jsx');

  createFolder(pagesDir);

  const content = `import { SessionLayout } from "../../../layouts/private/SessionLayout";
import { Datatable } from "../../../components/DataTables/DataTable";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../../../components/Buttons/Button";
import { useEffect, useState } from "react";
import { deleteTeam, getTeams } from "../services/teamService";
import Swal from "sweetalert2";
import { Toast } from "../../../helpers/helperToast";
import { Preloader } from "../../../components/Preloader/Preloader";

export const TeamPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const dataHeader = [
    { key: "name", label: t("name") },
    { key: "transporeon_code", label: t("transporeon_code") },
    { key: "msoft_code", label: t("msoft_code") },
  ];

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const response = await getTeams();
        const { data } = response;
        if (Array.isArray(data)) {
          setData(data);
        } else {
          console.warn("La API no devolvió un array:", response);
        }
      } catch (error) {
        console.error("Error al obtener los equipos:", error);
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
          const response = await deleteTeam(id);
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
    navigate("/admin/teams/create");
  };

  return (
    <SessionLayout>
      <div className="flex items-center justify-between mb-5">
        <div className="mt-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("teams")}</h2>
        </div>
        <div className="sm:flex sm:items-center">
          <div className="mt-4 sm:mt-0 sm:flex-none">
            <Button type="button" onClick={onAddClick}>
              {t("add")}
            </Button>
          </div>
        </div>
      </div>
      {loading ? (
        <Preloader />
      ) : (
        <Datatable
          columns={dataHeader}
          data={data}
          editPath="/admin/teams"
          onDelete={onDeleteClick}
        />
      )}
    </SessionLayout>
  );
};
`;

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear el archivo ${filePath}: ${error.message}`);
  }
};


export const generateTeamCreatePage = async (fullPath) => {
  const pagesDir = path.join(fullPath, 'src', 'modules', 'teams', 'pages');
  const filePath = path.join(pagesDir, 'TeamCreatePage.jsx');

  createFolder(pagesDir);

  const content = `import { useTranslation } from "react-i18next";
import { SessionLayout } from "../../../layouts/private/SessionLayout";
import { Button } from "../../../components/Buttons/Button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createTeam } from "../services/teamService";

export const TeamCreatePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required(t("form.required")),
    transporeon_code: yup.string().required(t("form.required")),
    msoft_code: yup.string().required(t("form.required")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await createTeam(data);
      if (response) {
        Swal.fire("Registro guardado correctamente", "Registro guardado", "success").then(() => {
          navigate("/admin/teams");
        });
      } else {
        Swal.fire("Error", "No se pudo guardar el registro", "error");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      Swal.fire("Error", "Hubo un problema al guardar el registro", "error");
    }
  };

  const onClickCancel = (e) => {
    e.preventDefault();
    navigate("/admin/teams");
  };

  return (
    <SessionLayout>
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {t("add")}
        </h2>
      </div>

      <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <label className="block text-gray-700">{t("name")}</label>
            <input
              type="text"
              {...register("name")}
              className={\`w-full p-2 border \${errors.name ? "border-danger" : "border-gray-300"} rounded-md\`}
            />
            {errors.name && <p className="text-danger text-sm">{errors.name.message}</p>}
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <label className="block text-gray-700">{t("transporeon_code")}</label>
            <input
              type="text"
              {...register("transporeon_code")}
              className={\`w-full p-2 border \${errors.transporeon_code ? "border-danger" : "border-gray-300"} rounded-md\`}
            />
            {errors.transporeon_code && <p className="text-danger text-sm">{errors.transporeon_code.message}</p>}
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <label className="block text-gray-700">{t("msoft_code")}</label>
            <input
              type="text"
              {...register("msoft_code")}
              className={\`w-full p-2 border \${errors.msoft_code ? "border-danger" : "border-gray-300"} rounded-md\`}
            />
            {errors.msoft_code && <p className="text-danger text-sm">{errors.msoft_code.message}</p>}
          </div>

          <div className="col-span-12 flex justify-center mt-7">
            <Button type="submit">{t("save")}</Button>
            <Button variant="danger" onClick={onClickCancel}>
              {t("cancel")}
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
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear el archivo ${filePath}: ${error.message}`);
  }
};


export const generateTeamBarrel = async (fullPath) => {
  const pagesDir = path.join(fullPath, 'src', 'modules', 'teams', 'pages');
  const filePath = path.join(pagesDir, 'index.js');

  // Crear carpeta si no existe
  createFolder(pagesDir);

  const content = `export * from './TeamPage';
export * from './TeamCreatePage';
export * from './TeamEditPage';
`.trimStart();

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear el archivo ${filePath}: ${error.message}`);
  }
};



export const generateTeamService = async (fullPath) => {
  const servicesDir = path.join(fullPath, 'src', 'modules', 'teams', 'services');
  const filePath = path.join(servicesDir, 'teamService.js');

  // Asegura que la carpeta exista
  createFolder(servicesDir);

  const content = `import { api } from "../../../api/api";

/**
 * List
 */
export const getTeams = async () => {
  try {
    const token = localStorage.getItem("token_portuarios");
    if (!token) {
      console.warn("No hay token disponible en localStorage");
      return [];
    }

    const response = await api("teams/list", "GET", null, token);

    if (!response || typeof response !== "object") {
      console.error("Respuesta no válida de la API:", response);
      return [];
    }

    return response;
  } catch (error) {
    console.error("Error al obtener los equipos:", error);
    return [];
  }
};

/**
 * Show
 */
export const getTeamById = async (id) => {
  try {
    const token = localStorage.getItem("token_portuarios");
    if (!token) return null;

    const response = await api(\`teams/show/\${id}\`, "GET", null, token);
    return response;
  } catch (error) {
    console.error("Error al obtener el registro:", error);
    return null;
  }
};

/**
 * Store
 */
export const createTeam = async (data) => {
  try {
    const token = localStorage.getItem("token_portuarios");
    if (!token) {
      console.warn("No hay token disponible en localStorage");
      return null;
    }

    const response = await api("teams/store", "POST", data, token);

    if (!response || typeof response !== "object") {
      console.error("Error en la respuesta de la API:", response);
      return null;
    }

    return response;
  } catch (error) {
    console.error("Error al enviar los datos:", error);
    return null;
  }
};

/**
 * Update
 */
export const updateTeam = async (id, data) => {
  try {
    const token = localStorage.getItem("token_portuarios");
    if (!token) return null;

    const response = await api(\`teams/update/\${id}\`, "PUT", data, token);
    return response;
  } catch (error) {
    console.error("Error al actualizar el registro:", error);
    return null;
  }
};

/**
 * Delete
 */
export const deleteTeam = async (id) => {
  try {
    const token = localStorage.getItem("token_portuarios");
    if (!token) return null;

    const response = await api(\`teams/delete/\${id}\`, "DELETE", null, token);
    return response;
  } catch (error) {
    console.error("Error al eliminar el registro:", error);
    return null;
  }
};
`.trimStart();

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear el archivo ${filePath}: ${error.message}`);
  }
};