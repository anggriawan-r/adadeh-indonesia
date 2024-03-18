<?php

namespace App\Http\Controllers;

use App\Models\WishList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WishListController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/wishlists",
     *     summary="Get all Wishlist",
     *     description="Get all Wishlist data",
     *     operationId="getAllWishlist",
     *     security={{ "bearerAuth": {} }},
     *     tags={"Wishlist"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Wishlists in the app"),
     *             @OA\Property(property="data", type="object",
     *                  @OA\Property(property="id", type="integer", example="1"),
     *                  @OA\Property(property="name", type="string", example="admin"),
     *                  @OA\Property(property="user", type="string", example="[]"),
     *             ),
     *         )
     *     ),
     * )
     */
    public function index()
    {
        $wishLists = WishList::get_all_product_by_userID();
        return response()->json([
            "status"    =>  true,
            "message"   =>  "Wishlist from user",
            "data"      =>  $wishLists
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/wishlists",
     *     summary="Post a Wishlist",
     *     description="Post a Wishlist data",
     *     operationId="PostWishlist",
     *     security={{ "bearerAuth": {} }},
     *     tags={"Wishlist"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Add a Wishlist",
     *         @OA\JsonContent(
     *              @OA\Property(property="product_id", type="string", example="Adidas")
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Wishlists in the app"),
     *             @OA\Property(property="data", type="object",
     *                  @OA\Property(property="id", type="integer", example="1"),
     *                  @OA\Property(property="name", type="string", example="admin"),
     *                  @OA\Property(property="user", type="string", example="[]"),
     *             ),
     *         )
     *     ),
     *     @OA\Response(
     *         response=419,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="object",
     *                  @OA\Property(property="name", type="array",
     *                      @OA\Items(type="string", example="The name is required")
     *                  ),
     *             ),
     *         )
     *     ),
     * )
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            "product_id"    =>  "required"
        ]);
        if($validate->fails()){
            return response()->json([
                "status"    =>  false,
                "message"   =>  $validate->errors()
            ], 419);
        }
        $wishList = WishList::create([
            "user_id"   =>  auth()->user()->id,
            "product_id"=>  $request->product_id
        ]);
        return response()->json([
            "status"    =>  true,
            "message"   =>  "Wishlist created successfully",
            "data"      =>  $wishList
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/wishlists/:id",
     *     summary="Get a Wishlist by id",
     *     description="Get a Wishlist by id",
     *     operationId="getWishlist",
     *     security={{ "bearerAuth": {} }},
     *     tags={"Wishlist"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Wishlists in the app"),
     *             @OA\Property(property="data", type="object",
     *                  @OA\Property(property="id", type="integer", example="1"),
     *                  @OA\Property(property="name", type="string", example="admin"),
     *                  @OA\Property(property="user", type="string", example="[]"),
     *             ),
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Wishlist not found"),
     *         )
     *     ),
     * )
     */
    public function show($id)
    {
        $wishList = Wishlist::find($id);
        if($wishList){
            return response()->json([
                "status"    =>  true,
                "message"   =>  "Wishlist",
                "data"      =>  $wishList
            ]);
        }else{
            return response()->json([
                "status"    =>  false,
                "message"   =>  "Wishlist not found"
            ], 404);
        }
    }

    /**
     * @OA\Patch(
     *     path="/api/wishlists/:id",
     *     summary="Patch a Wishlist",
     *     description="Patch a Wishlist data",
     *     operationId="PatchWishlist",
     *     security={{ "bearerAuth": {} }},
     *     tags={"Wishlist"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Add a Wishlist",
     *         @OA\Property(property="name", type="string", example="admin")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Wishlists in the app"),
     *             @OA\Property(property="data", type="object",
     *                  @OA\Property(property="id", type="integer", example="1"),
     *                  @OA\Property(property="name", type="string", example="admin"),
     *                  @OA\Property(property="user", type="string", example="[]"),
     *             ),
     *         )
     *     ),
     *     @OA\Response(
     *         response=419,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="object",
     *                  @OA\Property(property="name", type="array",
     *                      @OA\Items(type="string", example="The name is required")
     *                  ),
     *             ),
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Wishlist not found"),
     *         )
     *     ),
     * )
     */
    public function update(Request $request, $id)
    {
        $validate = Validator::make($request->all(), [
            "product_id"    =>  "required"
        ]);
        if($validate->fails()){
            return response()->json([
                "status"    =>  false,
                "message"   =>  $validate->errors()
            ], 419);
        }
        $wishList = WishList::find($id);
        if($wishList){
            $wishList->update([
                "user_id"   =>  auth()->user()->id,
                "product_id"=>  $request->product_id
            ]);
            return response()->json([
                "status"    =>  true,
                "message"   =>  "Wishlist successfully updated",
                "data"      =>  $wishList
            ]);
        }else{
            return response()->json([
                "status"    =>  false,
                "message"   =>  "Wishlist not found"
            ], 404);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/wishlists/:id",
     *     summary="Delete a Wishlist by id",
     *     description="Delete a Wishlist by id",
     *     operationId="DeleteWishlist",
     *     security={{ "bearerAuth": {} }},
     *     tags={"Wishlist"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Wishlist successfully deleted"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Wishlist not found"),
     *         )
     *     ),
     * )
     */
    public function destroy($id)
    {
        $wishList = WishList::find($id);
        if($wishList){
            $wishList->delete();
            return response()->json([
                "status"    =>  true,
                "message"   =>  "Wishlist successfully deleted"
            ]);
        }else{
            return response()->json([
                "status"    =>  false,
                "message"   =>  "Wishlist not found"
            ], 404);
        }
    }
}
