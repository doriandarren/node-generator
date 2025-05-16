import { pause } from "../../helpers/inquirer";


export const startProjectPHP = async() => {
    
    // Ruta predeterminada
        const defaultPath = "/Users/dorian/NodejsProjects";
    
        const projectName = await readInput("Nombre del proyecto Node: ");
        let projectPath = await readInput(`Ruta para crear el proyecto (por defecto: ${defaultPath}): `, true);
    
        // Si no se introduce una ruta, usar la predeterminada
        if( !projectPath){
            projectPath = defaultPath;
        }
            
    
        // Combinar la ruta y el nombre del proyecto
        const fullPath = `${projectPath}/${projectName}`;



        console.log(fullPath);


        await pause();

}