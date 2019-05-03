<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Medias extends Model
{
    protected $table = 'media';
    protected $primaryKey = 'code_media';
    public $timestamps = false;
    public $incrementing = false;

    protected $fillable = [
      'code_media','type_media','link_media','code_news_feeds','size','name','username'
    ];
}
