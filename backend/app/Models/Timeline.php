<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Timeline extends Model
{
    use HasFactory;

    public function historical_events(): HasMany {
        return $this->hasMany(HistoricalEvent::class);
    }
}
