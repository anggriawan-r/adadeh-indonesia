<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/categories",
     *     summary="Get all Category",
     *     description="Get all Category data",
     *     operationId="getAllCategory",
     *     tags={"Category"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Categorys in the app"),
     *         )
     *     ),
     * )
     */
    public function index(){
        $category = Category::all();
        return response()->json([
            "status"    =>  true,
            "message"   =>  "Categories in the app",
            "data"      =>  $category
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/categories",
     *     summary="Post a Category",
     *     description="Post a Category data",
     *     operationId="PostCategory",
     *     security={{ "bearerAuth": {} }},
     *     tags={"Category"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Add a Category",
     *         @OA\Property(property="name", type="string", example="shoes")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Categorys in the app"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=419,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="object",
     *                  @OA\Property(property="name", type="array",
     *                      @OA\Items(type="string", example="The name is required"),
     *                  ),
     *             ),
     *         )
     *     ),
     * )
     */
    public function store(Request $request){
        $validate = Validator::make($request->all(), [
            "name"  =>  "required|unique:categories,name"
        ]);
        if($validate->fails()){
            return response()->json([
                "status"    =>  false,
                "message"   =>  $validate->errors()
            ], 419);
        }
        $category = Category::create($request->all());
        return response()->json([
            "status"    =>  true,
            "message"   =>  "Category created successfully",
            "data"      =>  $category
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/categories/:id",
     *     summary="Get a Category by id",
     *     description="Get a Category by id",
     *     operationId="getCategory",
     *     tags={"Category"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Categorys in the app"),
     *             @OA\Property(property="data", type="object", example="[]"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Category not found"),
     *         )
     *     ),
     * )
     */
    public function show($id){
        $category = Category::find($id);
        if($category){
            return response()->json([
                "status"    =>  true,
                "message"   =>  "Category = $category->name",
                "data"      =>  $category
            ]);
        }else{
            return response()->json([
                "status"    =>  false,
                "message"   =>  "Category not found"
            ], 404);
        }
    }

    /**
     * @OA\Patch(
     *     path="/api/categories/:id",
     *     summary="Patch a Category",
     *     description="Patch a Category data",
     *     operationId="PatchCategory",
     *     security={{ "bearerAuth": {} }},
     *     tags={"Category"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Add a Category",
     *         @OA\Property(property="name", type="string", example="shoes")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Categories in the app"),
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
     *             @OA\Property(property="message", type="string", example="Category not found"),
     *         )
     *     ),
     * )
     */
    public function update(Request $request, $id){
        $validate = Validator::make($request->all(), [
            "name"  =>  "required|unique:categories,name"
        ]);
        if($validate->fails()){
            return response()->json([
                "status"    =>  false,
                "message"   =>  $validate->errors()
            ]);
        }
        $category = Category::find($id);
        if($category){
            $category->update($request->all());
            return response()->json([
                "status"    =>  true,
                "message"   =>  "Category successfully updated",
                "data"      =>  $category
            ]);
        }else{
            return response()->json([
                "status"    =>  false,
                "message"   =>  "Category not found"
            ], 404);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/categories/:id",
     *     summary="Delete a Category by id",
     *     description="Delete a Category by id",
     *     operationId="DeleteCategory",
     *     security={{ "bearerAuth": {} }},
     *     tags={"Category"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Category successfully deleted"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Category not found"),
     *         )
     *     ),
     * )
     */
    public function destroy($id){
        $category = Category::find($id);
        if($category){
            $category->delete();
            return response()->json([
                "status"    =>  true,
                "message"   =>  "Category successfully deleted",
            ]);
        }else{
            return response()->json([
                "status"    =>  false,
                "message"   =>  "Category not found"
            ], 404);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/categories/:id/products",
     *     summary="Get a Category by id",
     *     description="Get a Category by id",
     *     operationId="getProducyByCategory",
     *     tags={"Category"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Categorys in the app"),
     *             @OA\Property(property="data", type="object", example="[]"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Category not found"),
     *         )
     *     ),
     * )
     */
    public function product(Request $request, $id){
        $category = Category::product_all_filter($request, $id);
        if($category){
            return response()->json([
                "status"    =>  true,
                "message"   =>  "Category = $category->name",
                "data"      =>  $category
            ]);
        }else{
            return response()->json([
                "status"    =>  false,
                "message"   =>  "Category not found"
            ], 404);
        }
    }
}
