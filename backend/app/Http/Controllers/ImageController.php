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

            $name_of_resized_image = substr($request->name, 0, strpos($request->name, '.')) . 'resolution=' . $request->resolution . substr(strrchr($request->name, '.'), 0);

            $client->registerStreamWrapper();

            if ($client->doesObjectExist($bucket, $name_of_resized_image)) {
                $data = file_get_contents('s3://'.$bucket.'/'.$name_of_resized_image);

                echo '<img src="data:image/jpg;base64,'.base64_encode($data).'"/>';
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
                    'ContentType' => 'image/' . substr(strrchr($request->name, '.'), 1),
                    'Body' => $img->getImageBlob(),
                ]);
                
                echo '<img src="data:image/jpg;base64,'.base64_encode($img).'"/>';
            }

    }
}
