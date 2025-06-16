import { pascalToCamelCase, pascalToKebab, pascalToSnake } from "../../../helpers/helperString.js";
import { generateControllerList } from "./generateControllerList.js";
import { generateControllerShow } from "./generateControllerShow.js";
import { generateControllerStore } from "./generateControllerStore.js";
import { generateControllerUpdate } from "./generateControllerUpdate.js";
import { generateControllerDelete } from "./generateControllerDelete.js";
import { generateModel } from "./generateModel.js";
import { generateRoute } from "./generateRoute.js";
import { generateRepository } from "./generateRepository.js";
import { generateMigration } from "./generateMigration.js";
import { generateSeeder } from "./generateSeeder.js";
import { generatePostman } from "./generatePostman.js";
import { pause } from "../../../helpers/inquirer.js";



export const generateModuleStandardNodeJS = async(fullPath, selectedComponents, namespace, singularName, pluralName, columns) => {
    
    const singularNameKebab = pascalToKebab(singularName);   // invoice-header
    const pluralNameKebab = pascalToKebab(pluralName);       // invoice-headers
    const singularNameSnake = pascalToSnake(singularName)    // invoice_header
    const pluralNameSnake = pascalToSnake(pluralName)        // invoice_headers
    const singularNameCamel = pascalToCamelCase(singularName)       // invoiceHeader
    const pluralNameCamel = pascalToCamelCase(pluralName)           // invoiceHeaders


    if(selectedComponents.includes('model')){
        await generateModel(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
    }


    if(selectedComponents.includes('route')){
        await generateRoute(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
    }
    
    if(selectedComponents.includes('controller_list')){
        await generateControllerList(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
    }
    
    if(selectedComponents.includes('controller_show')){
        await generateControllerShow(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
    }

    if(selectedComponents.includes('controller_store')){
        await generateControllerStore(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
    }
    
    if(selectedComponents.includes('controller_update')){
        await generateControllerUpdate(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
    }

    if(selectedComponents.includes('controller_destroy')){
        await generateControllerDelete(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
    }
    
    if(selectedComponents.includes('repository')){
        await generateRepository(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
    }

    if(selectedComponents.includes('migration')){
        await generateMigration(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
    }
    
    if(selectedComponents.includes('seeder')){
        await generateSeeder(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
    }
    
    if(selectedComponents.includes('postman')){
        await generatePostman(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
    }


}