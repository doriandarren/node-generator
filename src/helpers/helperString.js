import pluralize from 'pluralize';

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