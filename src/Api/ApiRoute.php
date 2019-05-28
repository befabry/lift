<?php

namespace App\Api;

use Symfony\Component\Routing\Annotation\Route;

/**
 * Class ApiRoute
 * @package App\Api
 * @Annotation
 */
class ApiRoute extends Route
{
    public function getDefaults()
    {
        return ['_is_api' => true] + parent::getDefaults();
    }
}