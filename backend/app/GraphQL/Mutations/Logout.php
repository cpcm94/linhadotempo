<?php

namespace App\GraphQL\Mutations;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class Logout
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $guard = Auth::guard(config('sanctum.guard', 'web'));

        /** @var \App\Models\User|null $user */
        $user = $guard->user();
        $user->tokens()->delete();
        $guard->logout();
        return $user;

        }
}
