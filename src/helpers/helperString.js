/**
 * Convierte CamelCase a kebab-case.
 * @param {string} str
 * @returns {string}
 */
export function camelToKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}



/**
 * Convierte CamelCase a snake_case.
 * @param {string} str
 * @returns {string}
 */
export function camelToSnake(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}




/**
 * Convierte snake_case a CapitalizedCamelCase.
 * @param {string} str
 * @returns {string}
 */
export function capitalizeCamelCase(str) {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}
