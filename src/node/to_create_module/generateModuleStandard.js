import { pascalToCamelCase, pascalToKebab, pascalToSnake } from "../../helpers/helperString.js";
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



export const generateModuleStandard = async(fullPath, selectedComponents, namespace, singularName, pluralName, columns) => {
    

    //console.log(fullPath, selectedComponents, namespace, singularName, pluralName, columns);

    const singularNameKebab = pascalToKebab(singularName);   // invoice-header
    const pluralNameKebab = pascalToKebab(pluralName);       // invoice-headers
    const singularNameSnake = pascalToSnake(singularName)    // invoice_header
    const pluralNameSnake = pascalToSnake(pluralName)        // invoice_headers
    const singularNameCamel = pascalToCamelCase(singularName)       // invoiceHeader
    const pluralNameCamel = pascalToCamelCase(pluralName)           // invoiceHeaders


    //console.log(fullPath);

    // Verificar si el projecto existe


    //console.log(singularNameKebab , pluralNameKebab , singularNameSnake , pluralNameSnake, singularNameCamel, pluralNameCamel);
    


    // routes               ------->>> hecho
    // model                ------->>> hecho
    // controller_list      ------->>> hecho
    // controller_show      ------->>> hecho
    // controller_store     ------->>> hecho
    // controller_update    ------->>> hecho
    // controller_destroy   ------->>> hecho
    // repository           ------->>> hecho
    // migration            ------->>> hecho            
    // seeder               ------->>> hecho
    // factory
    // postman



    //if(selectedComponents.lal === 'Rutas')

    await generateRoute(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);


    await generateModel(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
    
        
    await generateControllerList(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);


    await generateControllerShow(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);


    await generateControllerStore(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
     
    
    await generateControllerUpdate(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
    

    await generateControllerDelete(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
    
    
    await generateRepository(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
    
    await generateMigration(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);
    
    

    await generateSeeder(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCamel, pluralNameCamel, columns);






}