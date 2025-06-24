import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';


export const generateReactRouter = async(fullPath) => {    
    await setupReactRouter(fullPath)
    await setupAppJsx(fullPath)
    await updateMainJsx(fullPath)
    await generateAppRouter(fullPath)
    await generatePrivateRoute(fullPath)
    await generatePublicRoute(fullPath)    
}

export const setupReactRouter = (fullPath) => {
  const CYAN  = chalk.cyan;
  const GREEN = chalk.green;
  const RED   = chalk.red;

  const printMessage = (msg, color) => console.log(color(msg));

  try {
    printMessage('Instalando React Router...', CYAN);
    execSync('npm install react-router-dom', { cwd: fullPath, stdio: 'inherit' });
    printMessage('React Router instalado correctamente.', GREEN);
  } catch (err) {
    printMessage(`❌ Error instalando React Router: ${err.message}`, RED);
  }
};

export const setupAppJsx = (fullPath) => {
  const GREEN = chalk.green;
  const RED   = chalk.red;

  const printMessage = (msg, color) => console.log(color(msg));

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
    printMessage('App.jsx configurado correctamente.', GREEN);
  } catch (err) {
    printMessage(`Error al escribir App.jsx: ${err.message}`, RED);
  }
};

