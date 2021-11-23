<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Timeline extends Model
{
    use HasFactory;
    protected $fillable = ['name'];

    public function time_entries(): BelongsToMany {
        return $this->belongsToMany(TimeEntry::class);
    }
    public function timeline_categories(): BelongsToMany {
        return $this->belongsToMany(TimelineCategory::class);
    }
    public function user() {
        return $this->belongsTo(User::class);
    }
    public function time_entry() {
        return $this->belongsTo(TimeEntry::class);
    }
}
