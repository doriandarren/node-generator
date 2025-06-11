import fs from 'fs';
import path from 'path';



export const updateBootstrapAppPhp = async(fullPath) => {
    await updateAbilities(fullPath);
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
      `->withMiddleware(function (Middleware $middleware) {\n        //\n    })`,
      `->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'abilities' => CheckAbilities::class,
            'ability' => CheckForAnyAbility::class,
        ]);
    })`
    );

    // Agregar bloque de excepciones
    content = content.replace(
      `->withMiddleware(function (Middleware $middleware) {`,
      `->withExceptions(function (Exceptions $exceptions) {
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
    })
    ->withMiddleware(function (Middleware $middleware) {`
    );

    fs.writeFileSync(appPhpPath, content, 'utf-8');
    console.log('✅ bootstrap/app.php actualizado correctamente.'.green);
  } catch (error) {
    console.error(`❌ Error al actualizar ${appPhpPath}: ${error.message}`.cyan);
  }
};
