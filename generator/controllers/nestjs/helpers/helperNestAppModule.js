import fs from "fs";
import { printMessage } from "../../../helpers/inquirer.js";

/**
 * Añade una línea de import si no existe.
 * - La inserta al FINAL del bloque de imports de la cabecera (antes de @Module).
 * - Si no hay imports, la coloca al principio del archivo (línea 0).
 */
export function addHeaderLine(filePath, importLine) {
  try {
    if (!fs.existsSync(filePath)) {
      printMessage(`❌ No se encontró el archivo: ${filePath}`, "red");
      return false;
    }

    let content = fs.readFileSync(filePath, "utf8");

    // Si ya existe exactamente, no hacemos nada
    if (content.includes(importLine)) {
      printMessage("ℹ️ La línea de import ya existe; sin cambios.", "gray");
      return true;
    }

    const lines = content.split("\n");

    // 1) Encontrar el bloque de imports "superior"
    //    Recorremos desde el inicio hasta encontrar la primera línea que NO sea:
    //    - línea en blanco
    //    - comentario
    //    - o "import ..."
    let lastImportIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      const t = lines[i].trim();
      const isBlank = t === "";
      const isComment = t.startsWith("//") || t.startsWith("/*") || t.startsWith("*");
      const isImport = t.startsWith("import ");

      if (isBlank || isComment || isImport) {
        if (isImport) lastImportIdx = i;
        continue;
      }
      // Primera línea "real" de código → ya pasó el bloque de imports
      break;
    }

    if (lastImportIdx === -1) {
      // No había imports → insertar al principio (línea 0) y dejar un salto
      lines.splice(0, 0, importLine, "");
    } else {
      // Insertar justo después del último import
      lines.splice(lastImportIdx + 1, 0, importLine);
    }

    fs.writeFileSync(filePath, lines.join("\n"), "utf8");
    printMessage(`✅ Import añadido en cabecera: ${importLine}`, "green");
    return true;
  } catch (err) {
    printMessage(`❌ Error al escribir en ${filePath}: ${err.message}`, "red");
    return false;
  }
}

/**
 * Inserta "importLine" dentro del array imports:[...] del decorador @Module.
 * - Si no hay imports: crea el array.
 * - Evita duplicados (comparación normalizada sin espacios).
 * - No genera comas inválidas (nada de "[," ni dobles comas).
 */
export function addModuleLine(filePath, importLine) {
  try {
    if (!fs.existsSync(filePath)) {
      printMessage(`❌ No se encontró el archivo: ${filePath}`, "red");
      return false;
    }

    let content = fs.readFileSync(filePath, "utf8");

    const moduleRe = /@Module\s*\(\s*\{([\s\S]*?)\}\s*\)\s*export\s+class\s+\w+/m;
    const m = content.match(moduleRe);
    if (!m) {
      printMessage("❌ No se encontró el decorador @Module en el archivo.", "red");
      return false;
    }

    const fullDecorator = m[0];
    const inside = m[1];

    const importsRe = /imports\s*:\s*\[([\s\S]*?)\]/m;
    const mi = inside.match(importsRe);

    const normalize = (s) => s.replace(/\s+/g, "");
    const wantNorm = normalize(importLine);

    let newInside;

    if (mi) {
      // Ya existe imports:[...]
      const inner = mi[1]; // contenido dentro de los corchetes
      // ¿Ya está el bloque (ignorando espacios)?
      if (normalize(inner).includes(wantNorm)) {
        printMessage("ℹ️ La línea ya existe dentro de imports: [...]", "gray");
        return true;
      }

      // Limpieza: recorta extremos, evita leading/trailing comas raras
      let trimmed = inner.trim();

      // Caso array vacío
      if (trimmed === "") {
        newInside = inside.replace(importsRe, `imports: [\n    ${importLine}\n  ]`);
      } else {
        // Asegurar que el bloque actual termina en coma única
        trimmed = trimmed.replace(/\s*,\s*$/g, ""); // quita comas de cierre repetidas
        const newBlock = `${trimmed},\n    ${importLine}`;
        newInside = inside.replace(importsRe, `imports: [\n    ${newBlock}\n  ]`);
      }
    } else {
      // No hay imports → crearlo al comienzo del objeto
      newInside = `imports: [\n    ${importLine}\n  ],\n${inside}`;
    }

    const newDecorator = fullDecorator.replace(inside, newInside);
    content = content.replace(fullDecorator, newDecorator);

    fs.writeFileSync(filePath, content, "utf8");
    printMessage(`✅ Línea añadida dentro de imports: ${importLine}`, "green");
    return true;
  } catch (err) {
    printMessage(`❌ Error al modificar imports en ${filePath}: ${err.message}`, "red");
    return false;
  }
}
