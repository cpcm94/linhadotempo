<?php

namespace App\GraphQL\Mutations;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class DeleteUser
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $guard = Auth::guard(config('sanctum.guard', 'web'));

        $currentUser = Auth::user();
        $user = User::find($args)[0];
        if ($currentUser["id"] === $user["id"]) {
            return ["success" => false, "message" => "Você não pode deletar o usuário que está atualmente logado!"];
        }
        $timelines = $user->timelines()->get();

        foreach ($timelines as $timeline) {
            $timeline->time_entries()->delete();
        }
        $user->timelines()->delete();
        $user->tokens()->delete();
        $user->delete();
        if(sizeof(User::find($args)) === 0) {
            return ["success" => true, "message" => "Usuário deletado com sucesso"];
        } else {
            return ["success" => false, "message" => "Falha ao deletar usuário"];
        }

        // TODO implement the resolver
    }
}
