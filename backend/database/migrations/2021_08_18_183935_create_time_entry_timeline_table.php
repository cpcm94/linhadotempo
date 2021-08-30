<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Timeline;
use App\Models\TimeEntry;


class CreateTimeEntryTimelineTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('time_entry_timeline', function (Blueprint $table) {
            $table->id();
            $table->foreignId('time_entry_id')->references('id')->on('time_entries')->onDelete('cascade');
            $table->foreignId('timeline_id')->references('id')->on('timelines')->onDelete('cascade');
        });
        $timelines = Timeline::get();
        foreach ($timelines as $timeline) {
            $id = $timeline->id;
            $entries = TimeEntry::where('timeline_id', $id)->get();
            $timeline->time_entries()->attach($entries);
        }
        Schema::table('time_entries', function (Blueprint $table) {
            $table->dropColumn('timeline_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('time_entries', function (Blueprint $table) {
            $table->foreignId('timeline_id');
        });
        Schema::dropIfExists('time_entry_timeline');
    }
}
