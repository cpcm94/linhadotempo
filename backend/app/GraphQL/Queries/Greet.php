<?php

namespace App\GraphQL\Queries;

class Greet
{
    /**
     * @param  null  $__
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args): string
    {
        return "Hello, {$args['name']}!";
    }
}
