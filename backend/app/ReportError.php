<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReportError extends Model
{
    protected $table = 'report_errors';
    protected $primaryKey = 'code_error';
    public $timestamps = false;
    public $incrementing = false;


    protected $fillable = [
        'content_error',
        'code_object',
        'name_object',
        'code_error',
        'username'
    ];
}
