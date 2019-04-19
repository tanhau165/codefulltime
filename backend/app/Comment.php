<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $table = 'comment';
    protected $primaryKey = 'code_comment';
    public $timestamps = false;
    public $incrementing = false;


    protected $fillable = [
        'code_comment',
        'content',
        'username',
        'time',
        'code_object'
    ];

    public function toArray()
    {
        $comment = parent::toArray();
        $comment['ans_comments'] = $this->ans_Comments;
        $comment['account'] = $this->account;
        return $comment;
    }

    public function account(){
        return $this->belongsTo('App\Account', 'username');
    }

    public function ans_Comments()
    {
        return $this->hasMany('App\AnsComment', 'code_comment')->orderBy('ans_code_comment', 'desc');
    }

}
