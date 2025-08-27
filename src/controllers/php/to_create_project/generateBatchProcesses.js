import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';





export const generateBatchProcesses = async (fullPath) => {
  await createAbilityAndGroup(fullPath);
  await createReloadDatabase(fullPath);
  await createBatchDeleteAbilityGroupsRepository(fullPath);
};




const createAbilityAndGroup = async (fullPath) => {
  const folderPath = path.join(fullPath, 'app', 'Repositories', 'BatchProcesses', 'Abilities');
  const filePath = path.join(folderPath, 'BatchAbilityAndGroupRepository.php');
  createFolder(folderPath);

  const code = `<?php

namespace App\\Repositories\\BatchProcesses\\Abilities;

use App\\Enums\\Dev\\EnumExcludeTable;
use App\\Enums\\EnumAbilitySuffix;
use App\\Models\\Abilities\\Ability;
use App\\Models\\AbilityGroups\\AbilityGroup;
use Illuminate\\Support\\Facades\\DB;

class BatchAbilityAndGroupRepository
{
    public function createAbilities()
    {
        \$excludeTable = EnumExcludeTable::EXCLUDE_TABLE;
        \$connections = ['api'];

        if (!AbilityGroup::where('name', 'All')->exists()) {
            AbilityGroup::factory()->create(['name' => 'All']);
        }

        if (!Ability::where('name', '*')->exists()) {
            Ability::factory()->create([
                'name' => '*',
                'label' => 'All',
                'ability_group_id' => 1,
            ]);
        }

        foreach (\$connections as \$connection_name) {
            \$connection = config("database.connections.{\$connection_name}");
            \$database = 'Tables_in_' . \$connection['database'];
            \$tables = DB::connection(\$connection_name)->select('SHOW TABLES');

            foreach (\$tables as \$v) {
                \$tableName = \$v->{\$database};

                if (!in_array(\$tableName, \$excludeTable)) {
                    \$abilityGroup = \$this->createAbilityGroups(\$tableName);
                    \$this->createModuleAbilities(\$tableName, \$abilityGroup->id);
                }
            }
        }
    }

    private function createModuleAbilities(\$tableName, \$abilityGroupId)
    {
        foreach ([
            EnumAbilitySuffix::LIST => 'Lista modulo',
            EnumAbilitySuffix::STORE => 'Crea modulo',
            EnumAbilitySuffix::SHOW => 'Ver modulo',
            EnumAbilitySuffix::UPDATE => 'Edita modulo',
            EnumAbilitySuffix::DESTROY => 'Elimina modulo'
        ] as \$suffix => \$label) {
            \$name = \$tableName . \$suffix;
            if (!Ability::where('name', \$name)->exists()) {
                Ability::factory()->create([
                    'name' => \$name,
                    'label' => \$label,
                    'ability_group_id' => \$abilityGroupId,
                ]);
            }
        }
    }

    private function createAbilityGroups(\$name)
    {
        \$group = AbilityGroup::where('name', \$name)->first();
        return \$group ?? AbilityGroup::factory()->create(['name' => \$name]);
    }
}
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }
};






const createReloadDatabase = async (fullPath) => {
  const folderPath = path.join(fullPath, 'app', 'Repositories', 'BatchProcesses', 'Abilities');
  const filePath = path.join(folderPath, 'BatchReloadDatabaseAbilitiesRepository.php');
  createFolder(folderPath);

  const code = `<?php

namespace App\\Repositories\\BatchProcesses\\Abilities;

use App\\Enums\\EnumAbilityGroups;
use App\\Enums\\Roles\\EnumRole;
use App\\Models\\Abilities\\Ability;
use App\\Models\\AbilityGroups\\AbilityGroup;
use App\\Models\\AbilityUsers\\AbilityUser;
use App\\Models\\User;
use App\\Repositories\\AbilityUsers\\AbilityUserRepository;

class BatchReloadDatabaseAbilitiesRepository
{
    public function __invoke()
    {
        ini_set('memory_limit', '-1');
        \$users = User::all();

        foreach (\$users as \$user) {
            if (count(\$user->roles) > 1) {
                echo "Error. El usuario: " . \$user->name . " Tiene más de un rol.";
                break;
            }

            if (!\$user->abilities) {
                dd(\$user);
            }

            \$roleId = 0;
            foreach (\$user->roles as \$i => \$role) {
                if (\$i === 0 && \$role->pivot->role_id != EnumRole::ADMIN_ID) {
                    \$roleId = \$role->pivot->role_id;
                }
            }

            \$arrAbilities = [];

            if (\$roleId == EnumRole::MANAGER_ID) {
                \$arrAbilities = EnumAbilityGroups::ABILITIES_GROUP_BY_MANAGER;
            }

            if (count(\$arrAbilities) > 0) {
                \$this->findGroup(\$user, \$roleId, \$arrAbilities);
            }
        }
    }

    private function findGroup(\$user, \$roleId, \$arrAbilities)
    {
        foreach (\$arrAbilities as \$arrAbility) {
            \$arrEnabled = [];
            \$arrDisabled = [];
            \$abilityGroupDB = AbilityGroup::where('name', \$arrAbility["name"])->first();

            foreach (\$arrAbility["abilities"] as \$ability) {
                \$nameAbilityArr = \$arrAbility["name"] . \$ability;
                foreach (\$abilityGroupDB->abilities as \$abilityDB) {
                    if (\$nameAbilityArr === \$abilityDB->name) {
                        \$arrEnabled.push(\$abilityDB->name);
                    }
                }
            }

            foreach (\$abilityGroupDB->abilities as \$abilityDB) {
                if (!\$arrEnabled.includes(\$abilityDB->name)) {
                    \$arrDisabled.push(\$abilityDB->name);
                }
            }

            \$this->updateUserAbilities(\$user, \$arrEnabled, \$arrDisabled);
        }
    }

    private function updateUserAbilities(\$user, \$arrEnabled, \$arrDisabled)
    {
        foreach (\$arrEnabled as \$enable) {
            \$abilityFind = Ability::where('name', \$enable)->first();
            \$exists = \$user->abilities->contains(fn(\$a) => \$a->id === \$abilityFind->id);

            if (!\$exists) {
                \$rep = new AbilityUserRepository();
                \$abilityUserObj = \$rep->setAbilityUser(\$user->id, \$abilityFind->id);
                \$rep->store(\$abilityUserObj);
            }
        }

        foreach (\$arrDisabled as \$disabled) {
            foreach (\$user->abilities as \$ability) {
                if (\$ability->name === \$disabled) {
                    AbilityUser::where('user_id', \$user->id)
                        ->where('ability_id', \$ability->id)
                        ->first()
                        ?->delete();
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
};





export const createBatchDeleteAbilityGroupsRepository = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'app', 'Repositories', 'BatchProcesses', 'Abilities');
    
    // File
    const filePath = path.join(folderPath, 'BatchDeleteAbilityGroupsRepository.php');

    

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
<?php

namespace App\\Repositories\\BatchProcesses\\Abilities;

use App\\Models\\AbilityGroups\\AbilityGroup;
use App\\Models\\AbilityUsers\\AbilityUser;

class BatchDeleteAbilityGroupsRepository
{

    /**
     * @param string \$groupName
     * @return void
     */
    public function __invoke(string \$groupName)
    {

        $abilityGroup = AbilityGroup::with(['abilities'])
                                    ->where('name', $groupName)
                                    ->first();

        if($abilityGroup){

            foreach($abilityGroup->abilities as $ability){

                $abilityUser = AbilityUser::where('ability_id', $ability->id)->get();

                foreach($abilityUser as $aUser){
                    
                    $aUser->delete();
                    
                }

                $ability->delete();

            }

            $abilityGroup->delete();

            echo "El grupo de ability : " . $groupName . ' se elimino correctamente.<br>';

        }else{
            echo "El Grupo no se encuentra: " . $groupName . '<br>';

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