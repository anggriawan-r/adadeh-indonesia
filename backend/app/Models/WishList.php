<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WishList extends Model
{
    use HasFactory;

    protected $fillable = [
        "product_id", "user_id"
    ];

    public function product(){
        return $this->belongsTo(Product::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }

    public static function get_all_product(){
        $wishlists = WishList::all();
        foreach($wishlists as $wishlist){
            $user = User::find($wishlist->user_id);
            $product = Product::find($wishlist->product_id);
            $wishlist->name = $user->name;
            $wishlist->product = $product;
        }
        return $wishlists;
    }
    public static function get_all_product_by_userID(){
        $id = auth()->user()->id;
        if($id){
            $wishlists = WishList::query()->where("user_id", $id)->get();
            foreach($wishlists as $wishlist){
                $product = Product::find($wishlist->product_id);
                $wishlist->product = $product;
            }
            return $wishlists;
        }else{
            return "Not Found";
        }
    }
}
