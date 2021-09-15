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
            $table->string('author', 255)->nullable();
            $table->string('edition', 255)->nullable();
            $table->string('publisher', 255)->nullable();
            $table->date('publishing_date')->nullable();
            $table->timestamps();
        });
        Schema::table('time_entries', function (Blueprint $table) {
            $table->foreignId('book_id')->nullable()->references('id')->on('books');
            $table->integer('book_page')->nullable();
            $table->string('source_url', 255)->nullable();
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
            $table->dropColumn('source_url');
            $table->dropColumn('page');
            $table->dropForeign(['book_id']);
            $table->dropColumn('book_id');
        });
        Schema::dropIfExists('books');
    }
}
