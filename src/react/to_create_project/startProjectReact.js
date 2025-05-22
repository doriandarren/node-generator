import { readInput } from "../../helpers/inquirer.js";






export const startProjectReact = async() => {
    
    // Ruta predeterminada
    const defaultPath = "/Users/dorian/PhpstormProjects81";

    const projectName = await readInput("Nombre del proyecto: ");
    let projectPath = await readInput(`Ruta para crear el proyecto (por defecto: ${defaultPath}): `, true);

    // Si no se introduce una ruta, usar la predeterminada
    if( !projectPath){
        projectPath = defaultPath;
    }
    
    // Combinar la ruta y el nombre del proyecto
    const fullPath = `${projectPath}/${projectName}`;

    // TODO:
    ///await generatePHPCommandLine(fullPath);


}