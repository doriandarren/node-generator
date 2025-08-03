import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';
import { convertNameProject } from '../../../helpers/helperString.js';


export const generateModuleAuth = async(fullPath) => {    
    await createRoutes(fullPath);
    await createLogin(fullPath);
    await createRegister(fullPath);
    await createAuthIndex(fullPath);

    // Redux
    await createFileAuthSlice(fullPath);
    await createBarrelFileSlice(fullPath);
    await createFileThunksAuth(fullPath);
}




/**
 * ## Routes
 * Genera el archivo AuthRoutes.jsx dentro de src/modules/auth/routes.
 */
const createRoutes = async (fullPath) => {
  // 1) Definir la ruta del archivo
  const routesDir = path.join(fullPath, 'src', 'modules', 'auth', 'routes');
  const filePath  = path.join(routesDir, 'AuthRoutes.jsx');

  // 2) Crear la carpeta routes si no existe
  createFolder(routesDir);

  // 3) Contenido del archivo JSX
  const content = `import { Navigate, Route, Routes } from "react-router";
import { LoginPage, RegisterPage } from "../pages";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login"    element={<LoginPage   />} />
      <Route path="register" element={<RegisterPage />} />

      {/* Redirección global a /auth/login */}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
`;

  // 4) Crear el archivo y escribir el contenido
  try {
    await fs.promises.writeFile(filePath, content);
    console.log(`✅ Archivo creado: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error al crear el archivo ${filePath}: ${error}`);
  }
}

/**
 * ## Pages
 * Genera el archivo LoginPage.jsx dentro de src/modules/auth/pages
 */
const createLogin = async(fullPath) => {
  // 1) Definir la ruta del archivo
  const pagesDir = path.join(fullPath, 'src', 'modules', 'auth', 'pages');
  const filePath = path.join(pagesDir, 'LoginPage.jsx');

  // 2) Crear la carpeta pages si no existe
  createFolder(pagesDir);

  // 3) Contenido completo del componente JSX
  const content = `import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ImgLogo from "../../../assets/images/logo.svg";
import { EyeOffIcon } from "../../../components/Icons/EyeOffIcon";
import { EyeOnIcon } from "../../../components/Icons/EyeOnIcon";
import { useTranslation } from "react-i18next";
import { Button } from "../../../components/Buttons/Button";
import { startLoginWithEmailPassword } from "../../../store/auth/thunks";
import { Toast } from "../../../helpers/helperToast";
import { PreloaderButton } from "../../../components/Preloader/PreloaderButton";

export const LoginPage = () => {
  // Estados y hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { status, errorMessage } = useSelector((state) => state.auth);

  // Mostrar toast si hay mensaje de error
  useEffect(() => {
    if (errorMessage) {
      Toast(\`Error: \${errorMessage}\`, "error");
    }
  }, [errorMessage]);

  // Manejar submit
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Los campos son requeridos");
      return;
    }
    try {
      dispatch(startLoginWithEmailPassword({ email, password }));
    } catch (error) {
      console.log(error);
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="container bg-navbar">
      <div className="block xl:grid grid-cols-2 gap-4">
        {/* Lado izquierdo con branding */}
        <div className="hidden xl:flex flex-col min-h-screen pl-24 animate__animated animate__bounceInLeft form-section">
          <div className="my-auto p-10">
            <img alt="Site - Office" src={ImgLogo} />
            <div className="-intro-x font-light text-4xl leading-tight mt-10 text-white">
              Sistema de Gestión Empresarial
            </div>
            <div className="-intro-x font-light text-2xl leading-tight text-white">
              ERP Edition
            </div>
          </div>
        </div>

        {/* Lado derecho con el formulario */}
        <div className="h-screen xl:h-auto flex xl:py-0 my-10 xl:my-0 bg-white">
          <div className="my-auto mx-auto xl:ml-20 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto animate__animated animate__bounceInRight">
            <form onSubmit={onSubmit}>
              <h2 className="intro-x text-primary text-2xl xl:text-3xl text-center xl:text-left">
                {t("login_page.title")}
              </h2>

              {/* Campo email */}
              <div className="intro-x mt-8">
                <input
                  type="email"
                  className="form-control w-full h-10 px-4 py-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline mb-3"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* Campo password con toggle de visibilidad */}
                <div className="relative">
                  <input
                    className="form-control w-full h-10 px-4 py-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-2">
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeOnIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Checkbox recordar y enlace forgot */}
              <div className="intro-x flex text-slate-600 text-xs sm:text-sm mt-4">
                <div className="flex items-center mr-auto">
                  <input id="remember-me" type="checkbox" className="form-check-input border mr-2" />
                  <label className="cursor-pointer select-none" htmlFor="remember-me">
                    {t("login_page.remember")}
                  </label>
                </div>
                <a href="/reset">{t("login_page.forgot")}</a>
              </div>

              {/* Botón login */}
              <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                <Button
                  type="submit"
                  disabled={status !== "not-authenticated"}
                  className="w-32 h-12 flex items-center justify-center"
                >
                  {status === "checking" ? <PreloaderButton /> : t("login_page.btn_login")}
                </Button>
              </div>
            </form>

            {/* Footer términos */}
            <div className="intro-x mt-10 xl:mt-24 text-slate-600 text-center xl:text-left">
              {t("login_page.terms_txt1")}
              <a className="text-primary" href="#">
                {t("login_page.terms_txt2")}
              </a>{" "}
              {t("login_page.terms_txt3")}
              <a className="text-primary" href="#">
                {t("login_page.terms_txt1")}
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
`;

  // 4) Crear el archivo y escribir el contenido
  try {
    await fs.promises.writeFile(filePath, content);
    console.log(`✅ Archivo creado: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error al crear el archivo ${filePath}: ${error}`);
  }
}

