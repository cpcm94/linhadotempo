<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;


class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create(['name'=> 'admin', 'email' => 'admin@email.com', 'password' => bcrypt('123'), 'type'=> 'admin']);
    }
}
