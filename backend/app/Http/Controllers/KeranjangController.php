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
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $listKeranjang = Keranjang::all();
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
     * Store a newly created resource in storage.
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
     * Display the specified resource.
     */
    public function show(int $id)
    {
        try {
            $keranjang = Keranjang::find($id);
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
     * Update the specified resource in storage.
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
     * Remove the specified resource from storage.
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
}
