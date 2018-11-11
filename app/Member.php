<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Member
 * Model for the member table.
 * @package App
 */
class Member extends Model
{
    /**
     * Any field that is added to this array is whitelisted for mass assignment
     * @var array
     */
    protected $fillable = [
        'firstname',
        'surname',
        'email',
        'gender',
    ];
}
