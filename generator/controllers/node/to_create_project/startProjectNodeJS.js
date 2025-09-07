import { pause, readInput } from "../../../helpers/inquirer.js";
import { generateCommandLine } from "./generateCommandLine.js";
import { generateReadme } from "./generateReadme.js";
import { generateEnv } from "./generateEnv.js";
import { generateGitignore } from "./generateGitignore.js";
import { generateServer } from "./generateServer.js";
import { generateScripts } from "./generateScripts.js";
import { generateRoutes } from "./generateRoutes.js";
import { generateApp } from "./generateApp.js";
import { generateRepositories } from "./generateRepositories.js";
import { generateMiddlewares } from "./generateMiddlewares.js";
import { generateMulter } from "./generateMulter.js";
import { generateHelpers } from "./generateHelpers.js";
import { generateEnums } from "./generateEnums.js";
import { generateDatabase } from "./generateDatabase.js";
import { generateControllerAuth } from "./generateControllerAuth.js";
import { generateControllerUsers } from "./generateControllerUsers.js";
import { generateShared } from "./shared/generateShared.js";
import { generateDev } from "./generateDev.js";
import { generateIndexHTML } from "./genarateIndexHTML.js";
import { generatePostman } from "./generatePostman.js";
import { updateSeeders } from "./updateSeeders.js";




export const startProjectNodeJS = async() => {
    
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
    await generateApp(fullPath);
    await generateEnv(fullPath, projectName);
    await generateGitignore(fullPath);
    await generateServer(fullPath);
    await generateScripts(fullPath);


    await generateRoutes(fullPath);
    await generateRepositories(fullPath);
    await generateMiddlewares(fullPath);
    await generateMulter(fullPath);
    await generateHelpers(fullPath);
    await generateEnums(fullPath);
    await generateDatabase(fullPath);

    
    await generateControllerAuth(fullPath);
    await generateControllerUsers(fullPath);

    await generateDev(fullPath);

    await generateShared(fullPath);

    await generateIndexHTML(fullPath);

    await generatePostman(fullPath);


    await updateSeeders(fullPath);

    

    await pause();

}