import { camelToKebab, camelToSnake } from "../../helpers/helperString";
import { generateRoute } from "./generateRoute";



export const generateModuleStandard = async(fullPath, selectedComponents, namespace, nameProject, projectPath, singularName, pluralName, columns) => {
    
    console.log(
        nameProject,
        projectPath,
        singularName,
        pluralName,
        columns
    );


    const singularNameKebab = camelToKebab(singularName); // invoice-header
    const pluralNameKebab = camelToKebab(pluralName);     // invoice-headers
    const singularNameSnake = camelToSnake(singularName)  // invoice_header
    const pluralNameSnake = camelToSnake(pluralName)      // invoice_headers





    //if(selectedComponents.lal === 'Rutas')

    await generateRoute(fullPath, namespace, nameProject, projectPath, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, columns);




}