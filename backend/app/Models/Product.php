<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
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
    public function wistlist(){
        return $this->hasMany(WishList::class);
    }

    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn ($image) => url('/storage/products/' . $image),
        );
    }

    public static function product_all_filter(Request $request){
        if($request->category || $request->name || $request->new){
            $products = Product::query();
            if($request->category){
                $category = Category::get()->where("name", $request->category)->first();
                $products->where("category_id", $category->id);
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
            return $products;
        }
    }

    public static function product_category_name($id){
        $product = Product::find($id);
        $category = Category::find($product->id);
        $product->category = $category->name;

        return $product;
    }
}
