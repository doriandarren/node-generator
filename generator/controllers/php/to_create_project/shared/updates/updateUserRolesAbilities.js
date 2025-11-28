import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../../helpers/helperFile.js';


export const updateUserRolesAbilitiesSeeder = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'database', 'seeders');
    
    // File
    const filePath = path.join(folderPath, 'UserRolesAbilitiesSeeder.php');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
<?php

namespace Database\\Seeders;


use App\\Enums\\Dev\\EnumDefaultCompany;
use App\\Enums\\EnumAbilityGroups;
use App\\Enums\\Roles\\EnumRole;
use App\\Enums\\UserStatuses\\EnumUserStatus;
use App\\Models\\Abilities\\Ability;
use App\\Models\\Roles\\Role;
use App\\Models\\User;
use App\\Models\\UserStatuses\\UserStatus;
use Illuminate\\Database\\Seeder;



class UserRolesAbilitiesSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        /**
         * Create User
         */
        // ADMIN
        $this->createUser(EnumDefaultCompany::ADMIN_NAME, EnumDefaultCompany::ADMIN_EMAIL, EnumDefaultCompany::PASSWORD,EnumRole::ADMIN);


        /**
         * Create Manager
         */


        $this->createUser('Manager', 'manager@site.com', EnumDefaultCompany::PASSWORD, EnumRole::MANAGER);

        /**
         * Create User
         */
        $this->createUser('User', 'user@site.com', EnumDefaultCompany::PASSWORD, EnumRole::USER);



    }


    /**
     * @param $user
     * @param $roleName
     * @return void
     */
    private function createRoleUser($user, $roleName): void
    {
        $user = User::find($user->id);

        $role = Role::where('name', strtolower($roleName))->first();
        $user->assignRole($role);

    }


    /**
     * @param $name
     * @param $email
     * @param $password
     * @param $roleName
     * @return void
     */
    private function createUser($name, $email, $password, $roleName): void
    {

        // Create User
        $userActiveId = UserStatus::where('name', EnumUserStatus::ACTIVE)->first()->id;


        $user = User::where('email', $email)->first();
        if (!$user) {
            $user = User::factory()->create([
                'name' => $name,
                'email' => $email,
                'email_verified_at' => now(),
                'password' => bcrypt($password), // password
                'remember_token' => NULL,
                'user_status_id' => $userActiveId,
            ]);
        }


        // Crete RoleUser
        $this->createRoleUser($user, $roleName);

        // Create AbilityUser
        $this->createAbilityUser($user, $roleName);

    }



    /**
     * @param $user
     * @param $roleName
     * @return void
     */
    private function createAbilityUser($user, $roleName): void
    {

        /**
         * Add Ability only Admin
         */
        if($roleName == EnumRole::ADMIN){

            $ability = Ability::where('name', '*')->first();
            $user->allowTo($ability);

        }


        if($roleName == EnumRole::MANAGER){

            foreach (EnumAbilityGroups::ABILITIES_GROUP_BY_MANAGER as $abilityRecord) {

                foreach ($abilityRecord["abilities"] as $ability) {

                    $nameAbility =  $abilityRecord["name"] . $ability;
                    //echo $nameAbility . "<br>";

                    $ability = Ability::where('name', $nameAbility)->first();
                    $user->allowTo($ability);

                }

            }

        }


        if($roleName == EnumRole::USER){

            foreach (EnumAbilityGroups::ABILITIES_GROUP_BY_USER as $abilityRecord) {

                foreach ($abilityRecord["abilities"] as $ability) {

                    $nameAbility =  $abilityRecord["name"] . $ability;
                    //echo $nameAbility . "<br>";

                    $ability = Ability::where('name', $nameAbility)->first();
                    $user->allowTo($ability);

                }

            }

        }


        if($roleName == EnumRole::ERP){

            foreach (EnumAbilityGroups::ABILITIES_GROUP_BY_ERP as $abilityRecord) {

                foreach ($abilityRecord["abilities"] as $ability) {

                    $nameAbility =  $abilityRecord["name"] . $ability;
                    //echo $nameAbility . "<br>";

                    $ability = Ability::where('name', $nameAbility)->first();
                    $user->allowTo($ability);

                }

            }

        }




    }

}    
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }

}