import fs from 'fs';
import path from 'path';
import { createFolder, runExec } from '../../../helpers/helperFile.js';
import { printMessage } from '../../../helpers/inquirer.js';


export const generateReactRouter = async(fullPath) => {    
    await setupReactRouter(fullPath);
    await setupAppJsx(fullPath);
    await updateMainJsx(fullPath);
    await createAppRouter(fullPath);
    await createPrivateRoute(fullPath);
    await createPublicRoute(fullPath);    
}




const setupReactRouter = async (fullPath) => {
  try {
    printMessage("Instalando React Router...", 'cyan');
    await runExec("npm install react-router-dom", fullPath);
    printMessage("React Router instalado correctamente.", 'green');
  } catch (err) {
    printMessage(`❌ Error instalando React Router: ${err.message}`, 'red');
  }
};




const setupAppJsx = async(fullPath) => {
  

  const appJsxContent = `import { AppRouter } from './router/AppRouter';

export const App = () => {
  return (
    <>
      <AppRouter />
    </>
  );
};
`;

  try {
    const appJsxPath = path.join(fullPath, 'src', 'App.jsx');
    fs.writeFileSync(appJsxPath, appJsxContent);
    printMessage('App.jsx configurado correctamente.', 'green');
  } catch (err) {
    printMessage(`Error al escribir App.jsx: ${err.message}`, 'red');
  }
}

const createAppRouter = async(fullPath) => {
  const routesDir = path.join(fullPath, 'src', 'router');
  const filePath  = path.join(routesDir, 'AppRouter.jsx');

  createFolder(routesDir);

  const content = `import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../modules/auth/routes/AuthRoutes";
import { DashboardRoutes } from "../modules/dashboard/routes/DashboardRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { startRestoreSession } from "../store/auth/thunks";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { PreloaderMain } from "../components/Preloader/PreloaderMain";
import { TeamRoutes } from "../modules/teams/routes/TeamRoutes";
import { UserRoutes } from "../modules/users/routes/UserRoutes";
import { ProfileRoutes } from "../modules/profiles/routes/ProfileRoutes";
import { SystemRoutes } from "../modules/systems/routes/SystemRoutes";
import { QuoteRoutes } from "../modules/quotes/routes/QuoteRoutes";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const isAuthenticated = status === "authenticated";
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    dispatch(startRestoreSession()).finally(() => {
      setCheckingAuth(false);
    });
  }, [dispatch]);

  if (checkingAuth) {
    return <PreloaderMain />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/auth/*" element={<PublicRoute isAuthenticated={isAuthenticated} />}>
        <Route path="*" element={<AuthRoutes />} />
      </Route>

      {/* Private Routes */}
      <Route path="/admin/*" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
        <Route path="dashboard/*" element={<DashboardRoutes />} />
        <Route path="users/*" element={<UserRoutes />} />
        <Route path="teams/*" element={<TeamRoutes />} />
        <Route path="profiles/*" element={<ProfileRoutes />} />
        <Route path="systems/*" element={<SystemRoutes />} />
        <Route path="quotes/*" element={<QuoteRoutes />} />
      </Route>

      {/* Global Redirection */}
      <Route path="/" element={<Navigate to={isAuthenticated ? "/admin/dashboard" : "/auth/login"} />} />
    </Routes>
  );
};
`;

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo creado: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error al crear el archivo ${filePath}: ${error}`);
  }
}

const createPrivateRoute = async(fullPath) => {
  const routesDir = path.join(fullPath, 'src', 'router');
  const filePath  = path.join(routesDir, 'PrivateRoute.jsx');

  createFolder(routesDir);

  const content = `
// router/PrivateRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllowedPathsByRoles } from '../helpers/helperAllowedPaths.js';

export const PrivateRoute = ({ isAuthenticated }) => {
  // hooks SIEMPRE arriba
  const location = useLocation();
  const { roles } = useSelector((state) => state.auth);

  // 1) auth
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // 2) autorización por rol
  const allowedPaths = getAllowedPathsByRoles(roles);

  // full access si allowed contiene "/admin"
  const hasFullAccess = allowedPaths.has("/admin");

  // ¿la ruta actual empieza por alguna base permitida?
  const isAllowed =
    hasFullAccess || [...allowedPaths].some(base => location.pathname.startsWith(base));

  if (!isAllowed) {
    // opcional: log rápido
    // console.warn('Bloqueado por rol', { path: location.pathname, allowed: [...allowedPaths] });
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};
`;

  try {
    await fs.promises.writeFile(filePath, content);
    console.log(`✅ Archivo creado: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error al crear el archivo ${filePath}: ${error}`);
  }
}

const createPublicRoute = async(fullPath) => {
  const routesDir = path.join(fullPath, 'src', 'router');
  const filePath  = path.join(routesDir, 'PublicRoute.jsx');

  createFolder(routesDir);

  const content = `import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoute = ({ isAuthenticated }) => {
  return !isAuthenticated ? <Outlet /> : <Navigate to="/admin/dashboard" />;
};
`;

  try {
    await fs.promises.writeFile(filePath, content);
    console.log(`✅ Archivo creado: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error al crear el archivo ${filePath}: ${error}`);
  }
}


const updateMainJsx = async (fullPath) => {
  const mainJsxPath = path.join(fullPath, 'src', 'main.jsx');

  // Verificar si el archivo existe
  if (!fs.existsSync(mainJsxPath)) {
    printMessage(`Error: ${mainJsxPath} no existe.`, 'cyan');
    return;
  }

  try {
    // Leer el contenido original
    const content = fs.readFileSync(mainJsxPath, 'utf-8');

    // Reemplazos
    let updatedContent = content.replace(
      `import App from './App.jsx'`,
      `import { App } from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import 'animate.css';`
    );

    updatedContent = updatedContent.replace(
      `<App />`,
      `<Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>`
    );

    // Escribir de nuevo el archivo
    fs.writeFileSync(mainJsxPath, updatedContent, 'utf-8');

    printMessage('main.jsx configurado correctamente.', 'green');
  } catch (err) {
    printMessage(`Error al actualizar ${mainJsxPath}: ${err.message}`, 'red');
  }
};
