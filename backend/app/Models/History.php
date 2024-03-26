<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    use HasFactory;
    protected $fillable = [
        "payment_id", "name", "price", "quantity", "user_id"
    ];
    public function payment(){
        return $this->belongsTo(Payment::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
}
