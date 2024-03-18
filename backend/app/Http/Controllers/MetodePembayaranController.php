<?php

namespace App\Http\Controllers;

use App\Models\MetodePembayaran;
use App\Http\Requests\StoreMetodePembayaranRequest;
use App\Http\Requests\UpdateMetodePembayaranRequest;
use Exception;
use Symfony\Component\HttpFoundation\Response;

class MetodePembayaranController extends Controller
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
            $listMetodeBayar = MetodePembayaran::all();

            if (count($listMetodeBayar) > 0) {
                $this->responseData['message'] = 'Daftar Metode Pembayaran Berhasil Ditemukan';
            } else {
                $this->responseData['message'] = 'Daftar Metode Pembayaran Tidak Tersedia';
            }

            $this->responseData['success'] = true;
            $this->responseData['data'] = $listMetodeBayar;
            $this->responseCode = Response::HTTP_OK;
        } catch (\Throwable $th) {
            $this->responseData['message'] = $th->getMessage();
        }

        return response()->json($this->responseData, $this->responseCode);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMetodePembayaranRequest $request)
    {
        try {
            $validated = $request->safe()->only(['nama', 'deskripsi']);
            $nama = $validated['nama'];
            $deskripsi = $validated['deskripsi'];

            $metodePembayaran = new MetodePembayaran;
            $metodePembayaran->nama = $nama;
            $metodePembayaran->deskripsi = $deskripsi;

            $metodePembayaran->save();

            $this->responseData['message'] = 'Metode Pembayaran Berhasil Ditambahkan';
            $this->responseData['success'] = true;
            $this->responseData['data'] = $metodePembayaran;
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
            $metodeBayar = MetodePembayaran::find($id);

            if ($metodeBayar === null) throw new Exception('Metode Pembayaran Tidak Tersedia');
            
            $this->responseData['message'] = 'Metode Pembayaran Berhasil Ditemukan';
            $this->responseData['success'] = true;
            $this->responseData['data'] = $metodeBayar;
            $this->responseCode = Response::HTTP_OK;
        } catch (\Throwable $th) {
            $this->responseData['message'] = $th->getMessage();
        }

        return response()->json($this->responseData, $this->responseCode);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMetodePembayaranRequest $request, int $id)
    {
        try {
            $validated = $request->safe()->only(['nama', 'deskripsi']);
            $nama = $validated['nama'];
            $deskripsi = $validated['deskripsi'];

            $metodePembayaran = MetodePembayaran::find($id);
            if ($metodePembayaran === null) throw new Exception('Metode Pembayaran Tidak Tersedia');
            
            if($nama) $metodePembayaran->nama = $nama;
            if($deskripsi) $metodePembayaran->deskripsi = $deskripsi;
            
            $metodePembayaran->save();
            
            $this->responseData['message'] = 'Metode Pembayaran Berhasil Diupdate';
            $this->responseData['success'] = true;
            $this->responseData['data'] = $metodePembayaran;
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
            $metodeBayar = MetodePembayaran::find($id);

            if ($metodeBayar === null) throw new Exception('Metode Pembayaran Tidak Tersedia');
            
            $this->responseData['message'] = 'Metode Pembayaran Berhasil Dihapus';
            $this->responseData['success'] = true;
            $this->responseData['data'] = $metodeBayar;
            $this->responseCode = Response::HTTP_OK;
        } catch (\Throwable $th) {
            $this->responseData['message'] = $th->getMessage();
        }

        return response()->json($this->responseData, $this->responseCode);
    }
}