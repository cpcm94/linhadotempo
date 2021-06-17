<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Timeline extends Model
{
    use HasFactory;
    protected $fillable = ['name'];

    public function time_entrys() {
        return $this->hasMany(TimeEntry::class);
    }
}
