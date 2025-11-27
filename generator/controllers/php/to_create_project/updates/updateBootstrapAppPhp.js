import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../helpers/helperFile.js';



//TODO Corregir poque no esta funcionando al generar esta funcion

export const updateBootstrapAppPhp = async(fullPath) => {
    await updateAbilities(fullPath);
    await createHandlerResponse(fullPath);
}



const updateAbilities = async (fullPath) => {
  const appPhpPath = path.join(fullPath, 'bootstrap', 'app.php');

  if (!fs.existsSync(appPhpPath)) {
    console.log(`❌ Error: ${appPhpPath} no existe.`.cyan);
    return;
  }

  try {
    let content = fs.readFileSync(appPhpPath, 'utf-8');

    // Insertar 'use'
    content = content.replace(
      `<?php\n\n`,
      `<?php

use Laravel\\Sanctum\\Http\\Middleware\\CheckAbilities;
use Laravel\\Sanctum\\Http\\Middleware\\CheckForAnyAbility;
use Illuminate\\Http\\Request;
use App\\Utilities\\Messages\\MessageChannel;
use App\\Exceptions\\HandlerResponse;
use Symfony\\Component\\HttpKernel\\Exception\\AccessDeniedHttpException;
use Symfony\\Component\\HttpKernel\\Exception\\NotFoundHttpException;
use Symfony\\Component\\HttpKernel\\Exception\\MethodNotAllowedHttpException;
use Illuminate\\Database\\QueryException;\n`
    );

    // Reemplazo de ->withMiddleware
    content = content.replace(
      `    ->withMiddleware(function (Middleware $middleware): void {
        //
    })`,
      `    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'abilities' => CheckAbilities::class,
            'ability' => CheckForAnyAbility::class,
        ]);
    })`
    );

    // Agregar bloque de excepciones
    content = content.replace(
      `->withExceptions(function (Exceptions $exceptions): void {`,
      `->withExceptions(function (Exceptions $exceptions): void {
        // BadMethodCallException
        $exceptions->render(function (BadMethodCallException $e, Request $request) {
            if ($request->is('api/*')) {
                $msg = $e->getMessage() . ' File: ' . $e->getFile() . ' Line: ' . $e->getLine();
                MessageChannel::send($msg, 'Error BadMethodCallException', true);
                return HandlerResponse::respondWithError('Error Bad method call', 500, [[ 'e' => $e->getMessage() ]]);
            }
            return null;
        });

        // ErrorException
        $exceptions->render(function (ErrorException $e, Request $request) {
            if ($request->is('api/*')) {
                $msg = $e->getMessage() . ' File: ' . $e->getFile() . ' Line: ' . $e->getLine();
                MessageChannel::send($msg, 'Error ErrorException', true);
                return HandlerResponse::respondWithError('Error exception', 500, [[ 'e' => $e->getMessage() ]]);
            }
            return null;
        });

        // QueryException
        $exceptions->render(function (QueryException $e, Request $request) {
            if ($request->is('api/*')) {
                MessageChannel::send($e->getMessage(), 'Error QueryException', true);
                return HandlerResponse::respondWithError('Error Query Exception', 500, [[ 'e' => $e->getMessage() ]]);
            }
            return null;
        });

        // NotFoundHttpException
        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            if ($request->is('api/*')) {
                $msg = $e->getMessage() ?: 'Error Not found';
                MessageChannel::send($msg, 'Error NotFoundHttpException', true);
                return HandlerResponse::respondWithError('Error Not found', 404, [[ 'e' => $msg ]]);
            }
            return null;
        });

        // AccessDeniedHttpException
        $exceptions->render(function (AccessDeniedHttpException $e, Request $request) {
            if ($request->is('api/*')) {
                MessageChannel::send($e->getMessage(), 'Error AccessDeniedHttpException', true);
                return HandlerResponse::respondWithError('Error Access denied', 403, [[ 'e' => $e->getMessage() ]]);
            }
            return null;
        });

        // MethodNotAllowedHttpException
        $exceptions->render(function (MethodNotAllowedHttpException $e, Request $request) {
            if ($request->is('api/*')) {
                $msg = $e->getMessage() ?: 'Error Method not allowed';
                MessageChannel::send($msg, 'Error MethodNotAllowedHttpException', true);
                return HandlerResponse::respondWithError('Error Method not allowed', 405, [[ 'e' => $msg ]]);
            }
            return null;
        });
    
    `
    );

    fs.writeFileSync(appPhpPath, content, 'utf-8');
    console.log('✅ bootstrap/app.php actualizado correctamente.'.green);
  } catch (error) {
    console.error(`❌ Error al actualizar ${appPhpPath}: ${error.message}`.cyan);
  }
};






const createHandlerResponse = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'app', 'Exceptions');
    
    // File
    const filePath = path.join(folderPath, 'HandlerResponse.php');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
<?php

namespace App\\Exceptions;

use Illuminate\\Http\\JsonResponse;

class HandlerResponse
{

    /**
     * @param $message
     * @param $statusCode
     * @param null $errors
     * @return JsonResponse
     */
    public static function respondWithError($message, $statusCode, $errors=null): JsonResponse
    {
        $data = [
            'message' => $message,
            'data' => null,
            'errors' => $errors,
            'success' => FALSE,
            'status_code' => $statusCode
        ];
        return response()->json($data, $statusCode);
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