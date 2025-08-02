import fs from 'fs';
import path from 'path';



export const updateEnv = async (fullPath) => {
  try {
    // Ruta del archivo .env
    const envPath = path.join(fullPath, '.env');

    if (!fs.existsSync(envPath)) {
      console.error(`❌ No se encontró el archivo .env en: ${envPath}`);
      return;
    }

    // Leer el contenido del .env
    let envContent = fs.readFileSync(envPath, 'utf8');

    // Reemplazar APP_URL por dos líneas
    envContent = envContent.replace(
      /^APP_URL=.*$/m,
      `APP_URL=http://localhost\nBASE_API_STANDARD=http://api.site.test/api/v1/`
    );

    // Reemplazar BASE_API_GLOBALAPP
    if (/^BASE_API_GLOBALAPP=.*$/m.test(envContent)) {
      envContent = envContent.replace(
        /^BASE_API_GLOBALAPP=.*$/m,
        'BASE_API_GLOBALAPP=http://api.globaltank.test/api/v1/'
      );
    } else {
      envContent += `\nBASE_API_GLOBALAPP=http://api.globaltank.test/api/v1/`;
    }

    // Guardar el contenido modificado
    fs.writeFileSync(envPath, envContent, 'utf8');

    console.log(`✅ Archivo .env actualizado correctamente`.green);
  } catch (error) {
    console.error(`❌ Error al actualizar archivo .env: ${error.message}`);
  }
};
