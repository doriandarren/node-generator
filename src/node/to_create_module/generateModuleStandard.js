import { generateRoute } from "./generateRoute";



const generateModuleStandard = async(selectedComponents, singularName, pluralName, columns, projectPath) => {
    
    console.log(
        nameProject,
        projectPath,
        singularName,
        pluralName,
        columns
    );


    //if(selectedComponents.lal === 'Rutas')

    await generateRoute(nameProject, projectPath, singularName, pluralName, columns);






}