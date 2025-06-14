import { readInput } from "../../../helpers/inquirer.js";
import { generateImages } from "./generate_images/generateImages.js";
import { generatePublicHeader } from "./generatePublicHeader.js";
import { generateReactCommandLine } from "./generateReactCommandLine.js";
import { generateStyle } from "./generateStyles.js";



export const startProjectReact = async() => {
    
    // Ruta predeterminada
    const defaultPath = "/Users/dorian/ReactProjects";

    const projectName = await readInput("Nombre del proyecto: ");
    let projectPath = await readInput(`Ruta para crear el proyecto (por defecto: ${defaultPath}): `, true);

    // Si no se introduce una ruta, usar la predeterminada
    if( !projectPath){
        projectPath = defaultPath;
    }
    
    // Combinar la ruta y el nombre del proyecto
    const fullPath = `${projectPath}/${projectName}`;

    
    await generateReactCommandLine(fullPath);
    await generateStyle(fullPath);
    await generateImages(fullPath);


    // 
    await generatePublicHeader(fullPath);



}