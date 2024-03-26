<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RoleController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/roles",
     *     summary="Get all Role",
     *     description="Get all Role data",
     *     operationId="getAllRole",
     *     security={{ "bearerAuth": {} }},
     *     tags={"Role"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Roles in the app"),
     *             @OA\Property(property="data", type="object",
     *                  @OA\Property(property="id", type="integer", example="1"),
     *                  @OA\Property(property="name", type="string", example="admin"),
     *                  @OA\Property(property="user", type="string", example="[]"),
     *             ),
     *         )
     *     ),
     * )
     */
    public function index(){
        $role = Role::role_all_user_name();
        return response()->json([
            "status"    =>  true,
            "message"   =>  "Roles in the app",
            "data"      =>  $role
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/roles",
     *     summary="Post a Role",
     *     description="Post a Role data",
     *     operationId="PostRole",
     *     security={{ "bearerAuth": {} }},
     *     tags={"Role"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Add a Role",
     *         @OA\JsonContent(
     *              @OA\Property(property="name", type="string", example="admin")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Roles in the app"),
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
    public function store(Request $request){
        $validate = Validator::make($request->all(), [
            "name"  =>  "required|unique:roles,name"
        ]);
        if($validate->fails()){
            return response()->json([
                "status"    =>  false,
                "message"   =>  $validate->errors()
            ], 419);
        }
        $role = Role::create($request->all());
        return response()->json([
            "status"    =>  true,
            "message"   =>  "Role created successfully",
            "data"      =>  $role
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/roles/:id",
     *     summary="Get a Role by id",
     *     description="Get a Role by id",
     *     operationId="getRole",
     *     security={{ "bearerAuth": {} }},
     *     tags={"Role"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Roles in the app"),
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
     *             @OA\Property(property="message", type="string", example="Role not found"),
     *         )
     *     ),
     * )
     */
    public function show($id){
        $role = Role::role_user_name($id);
        if($role){
            return response()->json([
                "status"    =>  true,
                "message"   =>  "Role = $role->name",
                "data"      =>  $role
            ]);
        }else{
            return response()->json([
                "status"    =>  false,
                "message"   =>  "Role not found"
            ], 404);
        }
    }

    /**
     * @OA\Patch(
     *     path="/api/roles/:id",
     *     summary="Patch a Role",
     *     description="Patch a Role data",
     *     operationId="PatchRole",
     *     security={{ "bearerAuth": {} }},
     *     tags={"Role"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Add a Role",
     *         @OA\JsonContent(
     *              @OA\Property(property="name", type="string", example="admin")
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Roles in the app"),
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
     *             @OA\Property(property="message", type="string", example="Role not found"),
     *         )
     *     ),
     * )
     */
    public function update(Request $request, $id){
        $validate = Validator::make($request->all(), [
            "name"  =>  "required|unique:roles,name"
        ]);
        if($validate->fails()){
            return response()->json([
                "status"    =>  false,
                "message"   =>  $validate->errors()
            ]);
        }
        $role = Role::find($id);
        if($role){
            $role->update($request->all());
            return response()->json([
                "status"    =>  true,
                "message"   =>  "Role successfully updated",
                "data"      =>  $role
            ]);
        }else{
            return response()->json([
                "status"    =>  false,
                "message"   =>  "Role not found"
            ], 404);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/roles/:id",
     *     summary="Delete a Role by id",
     *     description="Delete a Role by id",
     *     operationId="DeleteRole",
     *     security={{ "bearerAuth": {} }},
     *     tags={"Role"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Role successfully deleted"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message", type="string", example="Role not found"),
     *         )
     *     ),
     * )
     */
    public function destroy($id){
        $role = Role::find($id);
        if($role){
            $role->delete();
            return response()->json([
                "status"    =>  true,
                "message"   =>  "Role successfully deleted",
            ]);
        }else{
            return response()->json([
                "status"    =>  false,
                "message"   =>  "Role not found"
            ], 404);
        }
    }
}
