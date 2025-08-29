import { convertNameProject, pascalToCamelCase, pascalToKebab, pascalToSnake } from "../../../helpers/helperString.js";
import { generateSingleBarrel } from "./generateSingleBarrel.js";
import { generateSinglePage } from "./generateSinglePage.js";
import { generateSingleRoutes } from "./generateSingleRoutes.js";
import { generateSingleService } from "./generateSingleService.js";


export const generateModuleSingleReact = async (
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
    await generateSingleRoutes(fullPath, singularName, pluralNameSnake);
  }


  if (selectedComponents.includes("single_page")) {
    await generateSinglePage(
      fullPath, 
      singularName, 
      pluralName, 
      singularNameKebab, 
      pluralNameKebab, 
      singularNameSnake, 
      pluralNameSnake, 
      singularNameCamel, 
      pluralNameCamel,
      columns
    );
  }

 

  if (selectedComponents.includes("barrel")) {
    await generateSingleBarrel(fullPath, singularName, pluralNameSnake);
  }

  if (selectedComponents.includes("service")) {
    await generateSingleService(fullPath, projectName, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, columns);
  }

};
