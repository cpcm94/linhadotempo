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
