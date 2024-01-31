<?php

namespace App\Application\Middleware;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface as Middleware;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Psr7\Factory\ResponseFactory;
use Nyholm\Psr7\Stream;

class APIMiddleware implements Middleware
{
    public const API_KEY = '29d2a52d9bfb178dde9d386ad87c7297e3a2e2e757e1252195b09086dc0ab98b';

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $apiKey = $request->getHeaderLine('Api-Key');
        if ($apiKey && $apiKey == self::API_KEY) {
            return $handler->handle($request);
        }

        $responseFactory = new ResponseFactory();
        return $responseFactory
            ->createResponse()
            ->withStatus(403)
            ->withBody(Stream::create('Invalid API Key'));
    }
}