<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MakeDayAndMonthNullable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('time_entries', function (Blueprint $table) {
            $table->integer('year')->nullable()->change();
            $table->integer('month')->nullable()->change();
            $table->integer('day')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $table->integer('day')->nullable(false)->change(); 
        $table->integer('month')->nullable(false)->change();
        $table->integer('year')->nullable(false)->change();
       }
}
