<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailTransaksi extends Model
{
    use HasFactory;
    protected $fillable = [
        "product_id", "jumlah", "transaksi_id"
    ];

    public function product(){
        return $this->belongsTo(Product::class);
    }
    public function transaksi(){
        return $this->belongsTo(Transaksi::class);
    }

    public static function detail_by_transaksiID($id){
        $transaksi = Transaksi::find($id);
        $details = DetailTransaksi::query()->where("transaksi_id", $transaksi->id)->get();
        foreach($details as $detail){
            $product = Product::find($detail->product_id);
            $detail->product = $product->pluck(["name", "description", "price", "image"]);
        }
        return $details;
    }
    public static function detail_by_productID($id){
        $product = Product::find($id);
        $details = DetailTransaksi::query()->where("product_id", $product->id)->get();
        foreach($details as $detail){
            $transaksi = Transaksi::find($detail->transaksi_id);
            $detail->transaksi = $transaksi->pluck(["kode_transaksi", "total_harga", "status"]);
        }
        return $details;
    }
    public static function detail_all(){
        $details = DetailTransaksi::all();
        foreach($details as $detail){
            $transaksi = Transaksi::find($detail->transaksi_id);
            $product = Product::find($detail->product_id);
            $detail->product = $product->pluck(["name", "description", "price", "image"]);
            $detail->transaksi = $transaksi->pluck(["kode_transaksi", "total_harga", "status"]);
        }
        return $details;
    }
    public static function detail_one($id){
        $detail = DetailTransaksi::find($id);
        $transaksi = Transaksi::find($detail->transaksi_id);
        $product = Product::find($detail->product_id);
        $detail->product = $product->pluck(["name", "description", "price", "image"]);
        $detail->transaksi = $transaksi->pluck(["kode_transaksi", "total_harga", "status"]);

        return $detail;
    }
}
