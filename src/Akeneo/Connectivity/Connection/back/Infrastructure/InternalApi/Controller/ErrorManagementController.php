<?php

declare(strict_types=1);

namespace Akeneo\Connectivity\Connection\Infrastructure\InternalApi\Controller;

use Akeneo\Connectivity\Connection\Application\ErrorManagement\Query\GetConnectionBusinessErrorsHandler;
use Akeneo\Connectivity\Connection\Application\ErrorManagement\Query\GetConnectionBusinessErrorsQuery;
use Akeneo\Connectivity\Connection\Domain\ErrorManagement\Model\Read\BusinessError;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @copyright 2020 Akeneo SAS (http://www.akeneo.com)
 * @license http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 */
class ErrorManagementController
{
    /** @var GetConnectionBusinessErrorsHandler */
    private $getConnectionBusinessErrorsHandler;

    public function __construct(GetConnectionBusinessErrorsHandler $getConnectionBusinessErrorsHandler)
    {
        $this->getConnectionBusinessErrorsHandler = $getConnectionBusinessErrorsHandler;
    }

    public function getConnectionBusinessErrors(Request $request): JsonResponse
    {
        $connectionCode = $request->attributes->get('connection_code', '');

        $query = new GetConnectionBusinessErrorsQuery($connectionCode);
        $businessErrors = $this->getConnectionBusinessErrorsHandler->handle($query);

        $data = array_map(function (BusinessError $businessError) {
            return $businessError->normalize();
        }, $businessErrors);

        return new JsonResponse($data);
    }
}
