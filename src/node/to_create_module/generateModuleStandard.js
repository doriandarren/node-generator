import { pascalToCamelCase, pascalToKebab, pascalToSnake } from "../../helpers/helperString.js";
import { generateRoute } from "./generateRoute.js";



export const generateModuleStandard = async(fullPath, selectedComponents, namespace, singularName, pluralName, columns) => {
    

    //console.log(fullPath, selectedComponents, namespace, singularName, pluralName, columns);


    const singularNameKebab = pascalToKebab(singularName);   // invoice-header
    const pluralNameKebab = pascalToKebab(pluralName);       // invoice-headers
    const singularNameSnake = pascalToSnake(singularName)    // invoice_header
    const pluralNameSnake = pascalToSnake(pluralName)        // invoice_headers
    const singularNameCamel = pascalToCamelCase(singularName)       // invoiceHeader
    const pluralNameCamel = pascalToCamelCase(pluralName)           // invoiceHeaders


    //console.log(fullPath);

    // Verificar si el projecto existe


    //console.log(singularNameKebab , pluralNameKebab , singularNameSnake , pluralNameSnake, singularNameCamel, pluralNameCamel);
    


    //if(selectedComponents.lal === 'Rutas')

    await generateRoute(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);




}