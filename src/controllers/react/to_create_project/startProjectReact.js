import { readInput } from "../../../helpers/inquirer.js";
import { generateImages } from "./generate_images/generateImages.js";
import { generateComponents } from "./generateComponents.js";
import { generateEnv } from "./generateEnv.js";
import { generateFolderApi } from "./generateFolderApi.js";
import { generateGitingore } from "./generateGitignore.js";
import { generateHelpers } from "./generateHelpers.js";
import { generateIndexHtml } from "./generateIndexHtml.js";
import { generateModuleAuth } from "./generateModuleAuth.js";
import { generateModuleDashboard } from "./generateModuleDashboard.js";
import { generateModuleProfile } from "./generateModuleProfile.js";
import { generateModulePublic } from "./generateModulePublic.js";
import { generateModuleTeams } from "./generateModuleTeams.js";
import { generatePrivateLayout } from "./generatePrivateLayout.js";
import { generatePublicHeader } from "./generatePublicHeader.js";
import { generateReactCommandLine } from "./generateReactCommandLine.js";
import { generateReactRouter } from "./generateReactRouter.js";
import { generateReadme } from "./generateReadme.js";
import { generateRedux } from "./generateRedux.js";
import { generateStyle } from "./generateStyles.js";
import { generateTranslate } from "./generateTranslate.js";



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

    await generateGitingore(fullPath);

    await generateReadme(fullPath);

    // index.html
    await generateIndexHtml(fullPath);

    await generateFolderApi(fullPath);

}