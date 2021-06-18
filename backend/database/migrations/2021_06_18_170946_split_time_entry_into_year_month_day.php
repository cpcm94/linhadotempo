<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SplitTimeEntryIntoYearMonthDay extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('time_entries', function (Blueprint $table) {
            $table->dropColumn('entry_date');
            $table->integer('entry_year');
            $table->integer('entry_month');
            $table->integer('entry_day');
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
            $table->dropColumn('entry_day');
            $table->dropColumn('entry_month');
            $table->dropColumn('entry_year');
            $table->date('entry_date');
        });    }
}
