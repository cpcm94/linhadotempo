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
    public $token;
    public $success;
    public $message;
    public function __invoke($_, array $args)
    {
        // if (Auth::attempt($args)) {
        //     $user = User::find(Auth::id());
        //     return $user;
        // }
        // return null;
        // ‘message’ => ‘The username/password combination you entered is invalid.’,

        $guard = Auth::guard(config('sanctum.guard', 'web'));

        if ( ! $guard->attempt($args)) {
            throw new CredentialsError('Invalid credentials.');
        }

        $user = $guard->user();
        $returnObj = new Login();
        $returnObj->token = $user->createToken('API Token')->plainTextToken;
        $returnObj->success = true;
        $returnObj->message = "Login bem sucedido";

        return $returnObj;

        
    }

}