import fs from 'fs';
import path from 'path';



export const updateRouteApiPhp = async(fullPath) => {
    
    updateUse(fullPath);
    updateRoute(fullPath);

}




const updateUse = async (fullPath) => {
  const apiPhpPath = path.join(fullPath, 'routes', 'api.php');

  // Verificar si el archivo existe
  if (!fs.existsSync(apiPhpPath)) {
    console.log(`❌ Error: ${apiPhpPath} no existe.`.cyan);
    return;
  }

  try {
    // Leer el contenido del archivo
    let content = fs.readFileSync(apiPhpPath, 'utf-8');

    // Reemplazo del encabezado <?php por el bloque con use
    content = content.replace(
      `<?php\n`,
      `<?php\n\nuse App\\Enums\\EnumApiSetup;`
    );

    // Guardar el contenido actualizado
    fs.writeFileSync(apiPhpPath, content, 'utf-8');

    console.log('✅ use api.php correctamente.'.green);
  } catch (error) {
    console.error(`❌ Error al actualizar ${apiPhpPath}: ${error.message}`.cyan);
  }
}







const updateRoute = async (fullPath) => {
  const filePath = path.join(fullPath, 'routes', 'api.php');

  // Verificar si el archivo existe
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Error: ${filePath} no existe.`.cyan);
    return;
  }

  const blockToAdd = `

Route::prefix(EnumApiSetup::API_VERSION )->group(function () {
    // Auth
    require base_path('routes/API/auth.php');
    
    // Shared
    require base_path('routes/SHARED/abilities.php');
    require base_path('routes/SHARED/ability_groups.php');
    require base_path('routes/SHARED/ability_users.php');
    require base_path('routes/SHARED/countries.php');
    require base_path('routes/SHARED/dev.php');
    require base_path('routes/SHARED/role_users.php');
    require base_path('routes/SHARED/roles.php');
    require base_path('routes/SHARED/user_statuses.php');
    
    // API
    // ...
});`;

  const linesToAdd = blockToAdd.split('\n');

  try {
    let existingLines = fs.readFileSync(filePath, 'utf-8').split('\n');

    // Eliminar líneas en blanco al final
    while (existingLines.length && existingLines[existingLines.length - 1].trim() === '') {
      existingLines.pop();
    }

    const newLines = [];

    for (const line of linesToAdd) {
      if (line.trim() === '' || !existingLines.includes(line)) {
        newLines.push(line);
      }
    }

    if (newLines.length > 0) {
      const updatedContent = [...existingLines, ...newLines].join('\n') + '\n';
      fs.writeFileSync(filePath, updatedContent, 'utf-8');
      console.log(`✅ Actualizado el archivo api.php`.green);
    } else {
      console.log(`ℹ️  No hay nuevas líneas que agregar`.cyan);
    }
  } catch (error) {
    console.error(`❌ Error al actualizar ${filePath}: ${error.message}`.cyan);
  }
}

