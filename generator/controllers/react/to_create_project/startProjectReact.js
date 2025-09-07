import { readInput } from "../../../helpers/inquirer.js";
import { generateImages } from "./generate_images/generateImages.js";
import { generateComponents } from "./generate_components/generateComponents.js";
import { generateEnv } from "./generateEnv.js";
import { generateFolderApi } from "./generateFolderApi.js";
import { generateGitingore } from "./generateGitignore.js";
import { generateHelpers } from "./generateHelpers.js";
import { generateIndexHtml } from "./generateIndexHtml.js";
import { generateModuleAuth } from "./generateModuleAuth.js";
import { generateModuleDashboard } from "./generateModuleDashboard.js";
import { generateModules } from "./generateModules.js";
import { generateModulePublic } from "./generateModulePublic.js";
import { generatePrivateLayout } from "./generatePrivateLayout.js";
import { generatePublicLayout } from "./generatePublicLayouts.js";
import { generateReactCommandLine } from "./generateReactCommandLine.js";
import { generateReactRouter } from "./generateReactRouter.js";
import { generateReadme } from "./generateReadme.js";
import { generateRedux } from "./generateRedux.js";
import { generateStyle } from "./generateStyles.js";
import { generateHelperAllowedPaths } from "./role_permission/generateHelperAllowedPaths.js";
import { generateHelperBuildAccessibleNav } from "./role_permission/generateHelperBuildAccessibleNav.js";
import { generateHelperRoleMenuAccess } from "./role_permission/generateHelperRoleMenuAccess.js";
import { generateTranslate } from "./generate_translates/generateTranslate.js";



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



    await generatePrivateLayout(fullPath);
    await generatePublicLayout(fullPath);

    // generate Public
    await generateModulePublic(fullPath);

    // React Router
    await generateReactRouter(fullPath);

    await generateComponents(fullPath);

    
    // Auth
    await generateModuleAuth(fullPath);

    // Dashboard
    await generateModuleDashboard(fullPath);


    await generateModules(fullPath);


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


    
    // Roles and Permission
    await generateHelperAllowedPaths(fullPath);
    await generateHelperBuildAccessibleNav(fullPath);
    await generateHelperRoleMenuAccess(fullPath);


}