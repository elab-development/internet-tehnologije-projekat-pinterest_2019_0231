<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pin extends Model
{
    use HasFactory;

    protected $table = 'pins';

    protected $fillable = [
        'pin_title',
        'pin_description',
        'image',
        'board_id',
    ];

    public function board()
    {
        return $this->belongsTo(Board::class);
    }
}
