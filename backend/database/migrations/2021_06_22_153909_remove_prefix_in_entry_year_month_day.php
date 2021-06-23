<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemovePrefixInEntryYearMonthDay extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('time_entries', function (Blueprint $table) {
            $table->dropColumn('entry_year');
            $table->dropColumn('entry_month');
            $table->dropColumn('entry_day');
            $table->integer('year');
            $table->integer('month');
            $table->integer('day');
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
            $table->dropColumn('day');
            $table->dropColumn('month');
            $table->dropColumn('year');
            $table->integer('entry_day');     
            $table->integer('entry_month');
            $table->integer('entry_year');
           });
    }
}
