<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $fillable = [
        "user_id", "jumlah", "status", "snap_token", "payment_url", "order_id", "payment_type"
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function history(){
        return $this->hasMany(History::class);
    }
}
