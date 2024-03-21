<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        "name", "description", "stock", "price", "category_id", "image"
    ];

    public function category(){
        return $this->belongsTo(Category::class);
    }
    public function wishlist(){
        return $this->hasMany(WishList::class);
    }
    public function detailsTransaksi(){
        return $this->hasMany(DetailTransaksi::class);
    }

    public static function product_all_filter(Request $request){
        if($request->category || $request->name || $request->new || $request->price){
            $products = Product::query();
            if($request->category){
                $category = Category::get()->where("name", $request->category)->first();
                $products->where("category_id", $category->id);
            }
            if($request->price){
                $products->orderBy("price", $request->price);
            }
            if($request->name){
                $products->where("name", "like", '%'. $request->name .'%');
            }
            if($request->new){
                $products->orderBy("created_at", $request->new);
            }
            $products = $products->get();
            foreach($products as $product){
                $category = Category::find($product->category_id);
                $product->category = $category->name;
            }
            return $products;
        }else{
            $products = Product::all();
            foreach($products as $product){
                $category = Category::find($product->category_id);
                $product->category_id = $category->name;
            }
            return $products;
        }
    }

    public static function product_category_name($id){
        $product = Product::find($id);
        $category = Category::find($product->category_id);
        $product->category = $category->name;

        return $product;
    }
}
