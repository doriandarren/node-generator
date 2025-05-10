import { camelToKebab, camelToSnake } from "../../helpers/helperString";
import { generateRoute } from "./generateRoute";



export const generateModuleStandard = async(selectedComponents, singularName, pluralName, columns, projectPath) => {
    
    console.log(
        nameProject,
        projectPath,
        singularName,
        pluralName,
        columns
    );


    singularNameKebab = camelToKebab(singularName); // invoice-header
    pluralNameKebab = camelToKebab(pluralName);     // invoice-headers
    singularNameSnake = camelToSnake(singularName)  // invoice_header
    pluralNameSnake = camelToSnake(pluralName)      // invoice_headers





    //if(selectedComponents.lal === 'Rutas')

    await generateRoute(nameProject, projectPath, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, columns);






}