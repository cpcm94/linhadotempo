<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('.well-known/acme-challenge/5bPkaLXJyVMWN836oLTB_iY3AQYcuOsp32Z7zIMxKnI', function () {
    return '5bPkaLXJyVMWN836oLTB_iY3AQYcuOsp32Z7zIMxKnI.g13JtcJ4Icokvy7fKOM3Gg8XUDR4o86wJcErExT5Asg';
});