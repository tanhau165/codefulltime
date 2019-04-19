<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AnsComment extends Model
{
    protected $table = 'ans_comment';
    protected $primaryKey = 'ans_code_comment';
    public $timestamps = false;
    public $incrementing = false;

    public function toArray()
    {
        $comment = parent::toArray();
        $comment['account'] = $this->account;
        return $comment;
    }


    public function account(){
        return $this->belongsTo('App\Account', 'username');
    }

    protected $fillable = [
        'ans_code_comment',
        'content',
        'code_comment',
        'time',
        'username'
    ];
}
