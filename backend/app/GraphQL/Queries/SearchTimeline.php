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
    public function __invoke($_,  $args)
    {
        $guard = Auth::guard();
        $user_id = $guard->user()->id;
        $result = Timeline::where('user_id', $user_id)->where('name', 'LIKE', '%'. implode($args) . '%')->get();

        return $result;
    }
}