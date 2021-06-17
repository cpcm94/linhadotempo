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
    public function run()
    {
        User::create(['name'=> 'user1', 'email' => 'example1@email.com', 'password' => '123']);
        User::create(['name'=> 'user2', 'email' => 'example2@email.com', 'password' => '123']);
        User::create(['name'=> 'user3', 'email' => 'example3@email.com', 'password' => '123']);
    }
}
