<?php

declare(strict_types=1);

namespace Akeneo\Connectivity\Connection\back\tests\EndToEnd\ErrorManagement;

use Akeneo\Connectivity\Connection\back\tests\EndToEnd\WebTestCase;
use Akeneo\Test\Integration\Configuration;
use PHPUnit\Framework\Assert;
use Symfony\Component\HttpFoundation\Response;

/**
 * @copyright 2020 Akeneo SAS (http://www.akeneo.com)
 * @license http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 */
class GetConnectionBusinessErrorsEndToEnd extends WebTestCase
{
    public function test_it_gets_a_connection_business_errors(): void
    {
        $today = new \DateTimeImmutable('now', new \DateTimeZone('UTC'));
        $twoDaysBack = new \DateTimeImmutable('now - 2 day', new \DateTimeZone('UTC'));

        $errors = [
            'error_1' => [
                'connection_code' => 'erp',
                'error_datetime' => $today->format('Y-m-d H:i:s'),
                'content' => json_encode(['message' => 'Error message 1'])
            ],
            'error_2' => [ // Should be ignored: wrong connection
                'connection_code' => 'ecommerce',
                'error_datetime' => (new \DateTimeImmutable('now'))->format('Y-m-d H:i:s'),
                'content' => json_encode(['message' => 'Error message 2'])
            ],
            'error_3' => [
                'connection_code' => 'erp',
                'error_datetime' => $twoDaysBack->format('Y-m-d H:i:s'),
                'content' => json_encode(['message' => 'Error message 3'])
            ],
            'error_4' => [ // Should be ignored: error is older than 7 days
                'connection_code' => 'erp',
                'error_datetime' => (new \DateTimeImmutable('now - 10 day'))->format('Y-m-d H:i:s'),
                'content' => json_encode(['message' => 'Error message 4'])
            ]
        ];
        $this->insertBusinessErrors($errors);

        $expectedResult = [
            [
                'connection_code' => 'erp',
                'date_time' => $today->format(\DateTimeInterface::ATOM),
                'content' => ['message' => 'Error message 1']
            ],
            [
                'connection_code' => 'erp',
                'date_time' => $twoDaysBack->format(\DateTimeInterface::ATOM),
                'content' => ['message' => 'Error message 3']
            ]
        ];

        $this->authenticateAsAdmin();
        $this->client->request('GET', '/rest/connections/erp/business-errors');
        $result = json_decode($this->client->getResponse()->getContent(), true);

        Assert::assertEquals(Response::HTTP_OK, $this->client->getResponse()->getStatusCode());
        Assert::assertEquals($expectedResult, $result);
    }

    protected function getConfiguration(): Configuration
    {
        return $this->catalog->useMinimalCatalog();
    }

    private function insertBusinessErrors(array $errors): void
    {
        $connection = $this->get('database_connection');

        foreach ($errors as $error) {
            $connection->insert('akeneo_connectivity_connection_audit_business_error', $error);
        }
    }
}
