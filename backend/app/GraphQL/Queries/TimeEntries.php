<?php

namespace App\GraphQL\Queries;
use App\Models\TimeEntry;

class TimeEntries
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $entries = TimeEntry::leftJoin('time_entry_timeline', 'time_entries.id','time_entry_timeline.time_entry_id')->whereIn('timeline_id', $args['timeline_ids'])->get()->unique('time_entry_id');
        foreach ($entries as $entry) {
            $entry['id'] = $entry['time_entry_id'];
        }
        return $entries;
    }
}
