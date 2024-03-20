<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaksi extends Model
{
    use HasFactory;

    protected $table = 'transaksi';
    protected $fillable = ['total_harga', 'status', 'user_id', 'metode_pembayaran_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function metodePembayaran(): BelongsTo
    {
        return $this->belongsTo(MetodePembayaran::class);
    }

    public function detailTransaksi(){
        return $this->hasMany(DetailTransaksi::class);
    }
}
