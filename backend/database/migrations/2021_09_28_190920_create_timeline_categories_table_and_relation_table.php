<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTimelineCategoriesTableAndRelationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('timeline_categories', function (Blueprint $table) {
            $table->id();
            $table->string('category', 255);
            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
        Schema::create('timeline_timeline_category', function (Blueprint $table) {
            $table->id();
            $table->foreignId('timeline_category_id')->references('id')->on('timeline_categories')->onDelete('cascade');
            $table->foreignId('timeline_id')->references('id')->on('timelines')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('timeline_categories');
        Schema::dropIfExists('timeline_timeline_category');
    }
}
