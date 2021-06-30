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
        ['name' => 'Teste 2','user_id'=>'2'],
        ['name' => 'Teste 3','user_id'=>'2'],
        ['name' => 'Teste 4','user_id'=>'1'],
        ['name' => 'Teste 5','user_id'=>'2'],
        ['name' => 'Teste 6','user_id'=>'2'],
        ['name' => 'Teste 7','user_id'=>'1'],
        ['name' => 'Teste 8','user_id'=>'2'],
        ['name' => 'Teste 9','user_id'=>'2'],
        ['name' => 'Teste 10','user_id'=>'1'],
        ['name' => 'Teste 11','user_id'=>'2'],
        ['name' => 'Teste 12','user_id'=>'2'],
        ['name' => 'Teste 13','user_id'=>'1'],
        ['name' => 'Teste 1','user_id'=>'2'],
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
