<?php
use App\Http\Controllers\Api\BlogController;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


// Admin routes
Route::middleware(['auth:sanctum','admin'])->group(function () {
    Route::post('/blogs',[BlogController::class,'store']);
    Route::get('/blogs',[BlogController::class,'index']);
    Route::put('/blogs/{id}',[BlogController::class,'update']);
    Route::delete('/blogs/{id}',[BlogController::class,'destroy']);
});

// User routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/blogs',[BlogController::class,'unseen']);
    Route::post('/blogs/{id}/view',[BlogController::class,'markViewed']);
});