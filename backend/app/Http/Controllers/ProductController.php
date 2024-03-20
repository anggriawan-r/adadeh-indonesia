<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/products",
     *     summary="Get all Product",
     *     description="Get all Product data",
     *     operationId="getProduct",
     *     tags={"Product"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Products in the app"),
     *             @OA\Property(property="data", type="string", example="[]"),
     *         )
     *     ),
     * )
     */
    public function index(Request $request)
    {
        $product = Product::product_all_filter($request);
        return response()->json([
            "status"    =>  true,
            "message"   =>  "Products in the app",
            "data"      =>  $product
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/produts",
     *     summary="Post a Product",
     *     description="Post a Product data",
     *     operationId="PostProduct",
     *     security={{ "bearerAuth": {} }},
     *     tags={"Product"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Add a Product",
     *         @OA\Property(property="name", type="string", example="shoes"),
     *         @OA\Property(property="description", type="string", example="new brand"),
     *         @OA\Property(property="stock", type="string", example="20"),
     *         @OA\Property(property="price", type="string", example="120000"),
     *         @OA\Property(property="category_id", type="string", example="1"),
     *         @OA\Property(property="image", type="file", example="shoes"),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Products in the app"),
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
            "name"          =>  "required|unique:products,name",
            "description"   =>  "required",
            "stock"         =>  "required",
            "price"         =>  "required",
            "category_id"   =>  "required",
            "image"         =>  "required|image|mimes:jpeg,png,jpg,gif,svg|max:1024"
        ]);

        if($validate->fails()){
            return response()->json([
                "status"    =>  false,
                "message"   =>  $validate->errors()
            ], 419);
        }

        $image = $request->file('image');
        $image->storeAs('public/products', $image->hashName());

        $product = Product::create([
            "name"  =>  $request->name,
            "description"   =>  $request->description,
            "stock" =>  $request->stock,
            "price" =>  $request->price,
            "category_id"   =>  $request->category_id,
            "image" =>  $image->hashName()
        ]);

        return response()->json([
            "status"    =>  true,
            "message"   =>  "Product created successfully",
            "data"      =>  $product
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/products/:id",
     *     summary="Get a product by id",
     *     description="Get a product by id",
     *     operationId="getproduct",
     *     tags={"Product"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="products in the app"),
     *             @OA\Property(property="data", type="object", example="[]"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="product not found"),
     *         )
     *     ),
     * )
     */
    public function show($id)
    {
        $product = Product::product_category_name($id);
        if($product){
            return response()->json([
                "status"    =>  true,
                "message"   =>  "Product = $product->name",
                "data"      =>  $product
            ]);
        }else{
            return response()->json([
                "status"    =>  false,
                "message"   =>  "Product not found"
            ], 404);
        }
    }

    /**
     * @OA\Patch(
     *     path="/api/products/:id",
     *     summary="Patch a Product",
     *     description="Patch a Product data",
     *     operationId="PatchProduct",
     *     security={{ "bearerAuth": {} }},
     *     tags={"Product"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Add a Product",
     *         @OA\Property(property="name", type="string", example="shoes"),
     *         @OA\Property(property="description", type="string", example="new brand"),
     *         @OA\Property(property="stock", type="string", example="20"),
     *         @OA\Property(property="price", type="string", example="120000"),
     *         @OA\Property(property="category_id", type="string", example="1"),
     *         @OA\Property(property="image", type="file", example="shoes"),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="products in the app"),
     *             @OA\Property(property="data", type="object", example="[]"),
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
     *             @OA\Property(property="message", type="string", example="Product not found"),
     *         )
     *     ),
     * )
     */
    public function update(Request $request, $id)
    {
        $validate = Validator::make($request->all(), [
            "name"          =>  "required|unique:products,name",
            "description"    =>  "required",
            "stock"         => "required",
            "price"         =>  "requied",
            "category_id"   =>  "required",
            "image"         =>  "required|image|mimes:jpeg,png,jpg,gif,svg|max:1024"
        ]);

        if($validate->fails()){
            return response()->json([
                "status"    =>  false,
                "message"   =>  $validate->errors()
            ], 419);
        }

        $product = Product::find($id);
        if($product){
            $image = $request->file('image');
            $image->storeAs('public/products', $image->hashName());
            Storage::delete('public/posts/'.basename($product->image));
            $product->update([
                "name"  =>  $request->name,
                "description"   =>  $request->description,
                "stock" =>  $request->stock,
                "price" =>  $request->price,
                "category_id"   =>  $request->category_id,
                "image" =>  $image->hashName()
            ]);
            return response()->json([
                "status"    =>  true,
                "message"   =>  "Product successfully updated",
                "data"      =>  $product
            ]);
        }else{
            return response()->json([
                "status"    =>  false,
                "message"   =>  "Product not found"
            ], 404);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/products/:id",
     *     summary="Delete a Product by id",
     *     description="Delete a Product by id",
     *     operationId="DeleteProduct",
     *     security={{ "bearerAuth": {} }},
     *     tags={"Product"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Product successfully deleted"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Product not found"),
     *         )
     *     ),
     * )
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        if($product){
            $product->delete();
            return response()->json([
                "status"    =>  true,
                "message"   =>  "Product successfully deleted",
            ]);
        }else{
            return response()->json([
                "status"    =>  false,
                "message"   =>  "Product not found"
            ], 404);
        }
    }
}
