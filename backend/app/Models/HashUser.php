<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HashUser extends Model
{
    use HasFactory;
    protected $fillable = ['hash_id', 'expiry_date', 'user_id'];
    public function user() {
        return $this->belongsTo(User::class);
    }
}
