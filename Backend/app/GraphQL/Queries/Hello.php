<?php

namespace App\GraphQL\Queries;

class Hello
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke(): string
    {
        return 'world';
    }
}
