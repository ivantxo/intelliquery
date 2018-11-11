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
     * Controller to manage the form submission.
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function getResults()
    {
        // If any of the 3 form fields has a value, then make the query by using the Member model
        // built-in functions. Otherwise, if all 3 form fields are empty, then return all rows from
        // member table.
        if (
            !empty(request('firstname')) ||
            !empty(request('surname')) ||
            !empty(request('email')) ) {
            $members = Member::where('firstname', request('firstname'))
                ->orWhere('surname', request('surname'))
                ->orWhere('email', request('email'))->get();
        } else {
            $members = Member::all();
        }

        return view('results')->with('members', json_encode($members));
    }
}