const createRegister = async(fullPath) => {
  // 1) Definir la ruta del archivo
  const pagesDir = path.join(fullPath, 'src', 'modules', 'auth', 'pages');
  const filePath = path.join(pagesDir, 'RegisterPage.jsx');

  // 2) Crear la carpeta pages si no existe
  createFolder(pagesDir);

  // 3) Contenido del archivo RegisterPage.jsx (con comentarios de estructura)
  const content = `import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { PublicLayout } from "../../../layouts/public/PublicLayout";

export const RegisterPage = () => {
  return (
    <PublicLayout>
      <main>
        {/* Category section */}
        <section aria-labelledby="category-heading" className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <form>
              <div className="space-y-12">
                {/* Profile section */}
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
                  <p className="mt-1 text-sm/6 text-gray-600">
                    This information will be displayed publicly so be careful what you share.
                  </p>

                  {/* Username input */}
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                        Username
                      </label>
                      <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                          <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                            workcation.com/
                          </div>
                          <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="janesmith"
                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                          />
                        </div>
                      </div>
                    </div>

                    {/* About textarea */}
                    <div className="col-span-full">
                      <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">About</label>
                      <div className="mt-2">
                        <textarea
                          id="about"
                          name="about"
                          rows={3}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          defaultValue={""}
                        />
                      </div>
                      <p className="mt-3 text-sm/6 text-gray-600">
                        Write a few sentences about yourself.
                      </p>
                    </div>

                    {/* Profile photo */}
                    <div className="col-span-full">
                      <label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900">Photo</label>
                      <div className="mt-2 flex items-center gap-x-3">
                        <UserCircleIcon aria-hidden="true" className="size-12 text-gray-300" />
                        <button
                          type="button"
                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                        >
                          Change
                        </button>
                      </div>
                    </div>

                    {/* Cover photo */}
                    <div className="col-span-full">
                      <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                        Cover photo
                      </label>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                          <div className="mt-4 flex text-sm/6 text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500">
                              <span>Upload a file</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Information section */}
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
                  <p className="mt-1 text-sm/6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* First and Last name, Email, Country, Address, etc. */}
                    {/* ... resto del contenido omitido por brevedad ... */}
                  </div>
                </div>

                {/* Notifications section */}
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base/7 font-semibold text-gray-900">Notifications</h2>
                  <p className="mt-1 text-sm/6 text-gray-600">
                    We'll always let you know about important changes, but you pick what else you want to hear about.
                  </p>

                  {/* Checkboxes de notificaciones */}
                  {/* ... omitido por brevedad ... */}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm/6 font-semibold text-gray-900">Cancel</button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
};
`;

  // 4) Crear el archivo y escribir el contenido
  try {
    await fs.promises.writeFile(filePath, content);
    console.log(`✅ Archivo creado: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error al crear el archivo ${filePath}: ${error}`);
  }
}

const createAuthIndex = async(fullPath) => {
  // Importación de módulos necesarios (fs y path ya deben estar importados en el archivo principal)
  
  // Define la ruta del archivo
  const pagesDir = path.join(fullPath, "src", "modules", "auth", "pages");
  const filePath = path.join(pagesDir, "index.js");

  // Crear la carpeta pages si no existe
  createFolder(pagesDir);

  // Contenido del archivo index.js
  const homePageContent = `export * from './LoginPage';
export * from './RegisterPage';
`;

  // Crear el archivo y escribir el contenido
  try {
    fs.writeFileSync(filePath, homePageContent);
    console.log(`✅ Archivo creado: ${filePath}`);
  } catch (e) {
    console.error(`❌ Error al crear el archivo ${filePath}: ${e}`);
  }
}

