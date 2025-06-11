import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../../helpers/helperFile.js';


export const updateRoleUserModel = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'app', 'Models', 'RoleUsers');
    
    // File
    const filePath = path.join(folderPath, 'RoleUser.php');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
<?php

namespace App\\Models\\RoleUsers;

use App\\Models\\Roles\\Role;
use App\\Models\\User;
use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Relations\\BelongsTo;

class RoleUser extends Model
{

    use HasFactory;

    //use SoftDeletes;

    protected $connection = 'api';
    protected $table = 'role_user';



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
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class, 'role_id', 'id');
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