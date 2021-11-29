<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MigrateOldImageUrlsToImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('images', function (Blueprint $table) {
            $time_entries = TimeEntry::all();
            $only_time_entries_with_image_url = $time_entries->filter(function ($entry, $key) {
                return $entry->image_url !== null && $entry->image_url !== '';
            });
            foreach ($only_time_entries_with_image_url as $time_entry) {
                $image = new Image([                    
                'name' => 'Placeholder',
                'image_url' => $time_entry->image_url,
                'time_entry_id' => $time_entry->id]);
                $time_entry->images()->save($image);
            }
        });
        Schema::table('time_entries', function (Blueprint $table) {
            $table->dropColumn('image_url');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('images', function (Blueprint $table) {
            //
        });
    }
}
