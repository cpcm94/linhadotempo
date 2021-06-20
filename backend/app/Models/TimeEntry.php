<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeEntry extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'entry_date', 'annual_importance', 'monthly_importance', 'timeline_id'];

    public function timeline() {
        return $this->belongsTo(Timeline::class);
    }
}
