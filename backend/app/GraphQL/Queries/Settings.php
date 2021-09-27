<?php

namespace App\GraphQL\Queries;

class Settings
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
       $bucket_name = ENV('AWS_BUCKET');

       return ['bucket_name' => $bucket_name];
    }
}
