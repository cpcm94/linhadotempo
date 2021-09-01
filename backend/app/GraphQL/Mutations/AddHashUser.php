<?php

namespace App\GraphQL\Mutations;
use App\Models\User;
use App\Models\HashUser;
use App\Mail\RecoverPassword;
use Illuminate\Support\Facades\Mail;

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
            return ['message' => 'Email não existe', 'success' => false];
        }
        $expiryDate = date_add(date_create(), date_interval_create_from_date_string('30 minutes'));

        $hash_user = HashUser::create([
            'hash_id' => bin2hex(random_bytes(16)),
            'expiry_date' => $expiryDate,
            'user_id' => $user->id,
        ]);
        $data = array(
            'hash_id' => $hash_user->hash_id,
            'user_name' => $user->name,
        );
        Mail::to($user->email)->send(new RecoverPassword($data));

        if (count(Mail::failures())> 0) {
            return ['message' => 'Falha ao enviar email', 'success' => false];
        } else {
            return ['message' => 'Email enviado com sucesso', 'success' => true];
        }

    }
}
