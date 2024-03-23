<?php

namespace App\Http\Controllers;

use App\Models\Keranjang;
use App\Http\Requests\StoreKeranjangRequest;
use App\Http\Requests\UpdateKeranjangRequest;
use Exception;
use Symfony\Component\HttpFoundation\Response;

class KeranjangController extends Controller
{
    protected $responseData = [
        'success' => false,
        'message' => '',
        'data' => null
    ];

    protected $responseCode = Response::HTTP_BAD_REQUEST;

    /**
     * @OA\Get(
     *     path="/api/keranjang",
     *     tags={"Keranjang"},
     *     summary="Get All Item Keranjang",
     *     description="Get All Item Keranjang",
     *     operationId="getKeranjang",
     *     @OA\Response(
     *         response="200",
     *         description="Daftar Keranjang Berhasil Ditemukan",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message",type="string",example="Daftar Keranjang Berhasil Ditemukan",),
     *             @OA\Property(property="data", type="object")
     *         )
     *     )
     * )
     */
    public function index()
    {
        try {
            $listKeranjang = Keranjang::all();
            $listKeranjang->load('produk');
            if(count($listKeranjang) > 0) {
                $this->responseData['message'] = 'Daftar Keranjang Berhasil Ditemukan';
            } else {
                $this->responseData['message'] = 'Daftar Keranjang Tidak Tersedia';
            }

            $this->responseData['success'] = true;
            $this->responseData['data'] = $listKeranjang;
            $this->responseCode = Response::HTTP_OK;
        } catch (\Throwable $th) {
            $this->responseData['message'] = $th->getMessage();
        }

        return response()->json($this->responseData, $this->responseCode);
    }

    /**
     * @OA\Post(
     *     path="/api/keranjang",
     *     tags={"Keranjang"},
     *     summary="Add Item Keranjang",
     *     description="Add Item Keranjang",
     *     operationId="postKeranjang",
     *     security={{ "bearerAuth": {} }},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="produkId", type="integer", example="1"),
     *             @OA\Property(property="jumlah", type="integer", example="2"),
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Successful Register",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message",type="string",example="Keranjang Berhasil Ditambahkan"),
     *             @OA\Property(property="data", type="object")
     *         )
     *     )
     * )
     */
    public function store(StoreKeranjangRequest $request)
    {
        try {
            $validated = $request->safe()->only(['jumlah', 'produkId', 'userId']);
            $jumlah = $validated['jumlah'];
            $produkId = $validated['produkId'];
            $userId = $validated['userId'];

            $keranjang = new Keranjang;
            $keranjang->jumlah = $jumlah;
            $keranjang->produk_id = $produkId;
            $keranjang->user_id = $userId;

            $keranjang->save();

            $this->responseData['message'] = 'Keranjang Berhasil Ditambahkan';
            $this->responseData['success'] = true;
            $this->responseData['data'] = $keranjang;
            $this->responseCode = Response::HTTP_CREATED;
        } catch (\Throwable $th) {
            $this->responseData['message'] = $th->getMessage();
        }

        return response()->json($this->responseData, $this->responseCode);
    }

    /**
     * @OA\Get(
     *     path="/api/keranjang/:id",
     *     tags={"Keranjang"},
     *     summary="Get Single Item Keranjang",
     *     description="Get Single Item Keranjang",
     *     operationId="getKeranjangById",
     *     @OA\Response(
     *         response="200",
     *         description="Daftar Keranjang Berhasil Ditemukan",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message",type="string",example="Daftar Keranjang Berhasil Ditemukan",),
     *             @OA\Property(property="data", type="object")
     *         )
     *     )
     * )
     */
    public function show(int $id)
    {
        try {
            $keranjang = Keranjang::find($id);
            $keranjang->load('produk');
            if($keranjang === null) throw new Exception('Keranjang Tidak Tersedia');

            $this->responseData['message'] = 'Keranjang Berhasil Ditemukan';
            $this->responseData['success'] = true;
            $this->responseData['data'] = $keranjang;
            $this->responseCode = Response::HTTP_OK;
        } catch (\Throwable $th) {
            $this->responseData['message'] = $th->getMessage();
        }

        return response()->json($this->responseData, $this->responseCode);
    }

