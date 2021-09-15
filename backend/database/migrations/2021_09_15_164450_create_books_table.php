<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('book_name', 255);
            $table->string('edition', 255)->nullable();
            $table->string('publisher', 255)->nullable();
            $table->date('publishing_date')->nullable();
            $table->timestamps();
        });

        Schema::table('time_entries', function (Blueprint $table) {
            $table->integer('book_page');
            $table->string('source_url', 255);
            $table->foreignId('book_id')->references('id')->on('books')->onDelete('cascade');
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
            $table->dropColumn('source_url');
            $table->dropColumn('page');
        });
        Schema::dropIfExists('books');
    }
}
