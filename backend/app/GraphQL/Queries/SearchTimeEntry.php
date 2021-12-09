<?php

namespace App\GraphQL\Queries;
use App\Models\TimeEntry;

class SearchTimeEntry
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $timeline_ids = $args["timeline_ids"];
        $search_string = $args["search"];
        $time_entry_category_ids = $args['time_entry_category_ids'];

        $entries = TimeEntry::leftJoin('time_entry_timeline', 'time_entries.id','time_entry_timeline.time_entry_id')->whereIn('timeline_id', $timeline_ids);

        
        if (strlen($search_string) !== 0 && ! $time_entry_category_ids) {
            
            
            $result = $entries->where('name', 'LIKE', '%'. $search_string . '%')->get()->unique('time_entry_id');
            
            foreach ($result as $entry) {
                $entry['id'] = $entry['time_entry_id'];
            }
            return $result;

        } else if (strlen($search_string) === 0 && $time_entry_category_ids) {

            foreach($time_entry_category_ids as $time_entry_category_id) {
                $entries->whereHas('time_entry_categories', function($q) use ($time_entry_category_id) {
                    $q->where('time_entry_category_id', $time_entry_category_id);
                });
            }

            $result = $entries->get()->unique('time_entry_id');

            foreach ($result as $entry) {
                $entry['id'] = $entry['time_entry_id'];
            }

            return $result;

        } else if (strlen($search_string) !== 0 &&  $time_entry_category_ids) {

            foreach($time_entry_category_ids as $time_entry_category_id) {
                $entries->whereHas('time_entry_categories', function($q) use ($time_entry_category_id) {
                    $q->where('time_entry_category_id', $time_entry_category_id);
                });
            }

           $result =  $entries->where('name', 'LIKE', '%'. $search_string . '%')
            ->get()
            ->unique('time_entry_id');

            foreach ($result as $entry) {
                $entry['id'] = $entry['time_entry_id'];
            }

            return $result;
        }
    }
}
