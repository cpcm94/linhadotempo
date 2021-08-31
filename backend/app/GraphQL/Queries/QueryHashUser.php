<?php

namespace App\GraphQL\Queries;
use App\Models\HashUser;

class QueryHashUser
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $hashUser = HashUser::where('hash_id', $args)->first();
        $currentDate = gmdate('Y-m-d h:i:s');
        if($hashUser->expiry_date > $currentDate) {
            return $hashUser;
        } else {
            return null;
        }
    }
}
