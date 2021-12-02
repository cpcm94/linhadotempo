<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
    'name',
    'image_url',
    'time_entry_id'
    ];

    public function time_entry() {
        return $this->belongsTo(TimeEntry::class);
    }
}
