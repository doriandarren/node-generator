import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../helpers/helperFile.js';


export const updateAbilitySeeder = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'database', 'seeders');
    
    // File
    const filePath = path.join(folderPath, 'AbilitySeeder.php');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
<?php

namespace Database\\Seeders;

use App\\Enums\\Dev\\EnumExcludeTable;
use App\\Enums\\EnumAbilitySuffix;
use App\\Models\\Abilities\\Ability;
use App\\Models\AbilityGroups\\AbilityGroup;
use Illuminate\\Database\\Seeder;
use Illuminate\\Support\\Facades\\DB;

class AbilitySeeder extends Seeder
{

	/**
	* Run the database seeds.
	*
	* @return void
	*/
	public function run()
	{
        $this->createAbilities();
	}


    private function createAbilities()
    {

        $excludeTable = EnumExcludeTable::EXCLUDE_TABLE;


        $connections = [
            'api',
        ];

        //$arrModule = [];



        if(!AbilityGroup::where('name', 'All')->exists()){
            AbilityGroup::factory()->create([
                'name' => 'All',
            ]);
        }


        if(!Ability::where('name', '*')->exists()){
            Ability::factory()->create([
                'name' => '*',
                'label' => 'All',
                'ability_group_id' => 1,
            ]);
        }



        foreach ($connections as $connection_name) {

            $connection = config("database.connections.{$connection_name}");
            $database = 'Tables_in_' . $connection['database'];
            $tables = DB::connection($connection_name)->select('SHOW TABLES');

            foreach ($tables as $k => $v) {

                $tableName = $v->{$database};

                if(!in_array($tableName, $excludeTable)){

                    $abilityGroup = $this->createAbilityGroups($tableName);

                    $this->createModuleAbilities($tableName, $abilityGroup->id);

                }

            }

        }


        /**
         * Manuals
         */
//        $abilityGroup = $this->createAbilityGroups('action_task_camera_image');
//        $this->createModuleAbilities('action_task_camera_image', $abilityGroup->id);


    }


    private function createModuleAbilities($tableName, $abilityGroupId)
    {

        if(!Ability::where('name', $tableName.EnumAbilitySuffix::LIST)->exists()){
            Ability::factory()->create([
                'name' => $tableName.EnumAbilitySuffix::LIST,
                'label' => 'Lista modulo',
                'ability_group_id' => $abilityGroupId,
            ]);
        }

        if(!Ability::where('name', $tableName.EnumAbilitySuffix::STORE)->exists()){
            Ability::factory()->create([
                'name' => $tableName.EnumAbilitySuffix::STORE,
                'label' => 'Crea modulo',
                'ability_group_id' => $abilityGroupId,
            ]);
        }
        if(!Ability::where('name', $tableName.EnumAbilitySuffix::SHOW)->exists()){
            Ability::factory()->create([
                'name' => $tableName.EnumAbilitySuffix::SHOW,
                'label' => 'Ver modulo',
                'ability_group_id' => $abilityGroupId,
            ]);
        }
        if(!Ability::where('name', $tableName.EnumAbilitySuffix::UPDATE)->exists()){
            Ability::factory()->create([
                'name' => $tableName.EnumAbilitySuffix::UPDATE,
                'label' => 'Edita modulo',
                'ability_group_id' => $abilityGroupId,
            ]);
        }
        if(!Ability::where('name', $tableName.EnumAbilitySuffix::DESTROY)->exists()){
            Ability::factory()->create([
                'name' => $tableName.EnumAbilitySuffix::DESTROY,
                'label' => 'Elimina modulo',
                'ability_group_id' => $abilityGroupId,
            ]);
        }

    }


    private function createAbilityGroups($name)
    {

        if(!AbilityGroup::where('name', $name)->exists()){
            $abilityGroup = AbilityGroup::factory()->create([
                'name' => $name,
            ]);
            return $abilityGroup;
        }

        return null;
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