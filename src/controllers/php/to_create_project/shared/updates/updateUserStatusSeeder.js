import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../../helpers/helperFile.js';


export const updateUserStatusSeeder = async(fullPath ) => {    

    // Folder
    const folderPath = path.join(fullPath, 'database', 'seeders');
    
    // File
    const filePath = path.join(folderPath, 'UserStatusSeeder');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
<?php

namespace Database\\Seeders;

use App\\Enums\\UserStatuses\\EnumUserStatus;
use App\\Models\\UserStatuses\\UserStatus;
use Illuminate\\Database\\Seeder;


class UserStatusSeeder extends Seeder
{

	/**
	* Run the database seeds.
	*
	* @return void
	*/
	public function run()
	{

        //Create UserStatus
        $userStatuses = [
            EnumUserStatus::STATUS_ACTIVE_NAME,
            EnumUserStatus::STATUS_INACTIVE_NAME,
        ];

        foreach ($userStatuses as $userStatus) {
            if (!UserStatus::where('name', $userStatus)->exists()) {

                UserStatus::factory()->create(['name' => $userStatus]);
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