<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
use App\Models\DetailTransaksi;
use App\Http\Requests\StoreTransaksiRequest;
use App\Http\Requests\UpdateTransaksiRequest;
use Exception;
use Symfony\Component\HttpFoundation\Response;

class TransaksiController extends Controller
{
    protected $responseData = [
        'success' => false,
        'message' => '',
        'data' => null
    ];

    protected $responseCode = Response::HTTP_BAD_REQUEST;

    /**
     * @OA\Get(
     *     path="/api/transaksi",
     *     tags={"Transaksi"},
     *     summary="Get All Transaksi",
     *     description="Get All Transaksi",
     *     operationId="getTransaksi",
     *     @OA\Response(
     *         response="200",
     *         description="Daftar Transaksi Berhasil Ditemukan",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message",type="string",example="Daftar Transaksi Berhasil Ditemukan",),
     *             @OA\Property(property="data", type="object")
     *         )
     *     )
     * )
     */
    public function index()
    {
        try {
            $listTransaksi = Transaksi::all();
            $listTransaksiResult = [];

            if (count($listTransaksi) > 0) {
                $this->responseData['message'] = 'Daftar Transaksi Berhasil Ditemukan';

                foreach ($listTransaksi as $key => $transaksi) {
                    $detailTransaksi = DetailTransaksi::where('transaksi_id', $transaksi->id)->get();
                    $detailTransaksi->load('product');
                    $transaksi['detailTransaksi'] = $detailTransaksi;
                    array_push($listTransaksiResult, $transaksi);
                }
            } else {
                $this->responseData['message'] = 'Daftar Transaksi Tidak Tersedia';
            }

            $this->responseData['success'] = true;
            $this->responseData['data'] = $listTransaksiResult;
            $this->responseCode = Response::HTTP_OK;
        } catch (\Throwable $th) {
            $this->responseData['message'] = $th->getMessage();
        }

        return response()->json($this->responseData, $this->responseCode);
    }

    /**
     * @OA\Post(
     *     path="/api/transaksi",
     *     tags={"Transaksi"},
     *     summary="Add Transaksi",
     *     description="Add Transaksi",
     *     operationId="postTransaksi",
     *     security={{ "bearerAuth": {} }},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="detailTransaksi", type="object", example="{produkId: 2, jumlah: 3}"),
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Successful Register",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message",type="string",example="Transaksi Berhasil Ditambahkan"),
     *             @OA\Property(property="data", type="object")
     *         )
     *     )
     * )
     */
    public function store(StoreTransaksiRequest $request)
    {
        try {
            $validated = $request->safe()->only(['detailTransaksi', 'userId']);
            $detailTransaksi = $validated['detailTransaksi'];
            $userId = $validated['userId'];

            $listDetailTransaksi = [];

            $transaksi = new Transaksi;
            $transaksi->user_id = $userId;
            $transaksi->total_harga = 0;
            $transaksi->status = 'pending';
            $transaksi->metode_pembayaran_id = 1;

            $kodeTransaksi = 'adadeh' . date('YmdHis') . bin2hex(random_bytes(3));
            $transaksi->kode_transaksi = $kodeTransaksi;

            $transaksi->save();

            foreach ($detailTransaksi as $key => $value) {
                $newDetailTransaksi = new DetailTransaksi;
                $newDetailTransaksi->product_id = $value['produkId'];
                $newDetailTransaksi->jumlah = $value['jumlah'];
                $newDetailTransaksi->transaksi_id = $transaksi->id;

                $newDetailTransaksi->save();

                $newDetailTransaksi->load('product');
                $transaksi->total_harga += $newDetailTransaksi->product->price * $newDetailTransaksi->jumlah;

                array_push($listDetailTransaksi, $newDetailTransaksi);
            }

            $transaksi->save();

            $transaksi['detailTransaksi'] = $listDetailTransaksi;

            $this->responseData['message'] = 'Transaksi Berhasil Ditambahkan';
            $this->responseData['success'] = true;
            $this->responseData['data'] = $transaksi;
            $this->responseCode = Response::HTTP_CREATED;
        } catch (\Throwable $th) {
            $this->responseData['message'] = $th->getMessage();
        }

        return response()->json($this->responseData, $this->responseCode);
    }

