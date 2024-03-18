<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MetodePembayaranController;
use App\Http\Controllers\RoleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("/login", [AuthController::class, "login"]);
Route::post("/register", [AuthController::class, "register"]);

Route::group(['middleware' => ['auth:api']], function () {
    Route::controller(AuthController::class)->group(function(){
        Route::post("/logout", "logout");
        Route::post("/change_password", "change_password");
    });

    Route::controller(RoleController::class)->group(function(){
        Route::get("/role", "index");
        Route::post("/role", "store");
        Route::get("/role/{role}", "show");
        Route::patch("/role/{role}", "update");
        Route::delete("/role/{role}", "destroy");
    });

    Route::controller(CategoryController::class)->group(function(){
        Route::get("/categories", "index");
        Route::post("/categories", "store");
        Route::get("/categories/{categories}", "show");
        Route::patch("/categories/{categories}", "update");
        Route::delete("/categories/{categories}", "destroy");
    });

    Route::apiResource('/metode-pembayaran', MetodePembayaranController::class);
});
