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
        // function array_flatten($array = null) {
        //     $result = array();
        
        //     if (!is_array($array)) {
        //         $array = func_get_args();
        //     }
        
        //     foreach ($array as $key => $value) {
        //         if (is_array($value)) {
        //             $result = array_merge($result, array_flatten($value));
        //         } else {
        //             $result = array_merge($result, array($key => $value));
        //         }
        //     }
        
        //     return $result;
        // }
        
        // $res = array_flatten($args);
        $entries = TimeEntry::leftJoin('time_entry_timeline', 'time_entries.id','time_entry_timeline.time_entry_id')->whereIn('timeline_id', $args['timeline_ids'])->get()->unique('time_entry_id');
        foreach ($entries as $entry) {
            $entry['id'] = $entry['time_entry_id'];
        }
        return $entries;
    }
}
