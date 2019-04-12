<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pastes extends Model
{
    protected $table = 'pastes';
    protected $primaryKey = 'code_paste';
    public $timestamps = false;
    public $incrementing = false;


    protected $fillable = [
        'code_paste',
        'name',
        'content',
        'type_of_content',
        'number_of_like',
        'number_of_view',
        'time_add',
        'username',
    ];
}
