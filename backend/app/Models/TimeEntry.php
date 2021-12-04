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

    public function book() {
        return $this->belongsTo(Book::class);
    }

    public function timelines_origin() {
        return $this->hasMany(Timeline::class);
    }

    public function images() {
        return $this->hasMany(Image::class);
    }

    public function time_entry_categories(): BelongsToMany {
        return $this->belongsToMany(TimeEntryCategory::class);
    }
}
