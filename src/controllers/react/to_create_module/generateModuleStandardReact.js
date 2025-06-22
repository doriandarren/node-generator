import { camelToKebab, camelToSnake,lowercaseFirstLetter } from '../../../helpers/stringHelpers.js';

export const generateModuleStandardReact = async (
  projectPath,
  selectedComponents,
  namespace,
  singularName,
  pluralName,
  columns
) => {

  const singularNameKebab = camelToKebab(singularName);
  const pluralNameKebab = camelToKebab(pluralName);
  const singularNameSnake = camelToSnake(singularName);
  const pluralNameSnake = camelToSnake(pluralName);
  const singularFirstCamel = lowercaseFirstLetter(singularName);



  if (selectedComponents.includes("route")) {
    await createRoutes(projectPath, singularName, pluralNameSnake);
  }

  if (selectedComponents.includes("controller_list") || selectedComponents.includes("list")) {
    await createListPage(projectPath, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularFirstCamel, columns);
  }

  if (selectedComponents.includes("controller_store") || selectedComponents.includes("create")) {
    await createCreatePage(projectPath, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularFirstCamel, columns);
  }

  if (selectedComponents.includes("controller_update") || selectedComponents.includes("edit")) {
    await createEditPage(projectPath, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularFirstCamel, columns);
  }

  if (selectedComponents.includes("barrel")) {
    await createBarrelFile(projectPath, singularName, pluralNameSnake);
  }

  if (selectedComponents.includes("service")) {
    await createServiceFile(projectPath, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularFirstCamel, columns);
  }

};
