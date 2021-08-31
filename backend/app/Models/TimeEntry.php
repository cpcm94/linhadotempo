<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class TimeEntry extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'year', 'month', 'day', 'annual_importance', 'monthly_importance'];

    public function timelines(): BelongsToMany {
        return $this->belongsToMany(Timeline::class);
    }
}
