<?php

declare(strict_types=1);

namespace Akeneo\Connectivity\Connection\Infrastructure\Persistence\Dbal\Query;

use Akeneo\Connectivity\Connection\Domain\ErrorManagement\Model\Read\BusinessError;
use Akeneo\Connectivity\Connection\Domain\ErrorManagement\Persistence\Query\SelectLastConnectionBusinessErrorsQuery;
use Doctrine\DBAL\Connection as DbalConnection;
use Doctrine\DBAL\FetchMode;
use Doctrine\DBAL\Types\Types;

/**
 * @copyright 2020 Akeneo SAS (http://www.akeneo.com)
 * @license http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 */
class DbalSelectLastConnectionBusinessErrorsQuery implements SelectLastConnectionBusinessErrorsQuery
{
    /** @var DbalConnection */
    private $dbalConnection;

    public function __construct(DbalConnection $dbalConnection)
    {
        $this->dbalConnection = $dbalConnection;
    }

    public function execute(string $connectionCode, \DateTimeImmutable $after, int $limit): array
    {
        $sql = <<<SQL
SELECT connection_code, error_datetime, content FROM akeneo_connectivity_connection_audit_business_error
WHERE connection_code = :connection_code AND error_datetime > :after
ORDER BY error_datetime DESC
LIMIT :limit
SQL;
        $result = $this->dbalConnection->executeQuery($sql, [
            'connection_code' => $connectionCode,
            'after' => $after,
            'limit' => $limit
        ], [
            'after' => Types::DATETIME_IMMUTABLE,
            'limit' => Types::INTEGER
        ])->fetchAll(FetchMode::ASSOCIATIVE);

        $format = $this->dbalConnection->getDatabasePlatform()->getDateTimeFormatString();

        return array_map(function (array $row) use ($format) {
            return new BusinessError(
                $row['connection_code'],
                \DateTimeImmutable::createFromFormat($format, $row['error_datetime'], new \DateTimeZone('UTC')),
                $row['content']
            );
        }, $result);
    }
}
