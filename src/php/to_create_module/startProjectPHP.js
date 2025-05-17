import { readInput } from "../../helpers/inquirer.js";
import { generateFpdfMerge } from "../to_create_project/generateFpdfMerge.js";
import { generatePHPCommandLine } from "../to_create_project/generatePHPCommandLine.js";
import { generateSnappy } from "../to_create_project/generateSnappy.js";



export const startProjectPHP = async() => {
    
    // Ruta predeterminada
        const defaultPath = "/Users/dorian/PhpstormProjects81";
    
        const projectName = await readInput("Nombre del proyecto Node: ");
        let projectPath = await readInput(`Ruta para crear el proyecto (por defecto: ${defaultPath}): `, true);
    
        // Si no se introduce una ruta, usar la predeterminada
        if( !projectPath){
            projectPath = defaultPath;
        }
        
    
        // Combinar la ruta y el nombre del proyecto
        const fullPath = `${projectPath}/${projectName}`;



        await generatePHPCommandLine(fullPath);
        await generateSnappy(fullPath);
        await generateFpdfMerge(fullPath);

        

}




