<?php

namespace App\GraphQL\Mutations;
use App\Models\Timeline;

class DeleteTimeline
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $timeline = Timeline::find($args);
        $time_entries = $timeline[0]->time_entries()->get();
        foreach ($time_entries as $time_entry) {
            if ($time_entry->timelines()->count() === 1) {
                $time_entry->delete();
            }
        }
        $time_entries_with_count = $timeline[0]->time_entries()->withCount('timelines')->get()->toArray();
        $filteredTimeline = array_filter($time_entries_with_count, function($time_entry){
            return $time_entry['timelines_count'] === 1;
        } );
        if (count($filteredTimeline) === 0) {
            $timeline[0]->delete();
            return ['message' => 'Linha do tempo e acontecimentos deletados com sucesso', 'success' => true];
        } else {
            return ['message' => 'Falha ao deletar os acontecimentos da linha do tempo', 'success' => false];
        }
    }
}
