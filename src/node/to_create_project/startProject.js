import { readInput } from "../../helpers/inquirer.js";
import { generateCommandLine } from "./generateCommandLine.js";
import { generateReadme } from "./generateReadme.js";
import { generateEnv } from "./generateEnv.js";
import { generateGitignore } from "./generateGitignore.js";
import { generateServer } from "./generateServer.js";
import { generateScripts } from "./generateScripts.js";
import { generateRoutes } from "./generateRoutes.js";
import { generateMulter } from "./generateMulter.js";



export const startProject = async() => {
    
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


    await generateCommandLine(fullPath, projectName);
    await generateReadme(fullPath);



    await generateEnv(fullPath);
    await generateGitignore(fullPath);
    await generateServer(fullPath);
    await generateScripts(fullPath);


    await generateRoutes(fullPath);


    await generateMulter(fullPath);

    

}