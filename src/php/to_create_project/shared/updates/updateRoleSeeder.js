import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../helpers/helperFile.js';


export const updateRoleSeeder = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'database', 'seeders');
    
    // File
    const filePath = path.join(folderPath, 'RoleSeeder.php');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
<?php

namespace Database\\Seeders;

use App\\Enums\\Roles\\EnumRole;
use App\\Models\\Roles\\Role;
use Illuminate\\Database\\Seeder;



class RoleSeeder extends Seeder
{

	/**
	* Run the database seeds.
	*
	* @return void
	*/
	public function run()
	{
        // ADMIN
        Role::factory()->create([
            'name' => EnumRole::ADMIN,
            'description' => EnumRole::ADMIN_DESCRIPTION,
        ]);


        // MANAGER
        Role::factory()->create([
            'name' => EnumRole::MANAGER,
            'description' => EnumRole::MANAGER_DESCRIPTION,
        ]);


        // USER
        Role::factory()->create([
            'name' => EnumRole::USER,
            'description' => EnumRole::USER_DESCRIPTION,
        ]);


        // ERP
        Role::factory()->create([
            'name' => EnumRole::ERP,
            'description' => EnumRole::ERP_DESCRIPTION,
        ]);

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