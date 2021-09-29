<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class TimelineCategory extends Model
{
    use HasFactory;
    protected $fillable = ['name'];
    public function timelines(): BelongsToMany {
        return $this->belongsToMany(Timeline::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
