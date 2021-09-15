<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveCascadeOnTimeEntries extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('time_entries', function (Blueprint $table) {
            $table->dropForeign(['book_id']);
            $table->dropColumn('book_id');
            $table->foreignId('book_id')->references('id')->on('books');
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
        $table->dropForeign(['book_id']);
        $table->dropColumn('book_id');
        $table->foreignId('book_id')->references('id')->on('books')->onDelete('cascade');
        });
    }
}
