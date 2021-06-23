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
    protected $timelines = [
        ['name' => 'Brasil','user_id'=>'1'],
        ['name' => 'Europa','user_id'=>'2'],
    ];
    public function run()
    {
        foreach($this->timelines as $timeline) 
        {
            Timeline::create($timeline);
        }
    }
}
