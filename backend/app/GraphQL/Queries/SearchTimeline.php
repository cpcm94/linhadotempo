<?php

namespace App\GraphQL\Queries;
use App\Models\Timeline;
use Illuminate\Support\Facades\Auth;

class SearchTimeline
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $guard = Auth::guard();
        $user_id = $guard->user()->id;
        $search_string = $args["search"];
        $timeline_category_ids = $args['timeline_categories'];
        if (strlen($search_string) !== 0 && ! $timeline_category_ids) {

            $result = Timeline::where('user_id', $user_id)
            ->where('name', 'LIKE', '%'. $search_string . '%')
            ->get();
            
            return $result;
        } else if (strlen($search_string) === 0 && $timeline_category_ids) {

            $timelines_by_user = Timeline::leftJoin('timeline_timeline_category', 'timelines.id', 'timeline_timeline_category.timeline_id')
            ->where('user_id', $user_id);

            foreach($timeline_category_ids as $timeline_category_id) {
                $timelines_by_user->whereHas('timeline_categories', function($q) use ($timeline_category_id) {
                    $q->where('timeline_category_id', $timeline_category_id);
                });
            }

            $result = $timelines_by_user->get()->unique('timeline_id');

            foreach ($result as $timeline) {
                $timeline['id'] = $timeline['timeline_id'];
            }

            return $result;
        } else if (strlen($search_string) !== 0 &&  $timeline_category_ids) {

            $timelines_by_user = Timeline::leftJoin('timeline_timeline_category', 'timelines.id', 'timeline_timeline_category.timeline_id')
            ->where('user_id', $user_id);

            foreach($timeline_category_ids as $timeline_category_id) {
                $timelines_by_user->whereHas('timeline_categories', function($q) use ($timeline_category_id) {
                    $q->where('timeline_category_id', $timeline_category_id);
                });
            }

           $result =  $timelines_by_user->where('name', 'LIKE', '%'. $search_string . '%')
            ->get()
            ->unique('timeline_id');

            foreach ($result as $timeline) {
                $timeline['id'] = $timeline['timeline_id'];
            }

            return $result;
        }
    }
}