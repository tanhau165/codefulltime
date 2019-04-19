<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $table = 'account';
    protected $primaryKey = 'username';
    public $timestamps = false;
    public $incrementing = false;

    public function cup()
    {
        return $this->belongsTo('App\Cup', 'code_cup');
    }

    public function toArray()
    {
        $acc = parent::toArray();
        $acc['cup'] = $this->cup;
        unset($acc['username']);
        unset($acc['password']);
        unset($acc['email']);
        unset($acc['ip_client']);
//        unset($acc['location']);
        return $acc;
    }
}
