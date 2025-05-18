import { readInput } from "../../helpers/inquirer.js";
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
import { updateModelUser } from "./updates/updateModelUser.js";
import { updateAppPhp } from "./updates/updateAppPhp.js";
import { updateReadme } from "./updates/updateReadme.js";
import { generateExecuteController } from "./dev/generateExecuteController.js";
import { generateTestController } from "./dev/generateTestController.js";
import { generateRouteTest } from "./dev/generateRouteTest.js";
import { updateGitignore } from "./updates/updateGitignore.js";
import { generateCompanyLogos } from "./generateCompanyLogos.js";
import { updateWelcomeBlade } from "./updates/updateWelcomeBlade.js";
import { updateRouteApiPhp } from "./updates/updateRouteApiPhp.js";







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
    await generateMaatwebsiteExcel(fullPath);
    await generateEnums(fullPath);
    await generateBatchProcesses(fullPath);
    await generateBaseController(fullPath);
    await generateModuleAuth(fullPath);


    await generateShared(fullPath);  // TODO   --------......--------




    await generateUtilities(fullPath);

    // Updates
    await updateModelUser(fullPath);
    await updateAppPhp(fullPath);
    await updateModelUser(fullPath);
    await updateReadme(fullPath);
    await updateGitignore(fullPath);



    // Dev
    await generateExecuteController(fullPath);
    await generateTestController(fullPath);
    await generateRouteTest(fullPath);

    await generateCompanyLogos(fullPath);

    await updateWelcomeBlade(fullPath);

    await updateRouteApiPhp(fullPath);
    


}
