<?php

/** Router for the main page intelliquery.dev */
Route::get('/', 'MembersController@index')->name('home');

/** Router to show the query form */
Route::get('/query', 'MembersController@showForm');

/** Router for the form post action */
Route::post('/get-results', 'MembersController@getResults');

/** Router for the graph action */
//Route::post('/graph', 'MembersController@displayGraph');

Route::get('bar-chart', 'MembersController@displayGraph');
