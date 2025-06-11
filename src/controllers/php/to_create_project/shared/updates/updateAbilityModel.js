import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../../helpers/helperFile.js';


export const updateAbilityModel = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'app', 'Models', 'Abilities');
    
    // File
    const filePath = path.join(folderPath, 'Ability.php');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
<?php

namespace App\\Models\\Abilities;


use App\\Models\\AbilityGroups\\AbilityGroup;
use App\\Models\\AbilityUsers\\AbilityUser;
use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Relations\\BelongsTo;
use Illuminate\\Database\\Eloquent\\Relations\\HasMany;

class Ability extends Model
{

    use HasFactory;


    //use SoftDeletes;

    protected $connection = 'api';
    protected $table = 'abilities';

    /***********************
     * RELATIONS
     ***********************/

    /**
     * @return HasMany
     */
    public function ability_user(): HasMany
    {
        return $this->hasMany(AbilityUser::class, 'ability_id', 'id');
    }


    /**
     * @return BelongsTo
     */
    public function ability_group(): BelongsTo
    {
        return $this->belongsTo(AbilityGroup::class, 'ability_group_id', 'id');
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