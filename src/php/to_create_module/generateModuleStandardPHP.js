import { generateControllerDestroyPHP } from "./generateControllerDeletePHP.js";
import { generateControllerShowPHP } from "./generateControllerShowPHP.js";
import { generateControllerStorePHP } from "./generateControllerStorePHP.js";
import { generateControllerUpdatePHP } from "./generateControllerUpdatePHP.js";
import { generateModelPHP } from "./generateModelPHP.js";
import { generateRepositoryPHP } from "./generateRepositoryPHP.js";


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


    await generateControllerListPH(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);


    await generateControllerShowPHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);


    await generateControllerStorePHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);



    await generateControllerUpdatePHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);



    await generateControllerDestroyPHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);



    await generateRepositoryPHP(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);


    

};
