<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
  /**
   * @OA\Post(
   *     path="/api/register",
   *     tags={"Auth"},
   *     summary="Register",
   *     description="Registers a new user",
   *     operationId="authRegister",
   *     @OA\RequestBody(
   *         required=true,
   *         description="If the role is assigned",
   *         @OA\JsonContent(
   *             type="object",
   *             @OA\Property(property="name", type="string", example="Username"),
   *             @OA\Property(property="email", type="string", format="email", example="username@gmail.com"),
   *             @OA\Property(property="password", type="string", example="Password value of at least 8"),
   *             @OA\Property(property="password_confirmation", type="string", example="The value must be the same as the password"),
   *             @OA\Property(property="role_id", type="integer", example="1"),
   *         )
   *     ),
   *     @OA\RequestBody(
   *         required=true,
   *         description="If the role is not assigned",
   *         @OA\JsonContent(
   *             type="object",
   *             @OA\Property(property="name", type="string", example="Username"),
   *             @OA\Property(property="email", type="string", format="email", example="username@gmail.com"),
   *             @OA\Property(property="password", type="string", example="Password value of at least 8"),
   *             @OA\Property(property="password_confirmation", type="string", example="The value must be the same as the password"),
   *         )
   *     ),
   *     @OA\Response(
   *        response=419,
   *        description="Validation Error",
   *        @OA\JsonContent(
   *           @OA\Property(property="response_code", type="string", example="422"),
   *           @OA\Property(property="message", type="string", example="The given data was invalid."),
   *           @OA\Property(property="errors", type="object",
   *               @OA\Property(property="name", type="array",
   *                 @OA\Items(type="string", example="The name field is required")),
   *               @OA\Property(property="email", type="array",
   *                 @OA\Items(type="string", example="The email field is required")),
   *               @OA\Property(property="password", type="array",
   *                 @OA\Items(type="string", example="The password field is required")),
   *               @OA\Property(property="password_confirmation", type="array",
   *                 @OA\Items(type="string", example="The password_confirmation field is required")),
   *           ),
   *        ),
   *     ),
   *     @OA\Response(
   *         response="200",
   *         description="Successful Register",
   *         @OA\JsonContent(
   *             @OA\Property(property="status", type="boolean", example="true"),
   *             @OA\Property(property="message",type="string",example="Account created successfully",),
   *             @OA\Property(property="data", type="object")
   *         )
   *     )
   * )
   */
  public function register(Request $request)
  {
    $validate = Validator::make($request->all(), [
      "name"      => "required",
      "email"     => "required|email|unique:users",
      "password"  => "required|confirmed|min:8"
    ]);

    if ($validate->fails()) {
      return response()->json([
        "status"    =>  false,
        "message"   =>  $validate->errors()
      ], 419);
    }

    if ($request->role_id) {
      $user = User::create([
        "name"      => $request->name,
        "email"     => $request->email,
        "password"  => Hash::make($request->password),
        "role_id"   =>  $request->role_id
      ]);
    } else {
      $user = User::create([
        "name"      => $request->name,
        "email"     => $request->email,
        "password"  => Hash::make($request->password),
        "role_id"   =>  "2"
      ]);
    }
    return response()->json([
      "status"    => true,
      "message"   => "Account created successfully",
      "data"      => $user
    ]);
  }

  /**
   * @OA\Post(
   *     path="/api/login",
   *     tags={"Auth"},
   *     summary="Login",
   *     operationId="authLogin",
   * @OA\RequestBody(
   *    required=true,
   *    description="Pass user login input",
   *    @OA\JsonContent(
   *       required={"email","password"},
   *       @OA\Property(property="email", type="string", format="email", example="user@example.com"),
   *       @OA\Property(property="password", type="string", format="password", example="Password value of at least 8"),
   *    ),
   * ),
   * @OA\Response(
   *    response=419,
   *    description="Validation Error",
   *    @OA\JsonContent(
   *       @OA\Property(property="status", type="boolean", example="false"),
   *       @OA\Property(property="message", type="string", example="You are not logged in successfully"),
   *    ),
   * ),
   * @OA\Response(
   *    response=200,
   *    description="Success",
   *    @OA\JsonContent(
   *       @OA\Property(property="status", type="boolean", example="true"),
   *       @OA\Property(property="message", type="string", example="You are logged in successfully"),
   *       @OA\Property(property="data", type="object",
   *          @OA\Property(property="token", type="string", example="Top secret"),
   *          @OA\Property(property="user", type="object",
   *              @OA\Property(property="name", type="string", example="Username"),
   *              @OA\Property(property="email", type="string", format="email", example="username@gmail.com"),
   *          ),
   *      ),
   *     )
   *   )
   * )
   */
  public function login()
  {
    $credentials = request(['email', 'password']);
    if (!$token = auth()->attempt($credentials)) {
      return response()->json([
        'status'    =>  false,
        'message'   => 'You are not logged in successfully'
      ]);
    }
    $user = User::user_data();
    return response()->json([
      'status'    => true,
      'message'   => "You are logged in successfully",
      'data'      => [
        "token" =>  $token,
        "user"  =>  $user,
      ],
    ]);
  }

  /**
   * @OA\Post(
   *     path="/api/logout",
   *     summary="logout",
   *     description="logout",
   *     operationId="logout",
   *     tags={"Auth"},
   *     security={{ "bearerAuth": {} }},
   *     @OA\Response(
   *         response=201,
   *         description="get auth data",
   *         @OA\JsonContent(
   *             @OA\Property(property="status", type="boolean", example="true"),
   *             @OA\Property(property="message", type="string", example="You are successfully logged out"),
   *         )
   *     ),
   * )
   */
  public function logout()
  {
    auth()->logout();

    return response()->json([
      "status"    =>  true,
      'message'   => 'You are successfully logged out',
    ]);
  }

  /**
   * @OA\Post(
   *     path="/api/update-data",
   *     summary="update-data",
   *     description="update-data",
   *     operationId="update-data",
   *     tags={"Auth"},
   *     security={{ "bearerAuth": {} }},
   * @OA\RequestBody(
   *    required=true,
   *    description="Reser password",
   *    @OA\JsonContent(
   *       required={"password_confirmation","password"},
   *       @OA\Property(property="password", type="string", format="password", example="Password value of at least 8"),
   *       @OA\Property(property="password_confirmation", type="string", format="password_confirmation", example="The value must be the same as the password"),
   *    ),
   *    @OA\JsonContent(
   *       required={"address"},
   *       @OA\Property(property="address", type="string", example="Online"),
   *    ),
   *    @OA\JsonContent(
   *       required={"phone"},
   *       @OA\Property(property="phone", type="string", example="081234567890"),
   *    ),
   * ),
   *     @OA\Response(
   *         response=200,
   *         description="You successfully update data",
   *         @OA\JsonContent(
   *             @OA\Property(property="status", type="boolean", example="true"),
   *             @OA\Property(property="message", type="string", example="You successfully update data"),
   *         )
   *     ),
   *     @OA\Response(
   *         response=404,
   *         description="Account not found",
   *         @OA\JsonContent(
   *             @OA\Property(property="status", type="boolean", example="false"),
   *             @OA\Property(property="message", type="string", example="Account not found")
   *         ),
   *     ),
   * )
   */
  public function update_user(Request $request)
  {
    $user = User::find(auth()->user()->id);

    if ($request->password) {
      $request['password'] = Hash::make($request->password);
    }

    if ($user) {
      $user->update($request->all());
      return response()->json([
        "status"    =>  true,
        "message"   =>  "You successfully update data"
      ]);
    } else {
      return response()->json([
        "status"    =>  false,
        "message"   =>  "Account not found"
      ]);
    }
  }
}
