<?php

namespace App\GraphQL\Mutations;
use App\Models\Image;

class UnsetMainImage
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $image = Image::find($args)[0];

        $image->is_main_image = 0;
        $image->save();

        return $image;
    }
}
