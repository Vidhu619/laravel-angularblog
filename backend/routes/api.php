<?php
use App\Http\Controllers\Api\BlogController;

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