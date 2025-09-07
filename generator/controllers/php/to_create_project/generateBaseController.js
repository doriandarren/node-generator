import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';



export const generateBaseController = async (fullPath) => {
  await createFileController(fullPath);
  await createFileBaseController(fullPath);
};



const createFileController = async (fullPath) => {

  const folderPath = path.join(fullPath, 'app', 'Http', 'Controllers');

  const filePath = path.join(folderPath, 'Controller.php');

  createFolder(folderPath);

  const code = `<?php

namespace App\\Http\\Controllers;

use Illuminate\\Foundation\\Auth\\Access\\AuthorizesRequests;
use Illuminate\\Foundation\\Validation\\ValidatesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }
};




const createFileBaseController = async (fullPath) => {

  const folderPath = path.join(fullPath, 'app', 'Http', 'Controllers');

  const filePath = path.join(folderPath, 'BaseController.php');

  createFolder(folderPath);

  
  const code = `<?php

namespace App\\Http\\Controllers;

use App\\Enums\\Roles\\EnumRole;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Routing\\Controller as IluBaseController;

class BaseController extends IluBaseController
{
    private \$message;
    private \$code;

    public function getMessage()
    {
        return \$this->message;
    }

    public function setMessage(string \$message)
    {
        \$this->message = \$message;
    }

    public function getCode()
    {
        return \$this->code;
    }

    public function setCode(int \$code)
    {
        \$this->code = \$code;
    }

    public function respond(\$data, \$headers = []){
        return response()->json(\$data, \$this->getCode());
    }

    public function respondWithError(string \$message='', \$errors = null, \$code = 422): JsonResponse
    {
        \$this->setCode(\$code);
        return \$this->respond([
            'message' => \$message,
            'data' => null,
            'errors' => [ \$errors ],
            'success' => FALSE,
            'status_code' => \$this->getCode(),
        ]);
    }

    public function respondWithData(\$message = null, \$data = null, \$success = true): JsonResponse
    {
        \$this->setCode(200);
        return \$this->respond([
            'data' => \$data,
            'message' => \$message,
            'success' => \$success,
            'status_code' => 200
        ]);
    }

    public function respondWithToken(\$message, \$token): JsonResponse
    {
        \$this->setCode(201);
        return \$this->respond([
            'message' => \$message,
            'token' => \$token,
            'token_type' => 'Bearer',
            'success' => TRUE,
            'status_code' => 201
        ]);
    }

    public function respondWithTokenWithUser(\$message, \$user, \$token): JsonResponse
    {
        \$this->setCode(201);
        return \$this->respond([
            'message' => \$message,
            'token' => \$token,
            'token_type' => 'Bearer',
            'user' => \$user,
            'success' => TRUE,
            'status_code' => 201
        ]);
    }

    public function respondWithTokenByApp(\$message, \$user, \$token): JsonResponse
    {
        \$this->setCode(201);
        return \$this->respond([
            'message' => \$message,
            'token' => \$token,
            'token_type' => 'Bearer',
            'user' => \$user,
            'success' => TRUE,
            'status_code' => 201
        ]);
    }

    public function respondHttpBadRequest(\$message = 'Bad Request'){
        \$this->setCode(400);
        return \$this->respondWithError(\$message, ['e' => \$message]);
    }

    public function respondHttpUnauthorized(\$message = 'Unauthorized'){
        \$this->setCode(401);
        return \$this->respondWithError(\$message, ['e' => \$message]);
    }

    public function respondHttpConflict(\$message = 'Data Conflict'){
        \$this->setCode(409);
        return \$this->respondWithError(\$message, ['e' => \$message]);
    }

    public function respondUnprocessableEntity(\$message = 'Unprocessable Entity')
    {
        \$this->setCode(422);
        return \$this->respondWithError(\$message, ['e' => \$message]);
    }

    public function respondWithValidation(\$errors)
    {
        \$errorCodes = [];
        \$errorDescriptions = [];

        foreach(json_decode(\$errors) as \$key => \$error){
            if(count(\$errors) > 3){
                \$errorCodes[] = \$error[0]->error_code;
                \$errorDescriptions[] = \$error[0]->error_description;
            }else{
                \$errorCodes = \$error[0]->error_code;
                \$errorDescriptions = \$error[0]->error_description;
            }
        }

        \$this->setCode(200);
        return \$this->respond([
            'success' => false,
            'message' => '',
            'error_code' => \$errorCodes,
            'error_description' => \$errorDescriptions,
            'status_code' => 200,
        ]);
    }

    protected function isAdmin(\$roles): bool
    {
        foreach (\$roles as \$role) {
            if(\$role->name == EnumRole::ADMIN){
                return true;
            }
        }
        return false;
    }

    protected function isManager(\$roles): bool
    {
        foreach (\$roles as \$role) {
            if(\$role->name == EnumRole::MANAGER){
                return true;
            }
            if(\$role->name == EnumRole::ERP){
                return true;
            }
        }
        return false;
    }

    protected function isUser(\$roles): bool
    {
        foreach (\$roles as \$role) {
            if(\$role->name == EnumRole::USER){
                return true;
            }
        }
        return false;
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

