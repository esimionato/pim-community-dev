<?php

declare(strict_types=1);

namespace Akeneo\Connectivity\Connection\Application\ErrorManagement\Query;

use Akeneo\Connectivity\Connection\Domain\ErrorManagement\Persistence\Query\SelectLastConnectionBusinessErrorsQuery;

/**
 * @copyright 2020 Akeneo SAS (http://www.akeneo.com)
 * @license http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 */
final class GetConnectionBusinessErrorsHandler
{
    /** @var SelectLastConnectionBusinessErrorsQuery */
    private $selectLastConnectionBusinessErrorsQuery;

    public function __construct(SelectLastConnectionBusinessErrorsQuery $selectLastConnectionBusinessErrorsQuery)
    {
        $this->selectLastConnectionBusinessErrorsQuery = $selectLastConnectionBusinessErrorsQuery;
    }

    public function handle(GetConnectionBusinessErrorsQuery $query): array
    {
        // Ignore business errors older than: Today at 00:00 minus 6 days ~= - 7 days
        $after = (new \DateTimeImmutable('now'))->setTime(0, 0)->sub(new \DateInterval('P6D'));

        // Limit to 100 busness errors
        $limit = 100;

        return $this->selectLastConnectionBusinessErrorsQuery->execute($query->connectionCode(), $after, $limit);
    }
}
