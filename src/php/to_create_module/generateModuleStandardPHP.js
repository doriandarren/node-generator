import { pascalToCamelCase, pascalToKebab, pascalToSnake } from "../../helpers/helperString.js";
import { generateControllerDestroyPHP } from "./generateControllerDeletePHP.js";
import { generateControllerListPHP } from "./generateControllerListPHP.js";
import { generateControllerShowPHP } from "./generateControllerShowPHP.js";
import { generateControllerStorePHP } from "./generateControllerStorePHP.js";
import { generateControllerUpdatePHP } from "./generateControllerUpdatePHP.js";
import { generateFactoryPHP } from "./generateFactoryPHP.js";
import { generateModelPHP } from "./generateModelPHP.js";
import { generateRepositoryPHP } from "./generateRepositoryPHP.js";
import { generateRoutesPHP } from "./generateRoutesPHP.js";
import { generateSeederPHP } from "./generateSeederPHP.js";


export const generateModuleStandardPHP = async (
  fullPath,
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



  //if(selectedComponents.includes('model')){
    await generateModelPHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
  //}


    await generateControllerListPHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);


    await generateControllerShowPHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);


    await generateControllerStorePHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);


    await generateControllerUpdatePHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);


    await generateControllerDestroyPHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);


    await generateRepositoryPHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);


    await generateRoutesPHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);


    await generateMigrationPHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);


    await generateSeederPHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);


    await generateFactoryPHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);


     await generatePostmanPHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);



};
