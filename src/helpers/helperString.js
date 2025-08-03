import pluralize from 'pluralize';
import path from "path";


/**
 * Convierte CamelCase a kebab-case.
 * @param {string} str
 * @returns {string}
 */
export function pascalToKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}



/**
 * Convierte CamelCase a snake_case.
 * @param {string} str
 * @returns {string}
 */
export function pascalToSnake(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}




/**
 * Convierte PascalCase a camelCase.
 * @param {string} str
 * @returns {string}
 */
export function pascalToCamelCase(str) {
  if (!str) return '';
  return str.charAt(0).toLowerCase() + str.slice(1);
}




/**
 * Convierte un String de SnakeCase a PascalCase
 * @param {*} str 
 * @returns 
 */
export const convertSnakeCaseToPascalCase = (str) => {
  // convertir este nombre de la tabla de BD clientes_estandar a ClienteEstandar.
  if (!str) return '';
  
  return str
    .split('_')                              // ['clientes', 'estandar']
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // ['Clientes', 'Estandar']
    .join('');  
}




/**
 * Convierte un String de SnakeCase a PascalCase en Singular
 * @param {string} str - Texto en snake_case como 'clientes_estandar'
 * @returns {string} - Texto en PascalCase singular como 'ClienteEstandar'
 */
export const convertSnakeCaseToPascalSingularCase = (str) => {
  if (!str) return '';

  const words = str.split('_');
 
  const pascalWords = words.map((word, index) => {
    const singular = pluralize.singular(word); // convierte a singular si está en plural
    return singular.charAt(0).toUpperCase() + singular.slice(1).toLowerCase();
  });

  return pascalWords.join('');
};




/**
 * Convert name project
 * Ex:  /Users/dorian/ReactProjects/app-1 -> app_1
 * Ex:  C:\Users\dorian\ReactProjects\app-1 -> app_1
 */
export const convertNameProject = (fullPath) => {
  // Dividir por "/" o "\" y tomar el último segmento
  const folderName = fullPath.split(/[/\\]/).pop();
  // Limpiar el nombre
  return sanitizeNameWithUnderscore(folderName);
};

/**
 * Sanitize
 * Ex. erp.splytin.com -> erp_splytin_com
 */
export const sanitizeNameWithUnderscore = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9_]/gi, "_") // reemplaza cualquier cosa que no sea letra, número o "_"
    .replace(/_+/g, "_")          // colapsa múltiples "_"
    .replace(/^_+|_+$/g, "");     // elimina "_" al inicio o final
};