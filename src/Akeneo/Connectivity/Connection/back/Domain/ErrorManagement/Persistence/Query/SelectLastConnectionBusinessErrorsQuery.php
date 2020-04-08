<?php

declare(strict_types=1);

namespace Akeneo\Connectivity\Connection\Domain\ErrorManagement\Persistence\Query;

use Akeneo\Connectivity\Connection\Domain\ErrorManagement\Model\Read\BusinessError;

/**
 * @copyright 2020 Akeneo SAS (http://www.akeneo.com)
 * @license http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 */
interface SelectLastConnectionBusinessErrorsQuery
{
    /**
     * @param \DateTimeImmutable $after Ignore results older than $after.
     * @param int $limit Limit the number of maximum results.
     *
     * @return BusinessError[]
     */
    public function execute(string $connectionCode, \DateTimeImmutable $after, int $limit): array;
}
