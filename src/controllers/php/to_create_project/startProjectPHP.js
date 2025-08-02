import { readInput } from "../../../helpers/inquirer.js";
import { generateBaseController } from "./generateBaseController.js";
import { generateBatchProcesses } from "./generateBatchProcesses.js";
import { generateEnums } from "./generateEnums.js";
import { generateFpdfMerge } from "./generateFpdfMerge.js";
import { generateMaatwebsiteExcel } from "./generateMaatwebsiteExcel.js";
import { generateModuleAuth } from "./generateModuleAuth.js";
import { generatePHPCommandLine } from "./generatePHPCommandLine.js";
import { generateSnappy } from "./generateSnappy.js";
import { generateShared } from "./shared/generateShared.js";
import { generateUtilities } from "./utilities/generateUtilities.js";
import { generateExecuteController } from "./dev/generateExecuteController.js";
import { generateTestController } from "./dev/generateTestController.js";
import { generateRouteTest } from "./dev/generateRouteTest.js";
import { generateCompanyLogos } from "./generateCompanyLogos.js";
import { generatePostman } from "./generatePostman.js";
import { updateAppPhp } from "./updates/updateAppPhp.js";
import { updateReadme } from "./updates/updateReadme.js";
import { updateGitignore } from "./updates/updateGitignore.js";
import { updateWelcomeBlade } from "./updates/updateWelcomeBlade.js";
import { updateRouteApiPhp } from "./updates/updateRouteApiPhp.js";
import { updateUserMigration } from "./updates/updateUserMigration.js";
import { updateModelUser } from "./updates/updateModelUser.js";
import { updateBootstrapAppPhp } from "./updates/updateBootstrapAppPhp.js";
import { generateEndppints } from "./endpoints/generateEndpoints.js";
import { updateEnv } from "./updates/updateEnv.js";







export const startProjectPHP = async() => {
    
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

    
    await generatePHPCommandLine(fullPath);
    await generateSnappy(fullPath);
    await generateFpdfMerge(fullPath);
    await generateMaatwebsiteExcel(fullPath);
    await generateEnums(fullPath);
    await generateBatchProcesses(fullPath);
    await generateBaseController(fullPath);
    await generateModuleAuth(fullPath);


    //Shared Module
    await generateShared(fullPath);
    

    await generateUtilities(fullPath);

   
    // Dev
    await generateExecuteController(fullPath);
    await generateTestController(fullPath);
    await generateRouteTest(fullPath);

    await generateEndppints(fullPath);
    await generateCompanyLogos(fullPath);
    await generatePostman(fullPath);



     // Updates
    await updateModelUser(fullPath);
    await updateAppPhp(fullPath);
    await updateReadme(fullPath, projectName);
    await updateGitignore(fullPath);
    await updateWelcomeBlade(fullPath);
    await updateRouteApiPhp(fullPath);
    await updateUserMigration(fullPath);
    await updateBootstrapAppPhp(fullPath);
    await updateEnv(fullPath);

}
