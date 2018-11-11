<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MembersController extends Controller
{
    /**
     * Controller for the main page '/'
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        return view('layouts.master');
    }

    /**
     * Controller for the query form '/query'
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showForm()
    {
        return view('query');
    }

    /**
     * Controller to manage the form submission
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function getResults()
    {
        $members = Member::where('firstname', request('firstname'))
            ->orWhere('surname', request('surname'))
            ->orWhere('email', request('email'))->get();

        return view('results')->with('members', json_encode($members));
    }
}
