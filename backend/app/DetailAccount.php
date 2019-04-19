<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetailAccount extends Model
{
    protected $table = 'cup';
    protected $primaryKey = 'code_cup';
    public $timestamps = false;
    public $incrementing = false;
}
