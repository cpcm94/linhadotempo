<?php

namespace App\GraphQL\Mutations;
use App\Models\Image;

class SetMainImage
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $image = Image::find($args)[0];

        $time_entry = $image->time_entry()->get()[0];
        $time_entry_images = $time_entry->images()->get();

        $filtered_current_main_image = $time_entry_images->first(function ($image) {
            return $image->is_main_image === 1;
        });
        if ($filtered_current_main_image) {
            $filtered_current_main_image->is_main_image = 0;
            $filtered_current_main_image->save();
        }

        $image->is_main_image = 1;
        $image->save();

        return $image;

    }
}
