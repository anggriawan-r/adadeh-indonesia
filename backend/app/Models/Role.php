<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;
    protected $fillable = [
        "name",
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public static function role_all_user_name(){
        $role = Role::all();
        foreach($role as $r){
            $user = User::query()->where("role_id", $r->id)->get();
            $r->user = $user;
        }
        return $role;
    }

    public static function role_user_name($id){
        $role = Role::find($id);
        $user = User::query()->where("role_id", $role->id)->get();
        $role->user = $user;
        return $role;
    }
}
