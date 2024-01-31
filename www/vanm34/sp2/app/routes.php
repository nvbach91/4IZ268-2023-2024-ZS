<?php

declare(strict_types=1);

use App\Application\Actions\Email\SendEmailAction;
use App\Application\Middleware\APIMiddleware;
use DavidePastore\Slim\Validation\Validation;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Respect\Validation\Validator as v;
use Slim\App;
use Slim\Views\PhpRenderer;

return function (App $app) {
    //OPTIONS Pre-Flight
    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        return $response;
    });

    //HTML Render
    $renderer = new PhpRenderer('../templates');
    $app->get('/', function (Request $request, Response $response) use ($renderer) {
        return $renderer->render($response, 'index.html');
    });
    $app->get('/send-email', function (Request $request, Response $response) use ($renderer) {
        return $renderer->render($response, 'send-email.html');
    });
    $app->get('/local-storage', function (Request $request, Response $response) use ($renderer) {
        return $renderer->render($response, 'local-storage.html');
    });
    $app->get('/api-key', function (Request $request, Response $response) use ($renderer) {
        return $renderer->render($response, 'api-key.html');
    });

    //REST API
    $app->post('/api/sendEmail', SendEmailAction::class)
        ->add(APIMiddleware::class);
};
