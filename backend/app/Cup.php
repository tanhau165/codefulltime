<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cup extends Model
{
    protected $table = 'cup';
    protected $primaryKey = 'code_cup';
    public $timestamps = false;
    public $incrementing = false;
}
