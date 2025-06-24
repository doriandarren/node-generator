import { readInput } from "../../../helpers/inquirer.js";
import { generateImages } from "./generate_images/generateImages.js";
import { generateComponents } from "./generateComponents.js";
import { generateModuleAuth } from "./generateModuleAuth.js";
import { generateModuleDashboard } from "./generateModuleDashboard.js";
import { generateModulePublic } from "./generateModulePublic.js";
import { generatePrivateLayout } from "./generatePrivateLayout.js";
import { generatePublicHeader } from "./generatePublicHeader.js";
import { generateReactCommandLine } from "./generateReactCommandLine.js";
import { generateReactRouter } from "./generateReactRouter.js";
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

    //
    await generateReactCommandLine(fullPath);
    await generateStyle(fullPath);
    await generateImages(fullPath);



    await generatePublicHeader(fullPath);
    await generatePrivateLayout(fullPath);

    // generate Public
    await generateModulePublic(fullPath);

    // React Router
    await generateReactRouter(fullPath);

    await generateComponents(fullPath);


    // Dashboard
    await generateModuleDashboard(fullPath);

    // Auth
    await generateModuleAuth(fullPath);





    //TODO quedamos aqui


    // Profile
    await generateModuleProfile(fullPath);

    // Teams
    await generateModuleTeams(fullPath);

    // Redux
    await generateRedux(fullPath);

    // Helpers
    await generateHelpers(fullPath);

    // Translate
    await generateTranslate(fullPath);

    await generateEnv(fullPath);

    await generateGitignore(fullPath);

    await generateReadme(fullPath);

    // index.html
    await generateIndexHtml(fullPath);

    await generateFolderApi(fullPath);



}