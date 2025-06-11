import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../helpers/helperFile.js';
import { generateModuleStandardNodeJS } from '../../to_create_module/generateModuleStandardNodeJS.js';




export const generateShared = async(fullPath) => {    

    await createModule(fullPath, 'shared', 'Ability', 'Abilities', 'name label ability_group_id');      // abilities
    await createModule(fullPath, 'shared', 'AbilityGroup', 'AbilityGroups', 'name');                    // ability_groups
    await createModule(fullPath, 'shared', 'AbilityUser', 'AbilityUsers', 'user_id ability_id');        // abilities_users
    await createModule(fullPath, 'shared', 'Role', 'Roles', 'name description');                        // roles
    await createModule(fullPath, 'shared', 'RoleUser', 'RoleUsers', 'user_id role_id');                 // role_users
    await createModule(fullPath, 'shared', 'Country', 'Countries', 'common_name iso_name code_alpha_2 code_alpha_3 numerical_code phone_code'); // countries
    await createModule(fullPath, 'api', 'User', 'Users', 'user_status_id name email email_verified_at password image_url');                       // user_statuses
    await createModule(fullPath, 'shared', 'UserStatus', 'UserStatuses', 'name');                       // user_statuses
    


  // await createAbility(fullPath);
  // await createAbilityGroup(fullPath);
  // await createAbilityUser(fullPath);
  // await createRole(fullPath);
  // await createRoleUser(fullPath);
  // await createUser(fullPath);
  // await createUserSession(fullPath);
  // await createUserStatus(fullPath);


    //TODO crear los modules de migracion para todos... y ve 


    await createInitAssociations(fullPath);


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
        "factory",
        "postman",
    ];

    await generateModuleStandardNodeJS(fullPath, selectedComponents, namespace, singularName, pluralName, columns);

}



const createInitAssociations = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'models');
    
    // File
    const filePath = path.join(folderPath, 'initAssociations.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
// Relaciones del modelo User
import User from './User.js';
import UserStatus from './UserStatus.js';
import RoleUser from './RoleUser.js';
import Role from './Role.js';
import Ability from './Ability.js';
import AbilityUser from './AbilityUser.js';
import AbilityGroup from './AbilityGroup.js';

User.belongsTo(UserStatus, {
  foreignKey: 'user_status_id',
  as: 'status',
  onDelete: 'CASCADE'
});


User.hasMany(RoleUser, {
  foreignKey: 'user_id',
  as: 'role_user'
});



User.belongsToMany(Role, {
  through: RoleUser,
  foreignKey: 'user_id',
  otherKey: 'role_id',
  as: 'roles'
});

Role.belongsToMany(User, {
  through: RoleUser,
  foreignKey: 'role_id',
  otherKey: 'user_id',
  as: 'users'
});



User.belongsToMany(Ability, {
  through: AbilityUser,
  foreignKey: 'user_id',
  otherKey: 'ablity_id',
  as: 'ability'
});


Role.belongsTo(RoleUser, {
  foreignKey: 'role_id',
  as: 'role_users',
  onDelete: 'CASCADE'
});


Ability.belongsTo(AbilityUser, {
  foreignKey: 'ability_id',
  as: 'ability_users',
  onDelete: 'CASCADE'
});


AbilityGroup.belongsTo(Ability, {
  foreignKey: 'ability_group_id',
  as: 'abilities',
  onDelete: 'CASCADE'
});
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}