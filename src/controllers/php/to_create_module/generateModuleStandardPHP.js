import { pascalToCamelCase, pascalToKebab, pascalToSnake } from "../../../helpers/helperString.js";
import { generateControllerDestroyPHP } from "./generateControllerDeletePHP.js";
import { generateControllerListPHP } from "./generateControllerListPHP.js";
import { generateControllerShowPHP } from "./generateControllerShowPHP.js";
import { generateControllerStorePHP } from "./generateControllerStorePHP.js";
import { generateControllerUpdatePHP } from "./generateControllerUpdatePHP.js";
import { generateFactoryPHP } from "./generateFactoryPHP.js";
import { generateMigrationPHP } from "./generateMigrationPHP.js";
import { generateModelPHP } from "./generateModelPHP.js";
import { generatePostmanPHP } from "./generatePostmanPHP.js";
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


  if(selectedComponents.includes('model')){
    await generateModelPHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
  }

  if(selectedComponents.includes('route')){
    await generateRoutesPHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
  }
  
  if(selectedComponents.includes('controller_list')){
    await generateControllerListPHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
  }
  
  if(selectedComponents.includes('controller_show')){
    await generateControllerShowPHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
  }

  if(selectedComponents.includes('controller_store')){
    await generateControllerStorePHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);

  }
  
  if(selectedComponents.includes('controller_update')){
    await generateControllerUpdatePHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
  }

  if(selectedComponents.includes('controller_destroy')){
    await generateControllerDestroyPHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
  }
  
  if(selectedComponents.includes('repository')){
    await generateRepositoryPHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
  }

  if(selectedComponents.includes('migration')){
    await generateMigrationPHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
  }
  
  if(selectedComponents.includes('seeder')){
    await generateSeederPHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
  }

  if(selectedComponents.includes('factory')){
    await generateFactoryPHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
  }
  
  if(selectedComponents.includes('postman')){
    await generatePostmanPHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
  }

};
