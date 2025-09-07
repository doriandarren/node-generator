import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../../helpers/helperFile.js';


export const updateAbilityGroupModel = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'app', 'Models', 'AbilityGroups');
    
    // File
    const filePath = path.join(folderPath, 'AbilityGroup.php');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
<?php

namespace App\\Models\\AbilityGroups;

use App\\Models\\Abilities\\Ability;
use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Relations\\HasMany;

class AbilityGroup extends Model
{

    use HasFactory;
    //use SoftDeletes;

    protected $connection = 'api';
    protected $table = 'ability_groups';

    /***********************
     * RELATIONS
     ***********************/

    /**
     * @return HasMany
     */
    public function abilities(): HasMany
    {
        return $this->hasMany(Ability::class, 'ability_group_id', 'id');
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