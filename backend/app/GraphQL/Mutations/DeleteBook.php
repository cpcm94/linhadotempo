<?php

namespace App\GraphQL\Mutations;

class DeleteBook
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $book = Book::find($args);
        $time_entries = $book->time_entries()->get();
        foreach ($time_entries as $time_entry) {
            $time_entry->book_id = null;
            $time_entry->save();
        }
        if (!$time_entries[0]) {

            $book->delete();

            return ['message' => 'Livro deletado com sucesso', 'success'=> true];
        } else {
            return ['message' => 'Falha ao deletar livro', 'success'=> false];
        }
    }
}
