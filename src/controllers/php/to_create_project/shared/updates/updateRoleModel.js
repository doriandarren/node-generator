import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../../helpers/helperFile.js';


export const updateRoleModel = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'app', 'Models', 'Roles');
    
    // File
    const filePath = path.join(folderPath, 'Role.php');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
<?php

namespace App\\Models\\Roles;

use App\\Models\\Abilities\\Ability;
use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Relations\\BelongsToMany;

class Role extends Model
{

    use HasFactory;
    //use SoftDeletes;

    protected $connection = 'api';
    protected $table = 'roles';

    /***********************
     * RELATIONS
     ***********************/

    public function abilities(): BelongsToMany
    {
        return $this->belongsToMany(Ability::class)->withTimestamps();
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