<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
     protected $users = [
        ['name'=> 'user1', 'email' => 'example1@email.com', 'type' => 'basic'],
        ['name'=> 'user2', 'email' => 'example2@email.com', 'type' => 'basic'],
        ['name'=> 'user3', 'email' => 'example3@email.com', 'type' => 'basic'],
     ];
    public function run()
    {
        foreach($this->users as $user)
        {
            $user->password = bcrypt('123');
            User::create($user);
        }
    }
}
