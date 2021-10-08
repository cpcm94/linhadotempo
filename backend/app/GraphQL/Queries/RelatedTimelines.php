<?php

namespace App\GraphQL\Queries;
use App\Models\Timeline;

class RelatedTimelines
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $timeline = Timeline::find($args);
        $entries = $timeline[0]->time_entries()->withCount('timelines')->get();
        $relatedTimelineIds = $entries->map(function($entry) {
            return $entry->timelines()->get(['timeline_id']);
        })->flatten()->map(function($timeline) {
            return $timeline->timeline_id;
        })->unique()->toArray();
        $relatedTimelines = Timeline::find($relatedTimelineIds);
        if (sizeof($entries) === 0) {
            return $timeline;
        } else {
            return $relatedTimelines;
        }
    }
}
