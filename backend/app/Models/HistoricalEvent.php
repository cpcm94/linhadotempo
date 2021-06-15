<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoricalEvent extends Model
{
    use HasFactory;

    public function timeline(): BelongsTo {
        return $this->belongsTo(Timeline::class);
    }
}
