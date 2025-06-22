import { pascalToCamelCase, pascalToKebab, pascalToSnake } from "../../../helpers/helperString.js";


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
    await createRoutes(projectPath, singularName, pluralNameSnake);
  }

  // if (selectedComponents.includes("list") || selectedComponents.includes("list")) {
  //   await createListPage(projectPath, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularFirstCamel, columns);
  // }

  // if (selectedComponents.includes("create") || selectedComponents.includes("create")) {
  //   await createCreatePage(projectPath, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularFirstCamel, columns);
  // }

  // if (selectedComponents.includes("edit") || selectedComponents.includes("edit")) {
  //   await createEditPage(projectPath, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularFirstCamel, columns);
  // }

  // if (selectedComponents.includes("barrel")) {
  //   await createBarrelFile(projectPath, singularName, pluralNameSnake);
  // }

  // if (selectedComponents.includes("service")) {
  //   await createServiceFile(projectPath, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularFirstCamel, columns);
  // }

};
