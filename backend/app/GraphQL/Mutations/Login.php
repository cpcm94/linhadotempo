<?php

namespace App\GraphQL\Mutations;
use App\Exceptions\CredentialsError;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class Login
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {

        $guard = Auth::guard(config('sanctum.guard', 'web'));

        if ( ! $guard->attempt($args)) {
            return [
                "success" => false,
                "message" => "Email ou senha inválidos"
            ];           
        } else {
            return [
                "token" => $guard->user()->createToken('API Token')->plainTextToken,
                "success" =>  true,
                "message" => "Login bem sucedido"
            ];
        }


        
    }

}