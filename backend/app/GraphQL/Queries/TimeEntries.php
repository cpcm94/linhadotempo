<?php

namespace App\GraphQL\Queries;
use Illuminate\Support\Facades\DB;

class TimeEntries
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        // $entries = TimeEntry::leftJoin('time_entry_timeline', 'time_entries.id', 'time_entry_id')->
        // whereIn('timeline_id', $args)->whereColumn('time_entries.id', '=', 'time_entry_timeline.time_entry_id')->get();       
        $entriesIdCollection = DB::table('time_entry_timeline')->whereIn('timeline_id', $args)->distinct()->get('time_entry_id');
        $entriesId = array();
        foreach ($entriesIdCollection as $entry) {
            $entriesId[] = $entry->time_entry_id;
        }
        $entries = DB::table('time_entries')->whereIn('id', $entriesId)->get();
        return $entries;
    }
}
