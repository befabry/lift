<?php

/*
 * This file is part of PHP CS Fixer.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *     Dariusz Rumiński <dariusz.ruminski@gmail.com>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;

class ApiCsrfValidationSubscriber implements EventSubscriberInterface
{
    public function onKernelRequest(GetResponseEvent $event)
    {
        //Make sure it runs only for a real request, not sub-requests
        if (!$event->isMasterRequest()) {
            return;
        }

        $request = $event->getRequest();

        //No validation needed on safe methods
        if ($request->isMethodSafe(false)) {
            return;
        }

        if (!$request->attributes->get('_is_api')) {
            return;
        }

        if ('application/json' != $request->headers->get('Content-Type')) {
            $response = new JsonResponse([
                'message' => 'Invalid Content-Type',
            ], JsonResponse::HTTP_UNSUPPORTED_MEDIA_TYPE);

            $event->setResponse($response);

            return;
        }

    }

    public static function getSubscribedEvents()
    {
        return [
            'kernel.request' => 'onKernelRequest',
        ];
    }
}
