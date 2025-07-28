import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';


export const generateModuleProfile = async (fullPath) => {
    await createRoutes(fullPath);
    await createProfilePage(fullPath);
}



export const createRoutes = async (fullPath) => {
  const routesDir = path.join(fullPath, 'src', 'modules', 'profile', 'routes');
  const filePath = path.join(routesDir, 'ProfileRoutes.jsx');

  // Crear carpeta si no existe
  createFolder(routesDir);

  // Contenido JSX
  const content = `import { Navigate, Route, Routes } from "react-router";
import { ProfilePage } from "../pages/ProfilePage";

export const ProfileRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={ <ProfilePage /> } />
      <Route path="/*" element={ <Navigate to="/auth/dashboard" /> } />
    </Routes>
  );
};
`;

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo generado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear el archivo ${filePath}: ${error.message}`);
  }
};



export const createProfilePage = async (fullPath) => {
  const pagesDir = path.join(fullPath, 'src', 'modules', 'profile', 'pages');
  createFolder(pagesDir);

  const filePath = path.join(pagesDir, 'ProfilePage.jsx');

  const content = `import { useTranslation } from "react-i18next";
import { SessionLayout } from "../../../layouts/private/SessionLayout";
import { useState } from "react";
import { Button } from "../../../components/Buttons/Button";
import Swal from "sweetalert2";

const dataForm = {
  name: "",
  title: "",
  email: "",
  role: "",
};

export const ProfilePage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(dataForm);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    Swal.fire(
      t("message.record_saved"),
      t("message.record_saved_successfully"),
      "success"
    );
  };

  return (
    <SessionLayout>
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {t("profile")}
        </h2>
      </div>

      <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">{t("name")}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700">{t("title")}</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700">{t("email")}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700">{t("role")}</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">{t("select_role")}</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="User">User</option>
            </select>
          </div>

          <div className="flex justify-end mt-7">
            <Button type="submit">{t("save")}</Button>
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
