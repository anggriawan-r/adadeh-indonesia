<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\KeranjangController;
use App\Http\Controllers\MetodePembayaranController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TransaksiController;
use App\Http\Controllers\WishListController;
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

Route::controller(RoleController::class)->group(function () {
    Route::get("/roles", "index");
    Route::post("/roles", "store");
    Route::get("/roles/{roles}", "show");
    Route::patch("/roles/{roles}", "update");
    Route::delete("/roles/{roles}", "destroy");
});

Route::controller(CategoryController::class)->group(function () {
    Route::get("/categories", "index");
    Route::post("/categories", "store");
    Route::get("/categories/{categories}", "show");
    Route::patch("/categories/{categories}", "update");
    Route::delete("/categories/{categories}", "destroy");
    Route::get("/categories/{categories}/products", "product");
});

Route::controller(ProductController::class)->group(function () {
    Route::get("/products", "index");
    Route::post("/products", "store");
    Route::get("/products/{products}", "show");
    Route::patch("/products/{products}", "update");
    Route::delete("/products/{products}", "destroy");

});

Route::group(['middleware' => ['auth:api']], function () {
    Route::controller(AuthController::class)->group(function () {
        Route::post("/logout", "logout");
        Route::post("/change_password", "change_password");
    });

    Route::controller(WishListController::class)->group(function () {
        Route::get("/wishlists", "index");
        Route::post("/wishlists", "store");
        Route::get("/wishlists/{wishlists}", "show");
        Route::patch("/wishlists/{wishlists}", "update");
        Route::delete("/wishlists/{wishlists}", "destroy");
    });
    Route::apiResource('/metode-pembayaran', MetodePembayaranController::class);
    Route::apiResource('/transaksi', TransaksiController::class);
    Route::apiResource('/keranjang', KeranjangController::class);
});
