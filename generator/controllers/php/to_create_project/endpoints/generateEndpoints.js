import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../helpers/helperFile.js';




export const generateEndppints = async(fullPath) => {
  
  await createEndpointStandard(fullPath);
  await createEndpointStandardURL(fullPath);

}


const createEndpointStandard = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'app', 'Endpoints', 'Standard');
    
    // File
    const filePath = path.join(folderPath, 'EndpointStandard.php');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
<?php

namespace App\\Endpoints\\Standard;

use App\\Utilities\\Messages\\MessageChannel;
use Illuminate\\Support\\Facades\\Http;

class EndpointStandard
{
    /**
     * GET request
     * @param string $url
     * @return mixed
     */
    public function getHttp(string $url): mixed
    {
        try {
            $response = Http::accept('application/json')
                ->withToken($endpointSetting->token)
                ->get( env('BASE_API_STANDARD') . $url);

            if ($response->successful()) {
                // Crear un objeto en lugar de un array
                $result = new \\stdClass();
                $result->status = $response->status();
                $result->data = json_decode(json_encode($response->json()));

                return $result;  // Devolver el objeto
            } else {
                // Manejar errores devolviendo un objeto
                $result = new \\stdClass();
                $result->status = $response->status();
                $result->data = null;

                return $result;  // Devolver el objeto en caso de error
            }
        } catch (\\Exception $e) {
            MessageChannel::send($e->getMessage(), 'Error ' . __FUNCTION__ . ' conexión API');

            $errorResponse = new \\stdClass();
            $errorResponse->status = 500;
            $errorResponse->data = null;
            $errorResponse->error = 'Error de conexión o problema interno';

            return $errorResponse;  // Devolver el objeto con información del error
        }

    }


    /**
     * POST request
     * @param string $url
     * @param array $data
     * @return mixed
     */
    public function postHttp(string $url, array $data): mixed
    {


        try {
            $response = Http::accept('application/json')
                ->withToken($endpointSetting->token)
                ->post(env('BASE_API_STANDARD'). $url, $data);



            if ($response->successful()) {
                // Crear un objeto en lugar de un array
                $result = new \\stdClass();
                $result->status = $response->status();
                $result->data = json_decode(json_encode($response->json()));

                return $result;  // Devolver el objeto
            } else {
                // Manejar errores devolviendo un objeto
                $result = new \\stdClass();
                $result->status = $response->status();
                $result->data = json_decode(json_encode($response->json()));

                return $result;  // Devolver el objeto en caso de error
            }

        } catch (\\Exception $e) {
            MessageChannel::send($e->getMessage(), 'Error ' . __FUNCTION__ . ' conexión API');

            $errorResponse = new \\stdClass();
            $errorResponse->status = 500;
            $errorResponse->data = null;
            $errorResponse->error = 'Error de conexión o problema interno';

            return $errorResponse;  // Devolver el objeto con información del error
        }
    }





    /**
     * PUT request
     * @param string $url
     * @param array $data
     * @return mixed
     */
    public function putHttp(string $url, array $data): mixed
    {

        try {
            $response = Http::accept('application/json')
                ->withToken($endpointSetting->token)
                ->put(env('BASE_API_STANDARD'). $url, $data);



            if ($response->successful()) {
                // Crear un objeto en lugar de un array
                $result = new \\stdClass();
                $result->status = $response->status();
                $result->data = json_decode(json_encode($response->json()));

                return $result;  // Devolver el objeto
            } else {
                // Manejar errores devolviendo un objeto
                $result = new \\stdClass();
                $result->status = $response->status();
                $result->data = json_decode(json_encode($response->json()));

                return $result;  // Devolver el objeto en caso de error
            }

        } catch (\\Exception $e) {
            MessageChannel::send($e->getMessage(), 'Error ' . __FUNCTION__ . ' conexión API');

            $errorResponse = new \\stdClass();
            $errorResponse->status = 500;
            $errorResponse->data = null;
            $errorResponse->error = 'Error de conexión o problema interno';

            return $errorResponse;  // Devolver el objeto con información del error
        }
    }






    /**
     * POST request for authentication
     * @return mixed
     */
    public function postHttpAuth(): mixed
    {

        try {

            $response = Http::accept('application/json')
                ->post(
                    env('BASE_API_STANDARD'). 'auth/login',
                    [
                        'email' => 'webmaster@splityn.com',
                        'password' => 'XXXXXX'
                    ]
                );

            if ($response->successful()) {
                // Crear un objeto en lugar de un array
                $result = new \\stdClass();
                $result->status = $response->status();
                $result->data = json_decode(json_encode($response->json()));

                return $result;  // Devolver el objeto
            } else {
                // Manejar errores devolviendo un objeto
                $result = new \\stdClass();
                $result->status = $response->status();
                $result->data = null;

                return $result;  // Devolver el objeto en caso de error
            }

        } catch (\\Exception $e) {
            MessageChannel::send($e->getMessage(), 'Error ' . __FUNCTION__ . ' conexión API');

            $errorResponse = new \\stdClass();
            $errorResponse->status = 500;
            $errorResponse->data = null;
            $errorResponse->error = 'Error de conexión o problema interno';

            return $errorResponse;  // Devolver el objeto con información del error
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



const createEndpointStandardURL = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'app', 'Endpoints', 'Standard');
    
    // File
    const filePath = path.join(folderPath, 'EndpointStandardURL.php');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
<?php

namespace App\\Endpoints\\Standard;

class EndpointStandardURL
{

    /**
     * Customers
     */
    // const APP_CUSTOMER_LIST = 'app-customers/truckwash/list';
    // const APP_CUSTOMER_SHOW = 'app-customers/truckwash/show';
    // const APP_CUSTOMER_STORE = 'app-customers/truckwash/store';
    // const APP_CUSTOMER_UPDATE = 'app-customers/truckwash/update';


    /**
     * Risk
     */

    //const APP_RISK_CUSTOMER_STORE = 'app-risk-monitor-transactions/store';

}   
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }

}