/**
 * ## Redux
 * Genera el archivo authSlice.js dentro de la carpeta store/auth
 */
const createFileAuthSlice = async(fullPath) => {
  // Define la ruta del archivo
  const routesDir = path.join(fullPath, "src", "store", "auth");
  const filePath = path.join(routesDir, "authSlice.js");

  const projectName = convertNameProject(fullPath);


  // Crear la carpeta auth si no existe
  createFolder(routesDir);

  // Contenido del archivo authSlice.js
  const content = `import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'checking', // 'checking', 'not-authenticated', 'authenticated' 
  token: null,
  email: null,
  displayName: null,
  image_url: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.token = payload.token;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.image_url = payload.image_url;
      state.errorMessage = null;

      // Guardar en localStorage para que persista
      localStorage.setItem("token_${projectName}", payload.token);
    },

    logout: (state, payload) => {
      state.status = 'not-authenticated';
      state.token = null;
      state.email = null;
      state.displayName = null;
      state.image_url = null;
      state.errorMessage = payload?.errorMessage;

      // Eliminar de localStorage
      localStorage.removeItem("token_${projectName}");
    },

    setErrorMessage: (state, action) => {
      state.status = 'not-authenticated';
      state.errorMessage = action.payload;
    },

    checkingCredentials: (state) => {
      state.status = 'checking';
    }
  }
});

// Action creators generados automáticamente por cada reducer
export const { login, logout, checkingCredentials, setErrorMessage } = authSlice.actions;
`;

  // Crear el archivo y escribir el contenido
  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo creado: ${filePath}`);
  } catch (e) {
    console.error(`❌ Error al crear el archivo ${filePath}: ${e}`);
  }
}

const createBarrelFileSlice = async(fullPath) => {
  // Define la ruta del archivo
  const routesDir = path.join(fullPath, "src", "store", "auth");
  const filePath = path.join(routesDir, "index.js");

  // Crear la carpeta auth si no existe
  createFolder(routesDir);

  // Contenido del archivo
  const content = `export * from './authSlice';
export * from './thunks';`;

  // Crear el archivo y escribir el contenido
  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo creado: ${filePath}`);
  } catch (e) {
    console.error(`❌ Error al crear el archivo ${filePath}: ${e}`);
  }
}

// Genera el archivo thunks.js dentro de src/store/auth
const createFileThunksAuth = async(fullPath) => {
  // 1) Definir la ruta del archivo
  const routesDir = path.join(fullPath, "src", "store", "auth");
  const filePath  = path.join(routesDir, "thunks.js");

  // 2) Crear la carpeta auth si no existe
  createFolder(routesDir);

  // 3) Contenido del archivo thunks.js
  const content = `import { api } from "../../api/api";
import { checkingCredentials, login, logout, setErrorMessage } from "./authSlice";

/**
 * Marca el estado como "checking" para mostrar loaders o bloquear formulario.
 */
export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

/**
 * Inicia sesión con email y password.
 * Si es exitoso, obtiene el usuario y lo guarda en Redux + localStorage.
 */
export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    try {
      const { token, errors } = await api("auth/login", "POST", { email, password });

      // Si la API devolvió errores:
      if (!token) {
        console.log(errors);
        dispatch(setErrorMessage(errors[0].e));
        return;
      }

      // Obtener datos del usuario autenticado
      const userResponse = await api("auth/user", "GET", null, token);
      const { email: emailApi, name: nameApi } = userResponse.data;

      const user = {
        status: "authenticated",
        token,
        email: emailApi,
        displayName: nameApi,
        image_url: "",
        errorMessage: null,
      };

      dispatch(login(user));
    } catch (error) {
      console.log(error);
    }
  };
};

/**
 * Cierra la sesión limpiando Redux y localStorage.
 */
export const startLogout = () => {
  return async (dispatch) => {
    dispatch(logout());
  };
};

/**
 * Restaura la sesión si existe un token válido en localStorage.
 */
export const startRestoreSession = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const token = localStorage.getItem("token_portuarios");

    // Si no hay token ⇒ cerrar sesión
    if (!token) {
      dispatch(logout());
      return;
    }

    try {
      const userResponse = await api("auth/user", "GET", null, token);
      const { email: emailApi, name: nameApi } = userResponse.data;

      const user = {
        status: "authenticated",
        token,
        email: emailApi,
        displayName: nameApi,
        image_url: "",
        errorMessage: null,
      };

      dispatch(login(user));
    } catch (error) {
      console.error("Error al restaurar sesión:", error);
      dispatch(logout());
    }
  };
};
`;

  // 4) Crear el archivo y escribir el contenido
  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo creado: ${filePath}`);
  } catch (e) {
    console.error(`❌ Error al crear el archivo ${filePath}: ${e}`);
  }
}




