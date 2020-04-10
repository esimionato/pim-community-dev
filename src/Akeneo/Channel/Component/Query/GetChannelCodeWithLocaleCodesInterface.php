<?php

declare(strict_types=1);

namespace Akeneo\Channel\Component\Query;

/**
 * @author    Nicolas Marniesse <nicolas.marniesse@akeneo.com>
 * @copyright 2020 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
interface GetChannelCodeWithLocaleCodesInterface
{
    public function findAll(): array;
}
