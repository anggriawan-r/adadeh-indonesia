<?php

namespace App\Http\Controllers;

use App\Models\DetailTransaksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DetailTransaksiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $details = DetailTransaksi::detail_all();
        return response()->json([
            "status"    =>  true,
            "message"   =>  "Detail transaksi all in apps",
            "data"      =>  $details
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            "product_id"    =>  "required",
            "transaksi_id"  =>  "required",
            "jumlah"        =>  "required"
        ]);
        if($validate->fails()){
            return response()->json([
                "status"    =>  false,
                "message"   =>  $validate->errors()
            ], 419);
        }
        $details = DetailTransaksi::create($request->all());
        return response()->json([
            "status"    =>  true,
            "message"   =>  "Detail Transaksi created successfully",
            "data"      =>  $details
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $details = DetailTransaksi::detail_one($id);
        return response()->json([
            "status"    =>  true,
            "message"   =>  "Detail transaksi byID = $id  in apps",
            "data"      =>  $details
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validate = Validator::make($request->all(), [
            "product_id"    =>  "required",
            "transaksi_id"  =>  "required",
            "jumlah"        =>  "required"
        ]);
        if($validate->fails()){
            return response()->json([
                "status"    =>  false,
                "message"   =>  $validate->errors()
            ], 419);
        }
        $details = DetailTransaksi::find($id);
        if($details){
            $details->update([
                "user_id"   =>  auth()->user()->id,
                "product_id"=>  $request->product_id
            ]);
            return response()->json([
                "status"    =>  true,
                "message"   =>  "Detail Transaksi successfully updated",
                "data"      =>  $details
            ]);
        }else{
            return response()->json([
                "status"    =>  false,
                "message"   =>  "DetailTransaksi not found"
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $details = DetailTransaksi::find($id);
        if($details){
            $details->delete();
            return response()->json([
                "status"    =>  true,
                "message"   =>  "DetailTransaksi successfully deleted"
            ]);
        }else{
            return response()->json([
                "status"    =>  false,
                "message"   =>  "DetailTransaksi not found"
            ]);
        }
    }

    public function index_transaksiID($id){
        $details = DetailTransaksi::detail_by_transaksiID($id);
        return response()->json([
            "status"    =>  true,
            "message"   =>  "Detail transaksi all in apps",
            "data"      =>  $details
        ]);
    }

    public function index_productID($id){
        $details = DetailTransaksi::detail_by_productID($id);
        return response()->json([
            "status"    =>  true,
            "message"   =>  "Detail transaksi all in apps",
            "data"      =>  $details
        ]);
    }
}
