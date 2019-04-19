<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class KeyWord extends Model
{
    protected $table = 'key_words';
    protected $primaryKey = 'key_word';
    public $timestamps = false;
    public $incrementing = false;


    protected $fillable = [
        'key_word',
        'times_search',
    ];
}
