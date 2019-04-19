<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReportExaminations extends Model
{
    protected $table = 'report_examinations';
    protected $primaryKey = 'code';
    public $timestamps = false;
    public $incrementing = false;


    public function toArray()
    {
        $acc = parent::toArray();
        $acc['account'] = $this->account;
        $acc['collection'] = $this->collection;
        return $acc;
    }

    public function collection()
    {
        return $this->belongsTo('App\Collections', 'code_collection');
    }

    public function account()
    {
        return $this->belongsTo('App\Account', 'username');
    }

    protected $fillable = [
        'code',
        'score',
        'code_collection',
        'list_examination',
        'time_submit',
        'username',
        'times_submit',
        'time_work'
    ];
}
