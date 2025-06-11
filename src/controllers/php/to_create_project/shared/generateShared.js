import fs from 'fs';
import path from 'path';
import { generateModuleStandardPHP } from "../../to_create_module/generateModuleStandardPHP.js";

import { updateCountrySeeder } from './updates/updateCountrySeeder.js';
import { updateUserStatusSeeder } from './updates/updateUserStatusSeeder.js';
import { updateRoleSeeder } from './updates/updateRoleSeeder.js';
import { updateAbilitySeeder } from './updates/updateAbilitySeeder.js';
import { updateUserRolesAbilitiesSeeder } from './updates/updateUserRolesAbilities.js';
import { updateAbilityModel } from './updates/updateAbilityModel.js';
import { updateAbilityGroupModel } from './updates/updateAbilityGroupModel.js';
import { updateAbilityUserModel } from './updates/updateAbilityUserModel.js';
import { updateDatabaseSeeder } from './updates/updateDatabaseSeeder.js';
import { updateRoleModel } from './updates/updateRoleModel.js';
import { updateRoleUserModel } from './updates/updateRoleUserModel.js';
import { createFolder } from '../../../../helpers/helperFile.js';


export const generateShared = async(fullPath) => {

    await createModule(fullPath, 'SHARED', 'AbilityGroup', 'AbilityGroups', 'name');                    // ability_groups
    await createModule(fullPath, 'SHARED', 'Role', 'Roles', 'name description');                        // roles
    await createModule(fullPath, 'SHARED', 'Ability', 'Abilities', 'name label ability_group_id');      // abilities
    await createModule(fullPath, 'SHARED', 'AbilityUser', 'AbilityUsers', 'user_id ability_id');        // abilities_users
    await createModule(fullPath, 'SHARED', 'RoleUser', 'RoleUsers', 'user_id role_id');                 // role_users
    await createModule(fullPath, 'SHARED', 'Country', 'Countries', 'common_name iso_name code_alpha_2 code_alpha_3 numerical_code phone_code'); // countries
    await createModule(fullPath, 'SHARED', 'UserStatus', 'UserStatuses', 'name');                       // user_statuses
    
    // all migrations
    await generateAllMigrations(fullPath);



    // Update Seeders
    await updateCountrySeeder(fullPath);
    await updateUserStatusSeeder(fullPath);
    await updateRoleSeeder(fullPath);
    await updateAbilitySeeder(fullPath);
    await updateUserRolesAbilitiesSeeder(fullPath);
    await updateDatabaseSeeder(fullPath);



    // Update Models
    await updateAbilityModel(fullPath);
    await updateAbilityGroupModel(fullPath);
    await updateAbilityUserModel(fullPath);
    await updateRoleModel(fullPath);
    await updateRoleUserModel(fullPath);




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

    await generateModuleStandardPHP(fullPath, selectedComponents, namespace, singularName, pluralName, columns);

}





const generateAllMigrations = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'database', 'migrations');
    
    // File
    const filePath = path.join(folderPath, '0002_02_02_000002_create_default_table.php');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        // Ability Groups
        // name
        if (!Schema::connection('api')->hasTable('ability_groups')) {
            Schema::connection('api')->create('ability_groups', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->timestamps();
                $table->softDeletes();
            });
        }


        // Roles
        // name description
        if (!Schema::connection('api')->hasTable("roles")) {
            Schema::connection('api')->create('roles', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('name');
                $table->string('description')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }



        // Abilities
        // name label ability_group_id
        if (!Schema::connection('api')->hasTable("abilities")) {
            Schema::connection('api')->create('abilities', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('name')->unique();
                $table->string('label')->nullable();

                $table->unsignedBigInteger('ability_group_id')->unsigned();

                $table->foreign('ability_group_id')
                    ->references('id')
                    ->on('ability_groups')
                    ->onDelete('cascade');

                $table->timestamps();
                $table->softDeletes();

            });
        }


        // Ability User
        // user_id ability_id
        if (!Schema::connection('api')->hasTable("ability_user")) {
            Schema::connection('api')->create('ability_user', function (Blueprint $table) {
                //$table->primary(['id', 'user_id', 'ability_id']);
                $table->bigIncrements('id');
                $table->unsignedBigInteger('user_id')->unsigned();
                $table->unsignedBigInteger('ability_id')->unsigned();
                $table->timestamps();
                $table->softDeletes();

                $table->foreign('user_id')
                    ->references('id')
                    ->on('users')
                    ->onDelete('cascade');

                $table->foreign('ability_id')
                    ->references('id')
                    ->on('abilities')
                    ->onDelete('cascade');

            });
        }


        // Role User
        // user_id role_id
        if (!Schema::connection('api')->hasTable("role_user")) {
            Schema::connection('api')->create('role_user', function (Blueprint $table) {
                //$table->primary(['id', 'user_id', 'role_id']);
                $table->bigIncrements('id');
                $table->unsignedBigInteger('role_id')->unsigned();
                $table->unsignedBigInteger('user_id')->unsigned();
                $table->timestamps();
                $table->softDeletes();

                $table->foreign('user_id')
                    ->references('id')
                    ->on('users')
                    ->onDelete('cascade');

                $table->foreign('role_id')
                    ->references('id')
                    ->on('roles')
                    ->onDelete('cascade');
            });
        }


        // Countries
        if (!Schema::connection('api')->hasTable('countries')) {

            Schema::connection('api')->create('countries', function (Blueprint $table) {

                $table->id();
                $table->string('common_name');
                $table->string('iso_name')->nullable();
                $table->string('code_alpha_2');
                $table->string('code_alpha_3')->nullable();
                $table->string('numerical_code')->nullable();
                $table->string('phone_code')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }



    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        if (Schema::connection('api')->hasColumn('role_user', 'role_id')) {
            Schema::connection('api')->table('role_user', function (Blueprint $table) {
                $table->dropForeign(['role_id']);
                $table->dropColumn('role_id');
            });
        }

        if (Schema::connection('api')->hasColumn('role_user', 'user_id')) {
            Schema::connection('api')->table('role_user', function (Blueprint $table) {
                $table->dropForeign(['user_id']);
                $table->dropColumn('user_id');
            });
        }



        if (Schema::connection('api')->hasColumn('ability_user', 'ability_id')) {
            Schema::connection('api')->table('ability_user', function (Blueprint $table) {
                $table->dropForeign(['ability_id']);
                $table->dropColumn('ability_id');
            });
        }


        if (Schema::connection('api')->hasColumn('abilities', 'ability_group_id')) {
            Schema::connection('api')->table('abilities', function (Blueprint $table) {
                $table->dropForeign(['ability_group_id']);
                $table->dropColumn('ability_group_id');
            });
        }


        if (Schema::connection('api')->hasColumn('ability_user', 'user_id')) {
            Schema::connection('api')->table('ability_user', function (Blueprint $table) {
                $table->dropForeign(['user_id']);
                $table->dropColumn('user_id');
            });
        }



        Schema::connection('api')->dropIfExists('ability_user');
        Schema::connection('api')->dropIfExists('role_user');
        Schema::connection('api')->dropIfExists('abilities');
        Schema::connection('api')->dropIfExists('roles');
        Schema::connection('api')->dropIfExists('ability_groups');

        Schema::connection('api')->dropIfExists('countries');

    }
};    
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }

}