    /**
     * @OA\Get(
     *     path="/api/transaksi/:id",
     *     tags={"Transaksi"},
     *     summary="Get Single Transaksi",
     *     description="Get Single Transaksi",
     *     operationId="getTransaksiById",
     *     @OA\Response(
     *         response="200",
     *         description="Transaksi Berhasil Ditemukan",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message",type="string",example="Transaksi Berhasil Ditemukan",),
     *             @OA\Property(property="data", type="object")
     *         )
     *     )
     * )
     */
    public function show(int $id)
    {
        try {
            $transaksi = Transaksi::find($id);

            if ($transaksi === null) throw new Exception('Transaksi Tidak Tersedia');

            $detailTransaksi = DetailTransaksi::where('transaksi_id', $id)->get();
            $detailTransaksi->load('product');
            $transaksi['detailTransaksi'] = $detailTransaksi;
                
            $this->responseData['message'] = 'Transaksi Berhasil Ditemukan';
            $this->responseData['success'] = true;
            $this->responseData['data'] = $transaksi;
            $this->responseCode = Response::HTTP_OK;
        } catch (\Throwable $th) {
            $this->responseData['message'] = $th->getMessage();
        }

        return response()->json($this->responseData, $this->responseCode);
    }

    /**
     * @OA\Patch(
     *     path="/api/transaksi/:id",
     *     tags={"Transaksi"},
     *     summary="Update Transaksi",
     *     description="Update Transaksi",
     *     operationId="patchTransaksi",
     *     security={{ "bearerAuth": {} }},
     *     @OA\RequestBody(
     *         required=false,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="integer", example="1"),
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Successful Register",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message",type="string",example="Transaksi Berhasil Diupdate"),
     *             @OA\Property(property="data", type="object")
     *         )
     *     )
     * )
     */
    public function update(UpdateTransaksiRequest $request, int $id)
    {
        try {
            $validated = $request->safe()->only(['status', 'userId']);
            $status = $validated['status'];
            $userId = $validated['userId'];

            $transaksi = Transaksi::find($id);
            if($transaksi === null) throw new Exception('Transaksi Tidak Tersedia');

            if($status) $transaksi->status = $status;
            if($userId) $transaksi->user_id = $userId;

            $transaksi->save();

            $this->responseData['message'] = 'Transaksi Berhasil Diupdate';
            $this->responseData['success'] = true;
            $this->responseData['data'] = $transaksi;
            $this->responseCode = Response::HTTP_OK;
        } catch (\Throwable $th) {
            $this->responseData['message'] = $th->getMessage();
        }

        return response()->json($this->responseData, $this->responseCode);
    }

    /**
     * @OA\Delete(
     *     path="/api/transaksi/:id",
     *     tags={"Transaksi"},
     *     summary="Delete Transaksi",
     *     description="Delete Transaksi",
     *     operationId="deleteTransaksi",
     *     security={{ "bearerAuth": {} }},
     *     @OA\Response(
     *         response="200",
     *         description="Successful Register",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message",type="string",example="Transaksi Berhasil Dihapus"),
     *             @OA\Property(property="data", type="object")
     *         )
     *     )
     * )
     */
    public function destroy(int $id)
    {
        try {
            $transaksi = Transaksi::find($id);

            if ($transaksi === null) throw new Exception('Transaksi Tidak Tersedia');

            $transaksi->delete();
            
            $this->responseData['message'] = 'Transaksi Berhasil Dihapus';
            $this->responseData['success'] = true;
            $this->responseData['data'] = $transaksi;
            $this->responseCode = Response::HTTP_OK;
        } catch (\Throwable $th) {
            $this->responseData['message'] = $th->getMessage();
        }

        return response()->json($this->responseData, $this->responseCode);
    }

    /**
     * @OA\Get(
     *     path="/api/user/transaksi",
     *     tags={"Transaksi"},
     *     summary="Get Transaksi By User Id",
     *     description="Get Transaksi By User Id",
     *     operationId="getTransaksiByUserId",
     *     security={{ "bearerAuth": {} }},
     *     @OA\Response(
     *         response="200",
     *         description="Daftar Transaksi Berhasil Ditemukan",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example="true"),
     *             @OA\Property(property="message",type="string",example="Daftar Transaksi Berhasil Ditemukan",),
     *             @OA\Property(property="data", type="object")
     *         )
     *     )
     * )
     */
    public function showByUserId()
    {
        try {
            $userId = auth()->user()->id;
            $listTransaksi = Transaksi::where('user_id', $userId)->get();
            $listTransaksiResult = [];

            if (count($listTransaksi) > 0) {
                $this->responseData['message'] = 'Daftar Transaksi Berhasil Ditemukan';

                foreach ($listTransaksi as $key => $transaksi) {
                    $detailTransaksi = DetailTransaksi::where('transaksi_id', $transaksi->id)->get();
                    $detailTransaksi->load('product');
                    $transaksi['detailTransaksi'] = $detailTransaksi;
                    array_push($listTransaksiResult, $transaksi);
                }
            } else {
                $this->responseData['message'] = 'Daftar Transaksi Tidak Tersedia';
            }

            $this->responseData['success'] = true;
            $this->responseData['data'] = $listTransaksiResult;
            $this->responseCode = Response::HTTP_OK;
        } catch (\Throwable $th) {
            $this->responseData['message'] = $th->getMessage();
        }

        return response()->json($this->responseData, $this->responseCode);
    }
}
