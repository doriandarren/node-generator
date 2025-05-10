import { camelCase, camelToKebab, camelToSnake } from "../../helpers/helperString.js";
import { generateRoute } from "./generateRoute.js";



export const generateModuleStandard = async(fullPath, selectedComponents, namespace, singularName, pluralName, columns) => {
    

    console.log(fullPath, selectedComponents, namespace, singularName, pluralName, columns);


    const singularNameKebab = camelToKebab(singularName);   // invoice-header
    const pluralNameKebab = camelToKebab(pluralName);       // invoice-headers
    const singularNameSnake = camelToSnake(singularName)    // invoice_header
    const pluralNameSnake = camelToSnake(pluralName)        // invoice_headers
    const singularNameCamel = camelCase(singularName)       // invoiceHeader
    const pluralNameCamel = camelCase(pluralName)           // invoiceHeaders


    console.log(fullPath);

    

    //if(selectedComponents.lal === 'Rutas')

    await generateRoute(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);




}