<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
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
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $listTransaksi = Transaksi::all();

            if (count($listTransaksi) > 0) {
                $this->responseData['message'] = 'Daftar Transaksi Berhasil Ditemukan';
            } else {
                $this->responseData['message'] = 'Daftar Transaksi Tidak Tersedia';
            }

            $this->responseData['success'] = true;
            $this->responseData['data'] = $listTransaksi;
            $this->responseCode = Response::HTTP_OK;
        } catch (\Throwable $th) {
            $this->responseData['message'] = $th->getMessage();
        }

        return response()->json($this->responseData, $this->responseCode);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransaksiRequest $request)
    {
        try {
            $validated = $request->safe()->only(['totalHarga', 'status', 'userId', 'metodePembayaranId']);
            $totalHarga = $validated['totalHarga'];
            $status = $validated['status'];
            $userId = $validated['userId'];
            $metodePembayaranId = $validated['metodePembayaranId'];

            $transaksi = new Transaksi;
            $transaksi->total_harga = $totalHarga;
            $transaksi->status = $status;
            $transaksi->user_id = $userId;
            $transaksi->metode_pembayaran_id = $metodePembayaranId;

            $kodeTransaksi = 'adadeh' . date('YmdHis') . bin2hex(random_bytes(3));
            $transaksi->kode_transaksi = $kodeTransaksi;

            $transaksi->save();

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
     * Display the specified resource.
     */
    public function show(int $id)
    {
        try {
            $transaksi = Transaksi::find($id);

            if ($transaksi === null) throw new Exception('Transaksi Tidak Tersedia');
                
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
     * Update the specified resource in storage.
     */
    public function update(UpdateTransaksiRequest $request, int $id)
    {
        try {
            $validated = $request->safe()->only(['totalHarga', 'status', 'userId', 'metodePembayaranId']);
            $totalHarga = $validated['totalHarga'];
            $status = $validated['status'];
            $userId = $validated['userId'];
            $metodePembayaranId = $validated['metodePembayaranId'];

            $transaksi = Transaksi::find($id);
            if($transaksi === null) throw new Exception('Transaksi Tidak Tersedia');

            if($totalHarga) $transaksi->total_harga = $totalHarga;
            if($status) $transaksi->status = $status;
            if($userId) $transaksi->user_id = $userId;
            if($metodePembayaranId) $transaksi->metode_pembayaran_id = $metodePembayaranId;

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
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        try {
            $transaksi = Transaksi::find($id);

            if ($transaksi === null) throw new Exception('Transaksi Tidak Tersedia');
            
            $this->responseData['message'] = 'Transaksi Berhasil Dihapus';
            $this->responseData['success'] = true;
            $this->responseData['data'] = $transaksi;
            $this->responseCode = Response::HTTP_OK;
        } catch (\Throwable $th) {
            $this->responseData['message'] = $th->getMessage();
        }

        return response()->json($this->responseData, $this->responseCode);
    }
}
