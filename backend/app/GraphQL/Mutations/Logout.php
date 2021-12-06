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
        $guard = Auth::guard();

        Auth::user()->tokens()->delete();
        $guard->logout();

        /** @var \App\Models\User|null $user */

        if (sizeof(Auth::user()->tokens) === 0) {
            return ["success" => true,
            "message" => "Logout bem sucedido"];
        } else {
            return ["success" => false,
            "message" => "Logout falhou"];
        }

        }
}
