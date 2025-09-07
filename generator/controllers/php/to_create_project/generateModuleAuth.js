import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';


export const generateModuleAuth = async (fullPath) => {
  await createLogin(fullPath);
  await createLogout(fullPath);
  await createRegister(fullPath);
  await createUser(fullPath);
  await createRoute(fullPath);
}




const createLogin = async (fullPath) => {
  const folderPath = path.join(fullPath, 'app', 'Http', 'Controllers', 'API', 'Auth');
  const filePath = path.join(folderPath, 'AuthLoginController.php');

  createFolder(folderPath);

  const code = `<?php

namespace App\\Http\\Controllers\\API\\Auth;

use App\\Enums\\Roles\\EnumRole;
use App\\Http\\Controllers\\Controller;
use App\\Utilities\\Messages\\MessageChannel;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Auth;
use Illuminate\\Support\\Facades\\Validator;

class AuthLoginController extends Controller
{
    /**
     * @bodyParam email string required Must be a valid email address. Example: satterfield.buddy@example.org
     * @bodyParam password string required
     * @param Request \$request
     * @return JsonResponse
     */
    public function __invoke(Request \$request): JsonResponse
    {
        \$validator = Validator::make(\$request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (\$validator->fails()) {
            return \$this->respondWithError('Error', \$validator->errors());
        }

        \$credentials = request(['email', 'password']);
        if (!Auth::attempt(\$credentials)) {
            return \$this->respondHttpUnauthorized();
        }

        \$user = Auth::user();

        if (count(\$user->roles) == 0) {
            MessageChannel::send('Error Authentication ERP - User Id: (' . \$user->id . ') Usuario: ' . \$user->name, 'Error Auth');
            return \$this->respondWithError('User without role', ['e' => 'User without role']);
        }

        if (\$user->roles[0]->name == EnumRole::ADMIN) {
            \$token = \$user->createToken('auth_token')->plainTextToken;
            return \$this->respondWithToken('Login successfully - Admin', \$token);
        } else {
            \$arr = [];
            foreach (\$user->abilities as \$ability) {
                \$arr[] = \$ability->name;
            }
            \$user->employee;
            \$token = \$user->createToken('auth_token', \$arr)->plainTextToken;
            return \$this->respondWithToken('Login successfully', \$token);
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



const createLogout = async (fullPath) => {
  const folderPath = path.join(fullPath, 'app', 'Http', 'Controllers', 'API', 'Auth');
  const filePath = path.join(folderPath, 'AuthLogoutController.php');

  createFolder(folderPath);

  const code = `<?php

namespace App\\Http\\Controllers\\API\\Auth;

use App\\Http\\Controllers\\Controller;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;

class AuthLogoutController extends Controller
{
    /**
     * @param Request \$request
     * @return JsonResponse
     */
    public function __invoke(Request \$request): JsonResponse
    {
        \$user = \$request->user();
        \$request->user()->tokens()->delete();

        return \$this->respondWithData("Successfully logged out");
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



const createRegister = async (fullPath) => {
  const folderPath = path.join(fullPath, 'app', 'Http', 'Controllers', 'API', 'Auth');
  const filePath = path.join(folderPath, 'AuthRegisterController.php');

  createFolder(folderPath);

  const code = `<?php

namespace App\\Http\\Controllers\\API\\Auth;

use App\\Enums\\UserStatuses\\EnumUserStatus;
use App\\Http\\Controllers\\Controller;
use App\\Models\\User;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;

class AuthRegisterController extends Controller
{
    /**
     * @param Request \$request
     * @return JsonResponse
     */
    public function __invoke(Request \$request): JsonResponse
    {
        \$request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users',
            'password' => 'required|string',
            'c_password' => 'required|same:password'
        ]);

        \$user = new User([
            'name' => \$request->name,
            'email' => \$request->email,
            'password' => bcrypt(\$request->password),
            'user_status_id' => EnumUserStatus::STATUS_ACTIVE_ID
        ]);

        if (\$user->save()) {
            \$tokenResult = \$user->createToken('Personal Access Token');
            \$token = \$tokenResult->plainTextToken;
            return \$this->respondWithToken('Successfully created user!', \$token);
        } else {
            return \$this->respondWithError('Provide proper details', 'Provide proper details');
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



const createUser = async (fullPath) => {
  const folderPath = path.join(fullPath, 'app', 'Http', 'Controllers', 'API', 'Auth');
  const filePath = path.join(folderPath, 'AuthUserController.php');

  createFolder(folderPath);

  const code = `<?php

namespace App\\Http\\Controllers\\API\\Auth;

use App\\Http\\Controllers\\Controller;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;
use stdClass;

class AuthUserController extends Controller
{
    /**
     * @param Request \$request
     * @return JsonResponse
     */
    public function __invoke(Request \$request): JsonResponse
    {
        \$data = new stdClass();
        \$data->user = \$request->user();
        //\$data->user->abilities = \$request->user()->abilities;
        \$data->user->roles = \$request->user()->roles;

        if (\$this->isAdmin(\$request->user()->roles)) {
            return \$this->respondWithData("User current", \$data->user);
        } else {
            return \$this->respondWithData("User current", \$data->user);
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


const createRoute = async (fullPath) => {
  const folderPath = path.join(fullPath, 'routes', 'API');
  const filePath = path.join(folderPath, 'auth.php');

  createFolder(folderPath);

  const code = `<?php

use App\\Http\\Controllers\\API\\Auth\\AuthLoginController;
use App\\Http\\Controllers\\API\\Auth\\AuthLogoutController;
use App\\Http\\Controllers\\API\\Auth\\AuthUserController;
use Illuminate\\Support\\Facades\\Route;

/*
|--------------------------------------------------------------------------
| API Auth
|--------------------------------------------------------------------------
*/

// Login
Route::post('auth/login', [AuthLoginController::class, '__invoke']);

// Password Reset
// Route::post('password/email', [ForgotPasswordController::class, '__invoke']);
// Route::post('password/restore', [RestorePasswordController::class, '__invoke']);

Route::group(['middleware' => 'auth:sanctum'], function() {
    Route::get('auth/logout', [AuthLogoutController::class, '__invoke']);
    Route::get('auth/user', [AuthUserController::class, '__invoke']);
});
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }
}
