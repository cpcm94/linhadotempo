<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Timeline;

class RemoveBucketNameTimelinesUrl extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $timelines = Timeline::all();
        foreach ($timelines as $timeline) {
            if(str_starts_with($timeline->timelineIconImageUrl, 'http')) {
                $object_path = substr(strrchr($timeline->timelineIconImageUrl, '/'), 1);
                $timeline->timelineIconImageUrl = $object_path;
                $timeline->save();
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
