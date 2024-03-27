<?php

namespace App\Http\Controllers;

use App\Models\History;
use Illuminate\Http\Request;

class HistoryController extends Controller
{

    /**
   * @OA\Post(
   *     path="/api/histories",
   *     summary="History",
   *     description="History",
   *     operationId="all History",
   *     tags={"History"},
   *     security={{ "bearerAuth": {} }},
   *     @OA\RequestBody(
   *         @OA\JsonContent(
   *             @OA\Property(property="payment_id", type="integer", example=1),
   *             @OA\Property(property="name", type="string", example="Sepatu"),
   *             @OA\Property(property="price", type="integer", example=1000000),
   *             @OA\Property(property="quantity", type="integer", example=2),
   *         ),
   *     ),
   *     @OA\Response(
   *         response=201,
   *         description="get auth data",
   *         @OA\JsonContent(
   *             @OA\Property(property="status", type="boolean", example="true"),
   *             @OA\Property(property="message", type="string", example="History gat way"),
   *             @OA\Property(property="data", type="string", example="[]"),
   *         )
   *     ),
   * )
   */
    public function store(Request $request)
    {
        try {
            $history = History::insert($request->all());
            return response()->json([
                "status"    =>  true,
                "message"   =>  "History successfully created",
                "data"      =>  $history
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "status"    =>  false,
                "message"   =>  $th->getMessage()
            ]);
        }
    }
}
