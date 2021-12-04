<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableTimeEntryCategories extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('time_entry_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
        Schema::create('time_entry_time_entry_category', function (Blueprint $table) {
            $table->id();
            $table->foreignId('time_entry_category_id')->references('id')->on('time_entry_categories')->onDelete('cascade');
            $table->foreignId('time_entry_id')->references('id')->on('time_entries')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('time_entry_time_entry_category');
        Schema::dropIfExists('time_entry_categories');
    }
}
