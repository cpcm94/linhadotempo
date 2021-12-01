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
            $resolution_string = $request->resolution ? 'resolution=' . $request->resolution : null;
            $name_of_resized_image = substr($request->name, 0, strpos($request->name, '.')) . $resolution_string . substr(strrchr($request->name, '.'), 0);

            $client->registerStreamWrapper();

            if ($client->doesObjectExist($bucket, $name_of_resized_image)) {
                $data = file_get_contents('s3://'.$bucket.'/'.$name_of_resized_image);

                return response($data)->header('Content-Type', $type);
            } else {
                $height = substr(strrchr($request->resolution, 'x'), 1);
                $width = substr($request->resolution, 0, strpos($request->resolution, 'x'));
                   
                $data = file_get_contents('s3://'.$bucket.'/'.$key);
                
                $img = new \Imagick();
                $img->readImageBlob($data);
                $img->resizeImage($width, $height, null, 1);
                
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