    /**
     * @OA\Patch(
     *     path="/api/keranjang/:id",
     *     tags={"Keranjang"},
     *     summary="Update Item Keranjang",
     *     description="Update Item Keranjang",
     *     operationId="patchKeranjang",
     *     security={{ "bearerAuth": {} }},
     *     @OA\RequestBody(
     *         required=false,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="produkId", type="integer", example="1"),
     *             @OA\Property(property="jumlah", type="integer", example="2"),
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Successful Register",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message",type="string",example="Keranjang Berhasil Diupdate"),
     *             @OA\Property(property="data", type="object")
     *         )
     *     )
     * )
     */
    public function update(UpdateKeranjangRequest $request, int $id)
    {
        try {
            $validated = $request->safe()->only(['jumlah', 'produkId', 'userId']);
            $jumlah = $validated['jumlah'];
            $produkId = $validated['produkId'];
            $userId = $validated['userId'];

            $keranjang = Keranjang::find($id);
            if($keranjang === null) throw new Exception('Keranjang Tidak Tersedia');

            if($jumlah) $keranjang->jumlah = $jumlah;
            if($produkId) $keranjang->produk_id = $produkId;
            if($userId) $keranjang->user_id = $userId;

            $keranjang->save();

            $this->responseData['message'] = 'Keranjang Berhasil Diupdate';
            $this->responseData['success'] = true;
            $this->responseData['data'] = $keranjang;
            $this->responseCode = Response::HTTP_CREATED;
        } catch (\Throwable $th) {
            $this->responseData['message'] = $th->getMessage();
        }

        return response()->json($this->responseData, $this->responseCode);
    }

    /**
     * @OA\Delete(
     *     path="/api/keranjang/:id",
     *     tags={"Keranjang"},
     *     summary="Delete Item Keranjang",
     *     description="Delete Item Keranjang",
     *     operationId="deleteKeranjang",
     *     security={{ "bearerAuth": {} }},
     *     @OA\Response(
     *         response="200",
     *         description="Successful Register",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message",type="string",example="Keranjang Berhasil Dihapus"),
     *             @OA\Property(property="data", type="object")
     *         )
     *     )
     * )
     */
    public function destroy(int $id)
    {
        try {
            $keranjang = Keranjang::find($id);
            if($keranjang === null) throw new Exception('Keranjang Tidak Tersedia');

            $keranjang->delete();

            $this->responseData['message'] = 'Keranjang Berhasil Dihapus';
            $this->responseData['success'] = true;
            $this->responseData['data'] = $keranjang;
            $this->responseCode = Response::HTTP_OK;
        } catch (\Throwable $th) {
            $this->responseData['message'] = $th->getMessage();
        }

        return response()->json($this->responseData, $this->responseCode);
    }

    /**
     * @OA\Get(
     *     path="/api/user/keranjang",
     *     tags={"Keranjang"},
     *     summary="Get Item Keranjang By User Id",
     *     description="Get Item Keranjang By User Id",
     *     operationId="getKeranjangByUserId",
     *     @OA\Response(
     *         response="200",
     *         description="Daftar Keranjang Berhasil Ditemukan",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message",type="string",example="Daftar Keranjang Berhasil Ditemukan",),
     *             @OA\Property(property="data", type="object")
     *         )
     *     )
     * )
     */
    public function showByUserId()
    {
        try {
            $userId = auth()->user()->id;
            $listKeranjang = Keranjang::where('user_id', $userId)->get();
            $listKeranjang->load('produk');

            if(count($listKeranjang) > 0) {
                $this->responseData['message'] = 'Daftar Keranjang Berhasil Ditemukan';
            } else {
                $this->responseData['message'] = 'Daftar Keranjang Tidak Tersedia';
            }

            $this->responseData['success'] = true;
            $this->responseData['data'] = $listKeranjang;
            $this->responseCode = Response::HTTP_OK;
        } catch (\Throwable $th) {
            $this->responseData['message'] = $th->getMessage();
        }

        return response()->json($this->responseData, $this->responseCode);
    }
}
