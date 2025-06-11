import fs from 'fs';
import path from 'path';

export const updateAppPhp = async (fullPath) => {
  const appPhpPath = path.join(fullPath, 'config', 'app.php');

  // Verificar si el archivo existe
  if (!fs.existsSync(appPhpPath)) {
    console.log(`❌ Error: ${appPhpPath} no existe.`.cyan);
    return;
  }

  try {
    // Leer contenido
    let content = fs.readFileSync(appPhpPath, 'utf-8');

    // Reemplazo del timezone
    content = content.replace(
      `'timezone' => 'UTC',`,
      `'timezone' => 'Europe/Madrid',`
    );

    // Guardar archivo actualizado
    fs.writeFileSync(appPhpPath, content, 'utf-8');

    console.log('✅ app.php actualizado correctamente.'.green);
  } catch (error) {
    console.error(`❌ Error al actualizar ${appPhpPath}: ${error.message}`.cyan);
  }
};
