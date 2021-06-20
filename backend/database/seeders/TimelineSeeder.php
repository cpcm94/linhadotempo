<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Timeline;

class TimelineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Timeline::create(['name' => 'Brasil','user_id'=>'1']);
        Timeline::create(['name' => 'Europa','user_id'=>'2']);
    }
}
