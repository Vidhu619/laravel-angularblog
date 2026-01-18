<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = [
        'title',
        'content',
        'image'
    ];

    public function viewers()
    {
        return $this->belongsToMany(User::class, 'blog_views');
    }
}
