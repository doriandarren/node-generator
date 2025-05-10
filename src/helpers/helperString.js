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
