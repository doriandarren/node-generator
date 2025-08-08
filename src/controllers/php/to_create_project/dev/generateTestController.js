import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../helpers/helperFile.js';



export const generateTestController = async (fullPath) => {

  const folderPath = path.join(fullPath, 'app', 'Http', 'Controllers', 'Dev');

  const filePath = path.join(folderPath, 'TestController.php');

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  const code = `<?php

namespace App\\Http\\Controllers\\Dev;

use App\\Enums\\Dev\\EnumExcludeTable;
use App\\Enums\\EnumAbilityGroups;
use App\\Enums\\Roles\\EnumRole;
use App\\Enums\\UserStatuses\\EnumUserStatus;
use App\\Http\\Controllers\\Controller;
use App\\Models\\Abilities\\Ability;
use App\\Models\\AbilityGroups\\AbilityGroup;
use App\\Models\\Roles\\Role;
use App\\Models\\User;
use App\\Models\\UserStatuses\\UserStatus;
use App\\Repositories\\BatchProcesses\\Abilities\\BatchAbilityAndGroupRepository;
use App\\Repositories\\BatchProcesses\\Abilities\\BatchReloadDatabaseAbilitiesRepository;
use App\\Utilities\\Exls\\Exports\\Example\\ExampleExport;
use App\\Utilities\\Helpers\\HelperFile;
use App\\Utilities\\Messages\\MessageChannel;
use DateTime;
use Illuminate\\Http\\Response;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\DB;
use Knp\\Snappy\\Pdf;
use Maatwebsite\\Excel\\Facades\\Excel;
use setasign\\Fpdi\\Fpdi;
use App\\Mail\\TestMail;
use Illuminate\\Support\\Facades\\Mail;
use stdClass;

class TestController extends Controller
{
    

    public function __invoke()
    {
        echo "OK";
    }





    /*******************************************
     * ONLY VERSIONS BASE
     ******************************************/


    public function __invokeDISCORR()
    {
        MessageChannel::send('Hola Mundo!!!!', 'Titulo');
    }



    /**
     * Email
     */
    public function __invokeEMAIL()
    {
        try{

            Mail::to('dorian.gonzalez@globaltank.eu')->send(new TestMail('Prueba de email', 'Mensaje de prueba.'));

            echo "Email Sent.";

        }catch (\\Exception $e){
            dd($e->getMessage());
        }

    }



    /**
     * Snappy
     */
    public function __invokeSnappy()
    {
        $snappy = new Pdf();

        //$snappy->setBinary('/usr/local/bin/wkhtmltopdf');
        $snappy->setBinary(base_path() . '/vendor/h4cc/wkhtmltopdf-amd64/bin/wkhtmltopdf-amd64');


        $html = '<h1>Bill</h1><p>You owe me money, dude.</p>';
        $snappy->generateFromHtml($html, base_path('public') . '/files/test.pdf');


        return new Response(
            $snappy->getOutputFromHtml($html),
            200,
            array(
                'Content-Type'          => 'application/pdf',
                'Content-Disposition'   => 'attachment; filename="file.pdf"'
            )
        );


    }




    /**
     * Laravel Excel
     */
    public function __invokeEXCEL()
    {
        /**
         * IMPORTANTE!!! -> Si todo va bien el archivo estara en storage/app/private/exampleExport.xlsx
         */
         
        // Data Fake replace by Collection
        $arrData = [];
        $data = new stdClass();

        $data->invoice_date = "2024-01-01";
        $data->invoice_number = "ES019098";
        $data->card_code = "98M986h";
        $data->card = "00019";
        $data->plate = "9898KDF";

        $arrData[] = $data;


        Excel::store(new ExampleExport($arrData), 'exampleExport.xlsx');

        //dd(public_path('files') );

        //return (new ExampleExport())->store( public_path('files') . '/exampleExport.xlsx');

        //dd("pasa");

    }
    



    /**
     * PDF Merge
     */
    public function __invokeFPDI()
    {


        //dd(public_path('files/example/test.pdf'));

        $pdf = new Fpdi();

        // Definir los archivos PDF que deseas combinar
        $files = [
            public_path('files/example/pdf1.pdf'),
            public_path('files/example/pdf2.pdf'),
        ];


        // Iterar sobre cada archivo PDF
        foreach ($files as $file) {
            $pageCount = $pdf->setSourceFile($file); // Cargar el archivo PDF
            for ($pageNo = 1; $pageNo <= $pageCount; $pageNo++) {
                $pdf->AddPage(); // Añadir una nueva página en el documento de salida
                $tplId = $pdf->importPage($pageNo); // Importar la página
                $pdf->useTemplate($tplId); // Colocar la página importada en la página creada
            }
        }

        // Definir el nombre del archivo de salida
        $outputPath = public_path('files/example/merged.pdf');
        $pdf->Output('F', $outputPath); // Guardar el archivo combinado

        //return response()->download($outputPath); // Descargar o mostrar el PDF combinado

        dd("Pasa OKKK");
    }



    /**
     * Read Products
     */
    public function __invokeEEEWWWW()
    {

        $helper = new HelperFile();


        //$handle = $helper->openFileToRead(public_path('files') . '/tarifas_dispositivos_globalfleet.csv');
        $handle = $helper->openFileToRead(public_path('files') . '/e.csv');

        $arrayData = array();

        $i = 0;

        while (!feof($handle)) {
            $arrayData[$i] = fgets($handle);
            $i++;
        }


        $i = 0;
        while ($i < count($arrayData)) {

            $line = explode(";", $arrayData[$i]);

            if($line[1] != '') {

                echo $description = $line[0] . ' ';
                echo "<br>";

            }

            $i++;
        }

    }



    /*********************************************************
     *
     * GENERATE ABILITIES OF THE EnumAbilityGroups
     *
     *********************************************************/

    /**
     * 1.- No borrar sirve para actualizar las Abilities de la DB
     *
     * 2.- Recarga las abilidades de los usuarios
     *
     * @return void
     */
    public function __invokeABBB()
    {

        // No borrar sirve para actualizar las Abilities de la DB
        (new BatchAbilityAndGroupRepository())->createAbilities();


        // Recarga las abilidades de los usuarios
        (new BatchReloadDatabaseAbilitiesRepository())->__invoke();

        echo "OK Bash Abilities";

    }

    /**
     * *******************************************************
     */






    /*******************************
     * Create User
     */

    public function __invokeCREATEUSER()
    {


        // No borrar sirve para actualizar las Abilities de la DB
        (new \\App\\Repositories\\BatchProcesses\\Abilities\\BatchAbilityAndGroupRepository())->createAbilities();


        // Recarga las abilidades de los usuarios
        (new \\App\\Repositories\\BatchProcesses\\Abilities\\BatchReloadDatabaseAbilitiesRepository())->__invoke();

        echo "OK Bash Abilities <br>";



        $name = 'Eugeni';
        $email = 'eugeni@transportuarios.com';
        $password = 'j4p5hwtf';

        // MANAGER
        $this->createUser($name,$email, $password, EnumRole::MANAGER);


        echo "Usuario creado: " . $email;

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

        $userActiveId = UserStatus::where('name', EnumUserStatus::STATUS_ACTIVE_NAME)->first()->id;

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

            $this->createRoleUser($user, $roleName);

            $this->createAbilities($user, $roleName);

        }

    }


    private function createRoleUser($user, $roleName)
    {

        $user = User::find($user->id);

        if($roleName == EnumRole::ADMIN){
            $role = Role::where('name', EnumRole::ADMIN)->first();
            $user->assignRole($role);
        }


        if($roleName == EnumRole::MANAGER){
            $role = Role::where('name', EnumRole::MANAGER)->first();
            $user->assignRole($role);

        }
        
        if($roleName == EnumRole::USER){
            $role = Role::where('name', EnumRole::USER)->first();
            $user->assignRole($role);
        }


        if($roleName == EnumRole::ERP){
            $role = Role::where('name', EnumRole::ERP)->first();
            $user->assignRole($role);

        }

    }


    /**********************
     * Create All Abilities
     **********************/
    private function createAbilities($user, $roleName): void
    {


        if($roleName == EnumRole::ADMIN){
            $ability = Ability::where('name', '*')->first();
            $user->allowTo($ability);
        }


        if($roleName == EnumRole::MANAGER){

            $this->createAbilityByRol($user, EnumAbilityGroups::ABILITIES_GROUP_BY_MANAGER);

        }
        
        if($roleName == EnumRole::USER){
        
            $this->createAbilityByRol($user, EnumAbilityGroups::ABILITIES_GROUP_BY_USER);
            
        }

        if($roleName == EnumRole::ERP){

            $this->createAbilityByRol($user, EnumAbilityGroups::ABILITIES_GROUP_BY_ERP);

        }
        
        

    }


    private function createAbilityByRol($user, $groupsArr)
    {

        $groupsToAssign = json_decode(json_encode($groupsArr, true));


        foreach ($groupsToAssign as $groupToAssign) {

            $abilityGroupDB = AbilityGroup::with(['abilities'])->where('name', $groupToAssign->name)->first();

            if(isset($abilityGroupDB->abilities)){

                foreach ($abilityGroupDB->abilities as $abilityDB) {

                    $flag = $this->isAbility($abilityDB->name, $groupToAssign->name, $groupToAssign->abilities);

                    if($flag){
                        $abilityActive = Ability::where('id', $abilityDB->id)->first();
                        $user->allowTo($abilityActive);
                    }

                }

            }else{
                dd("Error de esta tabla: " . $groupToAssign->name . " es: " . $abilityGroupDB);
            }

        }

    }


    private function isAbility($nameDB, $nameAssign, $abilities): bool
    {
        foreach ($abilities as $ability) {
            if($nameDB == ($nameAssign . $ability)){
                return true;
            }
        }
        return false;
    }



    /**
     * END Create User
     *******************************/
     
     
     
     
     
     /*********************************************************
     *
     * GENERATE ABILITIES OF THE EnumAbilityGroups
     *
     *********************************************************/

    // Crear para abstract class UserPermissions
    public function __invokeABILITIES(Request $request)
    {

        $excludeTable = EnumExcludeTable::EXCLUDE_TABLE;

        $connections = [
            'api',
        ];


        $arrModule = [];


        foreach ($connections as $connection_name) {

            $connection = config("database.connections.{$connection_name}");
            $database = 'Tables_in_' . $connection['database'];
            $tables = DB::connection($connection_name)->select('SHOW TABLES');

            foreach ($tables as $k => $v) {

                $tableName = $v->{$database};

                if(!in_array($tableName, $excludeTable)){

                    $arrModule[] = $this->createConstModulePrintScreen($tableName);

                }

            }
        }


        echo "const ABILITIES_GROUP_BY_MANAGER = [<br>";

        foreach ($arrModule as $module) {
            echo $module;
        }

        echo '];<br>';


    }

    private function createConstModulePrintScreen($tableName)
    {
        $str = '
        [<br>
            \\\'name\\\' => \\\''.$tableName.'\\\',<br>
            \\\'abilities\\\' => [<br>
                EnumAbilitySuffix::LIST,<br>
                EnumAbilitySuffix::SHOW,<br>
                EnumAbilitySuffix::STORE,<br>
                EnumAbilitySuffix::UPDATE,<br>
                EnumAbilitySuffix::DESTROY,<br>
            ]<br>
        ],<br>
        ';
        return $str;

    }


    /**
     * *******************************************************
     */
 

}
`.trimStart();

  try {
    fs.writeFileSync(filePath, code, 'utf-8');
    console.log(`✅ Archivo generado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al generar el archivo ${filePath}: ${error.message}`.cyan);
  }
};
