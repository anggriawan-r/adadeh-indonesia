<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Keranjang extends Model
{
    use HasFactory;

    protected $table = 'keranjang';
    protected $fillable = ['jumlah', 'produk_id', 'user_id'];

    public function produk(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function getDataByUserId($id){
        $keranjang = Keranjang::where("user_id", $id)->get();

        $product = Product::find($keranjang->produk_id);
        $category = Category::find($product->category_id);

        $product->category_id = $category->name;
        $keranjang->product = $product;
        return $keranjang;
    }
}
