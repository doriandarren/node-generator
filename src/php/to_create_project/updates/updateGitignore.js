import fs from 'fs';
import path from 'path';



export const updateGitignore = async (fullPath) => {
  const gitignorePath = path.join(fullPath, '.gitignore');

  // Verificar si el archivo existe
  if (!fs.existsSync(gitignorePath)) {
    console.log(`❌ Error: ${gitignorePath} no existe.`.cyan);
    return;
  }

  // Bloque de líneas a añadir
  const blockToAdd = `.DS_Store
app/Http/Controllers/Dev/TestController.php`;

  const linesToAdd = blockToAdd.split('\n');

  try {
    // Leer contenido actual
    let existingLines = fs.readFileSync(gitignorePath, 'utf-8').split('\n');

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
      fs.writeFileSync(gitignorePath, updatedContent, 'utf-8');
      console.log('✅ .gitignore actualizado correctamente.'.green);
    } else {
      console.log('ℹ️  No hay nuevas líneas que agregar.'.cyan);
    }
  } catch (error) {
    console.error(`❌ Error al actualizar ${gitignorePath}: ${error.message}`.cyan);
  }
};
