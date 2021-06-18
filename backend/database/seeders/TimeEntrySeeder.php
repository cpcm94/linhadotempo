<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TimeEntry;

class TimeEntrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TimeEntry::create(['name' =>'Independência do Brasil', 'entry_year'=> 1822, 'entry_month' => 9, 'entry_day' => 7, 'annual_importance'=>true, 'monthly_importance'=>false, 'timeline_id'=> '1']);
        TimeEntry::create(['name' => 'Abolição do trabalho escravo', 'entry_year'=> 1888, 'entry_month' => 5, 'entry_day' =>13, 'annual_importance'=>true, 'monthly_importance'=> false, 'timeline_id'=> '1']);
        TimeEntry::create(['name' => 'Inicio da Primeira Guerra Mundial', 'entry_year'=> 1914, 'entry_month' => 7, 'entry_day' =>28, 'annual_importance'=> true, 'monthly_importance'=>false, 'timeline_id'=> '2']);
        TimeEntry::create(['name' => 'Término da Primeira Guerra Mundial', 'entry_year'=> 1918, 'entry_month' => 11, 'entry_day' =>11, 'annual_importance'=> true, 'monthly_importance'=>false, 'timeline_id'=>'2']);
        TimeEntry::create(['name' => 'Inicio da Segunda Guerra Mundial', 'entry_year'=> 1939, 'entry_month' => 9, 'entry_day' =>1, 'annual_importance'=> true, 'monthly_importance'=>false, 'timeline_id'=>'2']);
        TimeEntry::create(['name' => 'Término da Segunda Guerra Mundial', 'entry_year'=> 1945, 'entry_month' => 9, 'entry_day' =>2,  'annual_importance'=> true, 'monthly_importance'=>false, 'timeline_id'=>'2']);

    }
}
