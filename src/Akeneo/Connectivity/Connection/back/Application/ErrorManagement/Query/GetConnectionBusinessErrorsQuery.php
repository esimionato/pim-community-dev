<?php

declare(strict_types=1);

namespace Akeneo\Connectivity\Connection\Application\ErrorManagement\Query;

/**
 * @copyright 2020 Akeneo SAS (http://www.akeneo.com)
 * @license http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 */
final class GetConnectionBusinessErrorsQuery
{
    /** @var string */
    private $connectionCode;

    public function __construct(string $connectionCode)
    {
        $this->connectionCode = $connectionCode;
    }

    public function connectionCode(): string
    {
        return $this->connectionCode;
    }
}
