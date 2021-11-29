<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('api')->post('/uploadToken', function (Request $request)
{

    $s3 = Storage::disk('s3');
    $client = $s3->getDriver()->getAdapter()->getClient();
    $expiry = "+10 minutes";

    $cmd = $client->getCommand('PutObject', [
        'Bucket' => env('AWS_BUCKET'),
        'Key' => $request->name,
    ]);

    $request = $client->createPresignedRequest($cmd, $expiry);

    $presignedUrl = (string)$request->getUri();

    return response()->json(['uploadURL' => $presignedUrl], 200);
});

Route::middleware('api')->post('/resizeImg', function (Request $request){

    $s3 = Storage::disk('s3');
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

    $encoded_img_blob = base64_encode($img);

    return response()->json(['image_blob' => $encoded_img_blob]);

});
