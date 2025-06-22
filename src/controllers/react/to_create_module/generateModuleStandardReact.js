import { pascalToCamelCase, pascalToKebab, pascalToSnake } from "../../../helpers/helperString.js";
import { generateBarrel } from "./generateBarrel.js";
import { generateEdit } from "./generateEdit.js";
import { generateService } from "./generateService.js";


export const generateModuleStandardReact = async (
  projectPath,
  selectedComponents,
  namespace,
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




  if (selectedComponents.includes("route")) {
    await generateRoutes(projectPath, singularName, pluralNameSnake);
  }

  if (selectedComponents.includes("list") || selectedComponents.includes("list")) {
    await generateList(projectPath, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularFirstCamel, columns);
  }

  if (selectedComponents.includes("create") || selectedComponents.includes("create")) {
    await generateCreate(projectPath, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularFirstCamel, columns);
  }

  if (selectedComponents.includes("edit") || selectedComponents.includes("edit")) {
    await generateEdit(projectPath, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularFirstCamel, columns);
  }

  if (selectedComponents.includes("barrel")) {
    await generateBarrel(projectPath, singularName, pluralNameSnake);
  }

  if (selectedComponents.includes("service")) {
    await generateService(projectPath, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularFirstCamel, columns);
  }

};
