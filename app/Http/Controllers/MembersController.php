<?php

namespace App\Http\Controllers;

use App\Member;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    /**
     * Controller for '/graph'
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function displayGraph()
    {
        // Query to get the number of signups per year
        $results = DB::table('members')
            ->selectRaw("
                CONCAT(YEAR(created_at), '-', MONTH(created_at)) AS `date`,
                COUNT(id) AS `count`
            ")
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('count', 'date')
        ;
        /**
         Using pluck returns an associative array with yyyy-m key and the number of signups for that particular date
         $results = [
             '1970-1' => 2,
             '1970-10' => 2,
             '1970-12' => 1
         ];
        **/
        $data = $this->transformResultsToGraphData($results);
        return view('graph', compact('data'));
    }

    /**
     * Transforms the data to the format required by Highcharts in order to draw the chart.
     * @param $results
     * @return array
     */
    private function transformResultsToGraphData($results): array
    {
        $data = [];
        $template = [1 => 0, 2 => 0, 3 => 0, 4 => 0, 5 => 0, 6 => 0, 7 => 0, 8 => 0, 9 => 0, 10 => 0, 11 => 0, 12 => 0];
        foreach ($results as $key => $value) {
            $aux = explode('-', $key);
            if (empty($data[$aux[0]])) {
                /**
                 * $data[
                 *  '1970' => [
                 *    '1' => 0,
                 *    '2' => 0,
                 *    ...
                 *  ]
                 * ]
                 */
                $data[$aux[0]] = $template;
            }
            $data[$aux[0]][$aux[1]] = $value;
        }
        $years = array_keys($data);

        $months = [
            1 => 'Jan',
            2 => 'Feb',
            3 => 'Mar',
            4 => 'Apr',
            5 => 'May',
            6 => 'Jun',
            7 => 'Jul',
            8 => 'Aug',
            9 => 'Sep',
            10 => 'Oct',
            11 => 'Nov',
            12 => 'Dec',
        ];
        $series = [];
        for ($i = 12; $i > 0; $i--) {
            $aux = [];
            foreach ($data as $year => $value) {
                $aux[] = $value[$i];
            }
            $obj = new \stdClass();
            $obj->name = $months[$i];
            $obj->data = $aux;
            $series[] = $obj;
        }

        $data = [
            'years' => json_encode($years),
            'series' => json_encode($series),
        ];

        return $data;
    }
}
