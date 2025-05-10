import { generateRoute } from "./generateRoute";



const generateModuleStandard = async(selectedComponents, singularName, pluralName, columns, projectPath) => {
    
    console.log(
        nameProject,
        projectPath,
        singularName,
        pluralName,
        columns
    );


    singular_name_kebab = camel_to_kebab(singularName); // invoice-header
    plural_name_kebab = camel_to_kebab(pluralName);     // invoice-headers
    singular_name_snake = camel_to_snake(singularName)  // invoice_header
    plural_name_snake = camel_to_snake(pluralName)      // invoice_headers









    //if(selectedComponents.lal === 'Rutas')

    await generateRoute(nameProject, projectPath, singularName, pluralName, columns);






}