import fs from "fs";
import path from "path";
import { createFolder, runExec } from "../../../helpers/helperFile.js";
import { printMessage } from "../../../helpers/inquirer.js";
import { pascalToKebab } from "../../../helpers/helperString.js";
import { generateModuleStandardNestJS } from "../to_create_module_crud/generateModuleStandardNestJS.js";


export const generateShared = async(fullPath) => {    

    await createModule(fullPath, 'shared', 'Ability', 'Abilities', 'name label ability_group_id');      // abilities
    await createModule(fullPath, 'shared', 'AbilityGroup', 'AbilityGroups', 'name');                    // ability_groups
    await createModule(fullPath, 'shared', 'AbilityUser', 'AbilityUsers', 'user_id ability_id');        // abilities_users
    await createModule(fullPath, 'shared', 'Role', 'Roles', 'name description');                        // roles
    await createModule(fullPath, 'shared', 'RoleUser', 'RoleUsers', 'user_id role_id');                 // role_users
    await createModule(fullPath, 'shared', 'Country', 'Countries', 'common_name iso_name code_alpha_2 code_alpha_3 numerical_code phone_code'); // countries
    await createModule(fullPath, 'api', 'User', 'Users', 'user_status_id name email email_verified_at password image_url');                  // user_statuses
    await createModule(fullPath, 'shared', 'UserStatus', 'UserStatuses', 'name');                       // user_statuses
    

    // await createInitAssociations(fullPath);


}









const createModule = async(
    fullPath, 
    namespace,
    singularName,
    pluralName,
    inputColumns,
) => {

    const columns = inputColumns.split(" ").map((col) => ({
        name: col,
        type: "STRING", // por defecto STRING
        allowNull: true, // por defecto true
    }));

     const selectedComponents = [
        "model",
        "controller_list",
        "controller_show",
        "controller_store",
        "controller_update",
        "controller_destroy",
        "repository",
        "route",
        "seeder",
        "postman",
    ];

    await generateModuleStandardNestJS(fullPath, selectedComponents, namespace, singularName, pluralName, columns);

}

