import { convertNameProject, pascalToCamelCase, pascalToKebab, pascalToSnake } from "../../../helpers/helperString.js";
import { generateBarrel } from "./generateBarrel.js";
import { generateCreate } from "./generateCreate.js";
import { generateEdit } from "./generateEdit.js";
import { generateList } from "./generateList.js";
import { generateRoutes } from "./generateRoutes.js";
import { generateService } from "./generateService.js";


export const generateModuleStandardReact = async (
  fullPath,
  selectedComponents,
  namespace = 'api',
  singularName,
  pluralName,
  columns
) => {

  const singularNameKebab = pascalToKebab(singularName); // invoice-header
  const pluralNameKebab = pascalToKebab(pluralName); // invoice-headers
  const singularNameSnake = pascalToSnake(singularName); // invoice_header
  const pluralNameSnake = pascalToSnake(pluralName); // invoice_headers
  const singularNameCamel = pascalToCamelCase(singularName); // invoiceHeader
  const pluralNameCamel = pascalToCamelCase(pluralName); // invoiceHeaders


  const projectName = convertNameProject(fullPath);


  if (selectedComponents.includes("route")) {
    await generateRoutes(fullPath, singularName, pluralNameSnake);
  }

  if (selectedComponents.includes("list")) {
    await generateList(fullPath, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, columns);
  }

  if (selectedComponents.includes("create")) {
    await generateCreate(fullPath, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, columns);
  }

  if (selectedComponents.includes("edit")) {
    await generateEdit(fullPath, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, columns);
  }

  if (selectedComponents.includes("barrel")) {
    await generateBarrel(fullPath, singularName, pluralNameSnake);
  }

  if (selectedComponents.includes("service")) {
    await generateService(fullPath, projectName, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, columns);
  }

};
