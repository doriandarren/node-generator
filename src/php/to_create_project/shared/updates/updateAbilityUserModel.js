import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../helpers/helperFile.js';


export const updateAbilityUser = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'app', 'Models', 'AbilityUsers');
    
    // File
    const filePath = path.join(folderPath, '');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
<?php

namespace App\\Models\\AbilityUsers;

use App\\Models\\Abilities\\Ability;
use App\\Models\\User;
use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Relations\\BelongsTo;

class AbilityUser extends Model
{

    use HasFactory;

    //use SoftDeletes;

    protected $connection = 'api';
    protected $table = 'ability_user';

    /***********************
     * RELATIONS
     ***********************/

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }



    /**
     * @return BelongsTo
     */
    public function ability(): BelongsTo
    {
        return $this->belongsTo(Ability::class, 'ability_id', 'id');
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