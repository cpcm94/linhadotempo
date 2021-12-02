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
            $type = 'image/' . substr(strrchr($request->name, '.'), 1);
            $width_string = $request->width ? 'width=' . $request->width : null;
            $height_string = $request->height ? 'height=' . $request->height : null;
            $name_of_resized_image = substr($request->name, 0, strpos($request->name, '.')) . $width_string . $height_string . substr(strrchr($request->name, '.'), 0);

            $client->registerStreamWrapper();

            if ($client->doesObjectExist($bucket, $name_of_resized_image)) {
                $data = file_get_contents('s3://'.$bucket.'/'.$name_of_resized_image);

                return response($data)->header('Content-Type', $type);
            } else if ($request->height && $request->width) {
                $request_height = $request->height;
                $request_width = $request->width;
                $data = file_get_contents('s3://'.$bucket.'/'.$key);
                
                $img = new \Imagick();
                $img->readImageBlob($data);

                $height = $img->getImageHeight();
                $width = $img->getImageWidth();

                $old_ratio = $width / $height;
                $request_ratio = $request_width / $request_height;

                if($request_ratio > $old_ratio){
                    $new_width = $request_width;
                    $new_height = ($request_width / $width) * $height;
                }else{
                    $new_width = ($request_height / $height) * $width;
                    $new_height = $request_height;
                }

                $img->resizeImage($new_width, $new_height, \Imagick::FILTER_LANCZOS, 1, true);

                $img->cropImage($new_width, $new_height, 0, 0);
                
                $result = $client->putObject([
                    'Bucket' => $bucket,
                    'Key' => $name_of_resized_image,
                    'ContentType' => $type,
                    'Body' => $img->getImageBlob(),
                ]);

                return response($img->getImageBlob())->header('Content-Type', $type);

            } else if ($request->width && ! $request->height) {
                $request_width = $request->width;
                $data = file_get_contents('s3://'.$bucket.'/'.$key);
                
                $img = new \Imagick();
                $img->readImageBlob($data);

                $height = $img->getImageHeight();
                $width = $img->getImageWidth();

                if ($width > $request_width) {
                    $new_width = $request_width;
                    $new_height = ($request_width / $width) * $height;
                } else {
                    $new_width = $width;
                    $new_height = $height;
                }

                $img->resizeImage($new_width, $new_height, null, 1);

                $result = $client->putObject([
                    'Bucket' => $bucket,
                    'Key' => $name_of_resized_image,
                    'ContentType' => $type,
                    'Body' => $img->getImageBlob(),
                ]);

                return response($img->getImageBlob())->header('Content-Type', $type);
            }

    }
}
