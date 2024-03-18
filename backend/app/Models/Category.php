<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        "name"
    ];

    public function product(){
        return $this->hasMany(Category::class);
    }

    public static function product_all_filter(Request $request, $id){
        $category = Category::find($id);
        $products = Product::query()->where("category_id", $category->id);
        if($request->name || $request->new){
            if($request->name){
                $products->where("name", "like", '%'. $request->name .'%');
            }
            if($request->new){
                $products->orderBy("created_at", $request->new);
            }
        }
        $category->products = $products->get();
        return $category;
    }
}
