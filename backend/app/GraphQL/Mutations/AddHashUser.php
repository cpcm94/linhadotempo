<?php

namespace App\GraphQL\Mutations;
use App\Models\User;
use App\Models\HashUser;


class AddHashUser
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $user = User::where('email', $args)->first();
        if (! $user) {
            return ['message' => 'Email não existe'];
        }
        $expiryDate = date_add(date_create(), date_interval_create_from_date_string('30 minutes'));

        $hash_user = HashUser::create([
            'hash_id' => bin2hex(random_bytes(16)),
            'expiry_date' => $expiryDate,
            'user_id' => $user->id,
        ]);

        return ['message' => 'Hash user criado', 'hash_id' => $hash_user->hash_id];
    }
}
