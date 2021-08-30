<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TimeEntry;
use App\Models\Timeline;

class TimeEntrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    protected $entries = [
        ['name' =>'Independência do Brasil', 'year'=> 1822, 'month' => 9, 'day' => 7, 'annual_importance'=>true, 'monthly_importance'=>false, 'description' => 'descrição do acontecimento'],
        ['name' => 'Abolição do trabalho escravo', 'year'=> 1888, 'month' => 5, 'day' =>13, 'annual_importance'=>true, 'monthly_importance'=> false, 'description' => 'descrição do acontecimento'],
        ['name' => 'Inicio da Primeira Guerra Mundial', 'year'=> 1914, 'month' => 7, 'day' =>28, 'annual_importance'=> true, 'monthly_importance'=>false, 'description' => 'descrição do acontecimento'],
        ['name' => 'Término da Primeira Guerra Mundial', 'year'=> 1918, 'month' => 11, 'day' =>11, 'annual_importance'=> true, 'monthly_importance'=>false, 'description' => 'descrição do acontecimento'],
        ['name' => 'Inicio da Segunda Guerra Mundial', 'year'=> 1939, 'month' => 9, 'day' =>1, 'annual_importance'=> true, 'monthly_importance'=>false, 'description' => 'descrição do acontecimento'],
        ['name' => 'Término da Segunda Guerra Mundial', 'year'=> 1945, 'month' => 9, 'day' =>2,  'annual_importance'=> true, 'monthly_importance'=>false, 'description' => 'descrição do acontecimento'],
    ];

    public function run()
    
    {
        foreach($this->entries as $entry) 
        {
            TimeEntry::create($entry);
        }
        $timelines = Timeline::all();
        TimeEntry::all()->each(function ($time_entry) use($timelines) {
            $time_entry->timelines()->attach($timelines->random(rand(1))->pluck('id')-> toArray());
        });
    }
}
