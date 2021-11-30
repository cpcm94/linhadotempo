<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
            $s3 = \Storage::disk('s3');
            $adapter = $s3->getDriver()->getAdapter();
            $client = $adapter->getClient();
            $bucket = $adapter->getBucket();
            $key = $request->name;
            
            $height = substr(strrchr($request->size, 'x'), 1);
            $width = substr($request->size, 0, strpos($request->size, 'x'));
            
            $client->registerStreamWrapper();
            
            $data = file_get_contents('s3://'.$bucket.'/'.$key);
            
            $img = new \Imagick();
            $img->readImageBlob($data);
            $img->resizeImage($width, $height, null, 1);

            echo '<img src="data:image/jpg;base64,'.base64_encode($img).'"/>';

            // $encoded_img_blob = base64_encode($img);
            // return response()->json(['image_blob' => $encoded_img_blob]);
    }
}
