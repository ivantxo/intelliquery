## IntelliQuery Test

In order to get this project working you should:

git clone this project to where Apache serve the web files. Usually on:
> /var/www/html

```
git clone git@github.com:ivantxo/intelliquery.git
```

Change Directory into the cloned project
```
cd intelliquery
```

Before letting composer to install the required packages, make sure you have composer installed on your Ubuntu machine:
```
composer
```

If you see a list of commands, is already there, otherwise please install it:
```
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
```

Install dependencies:
```
composer install
```

On your MySQL database engine, please create a new database for this project:
```
CREATE DATABASE intelliquery
```

Open this project with your preferred IDE and open the .env file and update the username and password accordingly to 
your local details. Then run the migrations:
```
php artisan migrate
```

In order to get some data, please run a seeder that will load 1000 rows in the members table:
```
php artisan db:seed --class=MembersTableSeeder
```

Finally, serve the application:
```
php artisan serve
```

You will see on the console the URL where you need to open the project in the browser usually on
[127.0.0.1:8000](http://127.0.0.1:8000)


## Tech Stack for IntelliQuery

- Php Laravel Framework
- React, JavaScript, HTML and CSS for the frontend
- Highcharts library for the graph [Highcharts](https://www.highcharts.com).
- MySQL Database Engine.

## Project basic structure
- routes: Laravel routes
  - web.php: Main project routes
 
- database
  - migrations
 
- app: Main Laravel folder
  - Http
    - Controllers
      - MembersController.php
  - Member.php: Model for the member table

- resources
  - views
    - layouts
    - query.blade.php
    - results.blade.php
    - graph.blade.php
  - js: React structure
    app.js: Main react file
    - components
      - FilterableMemberTable.js
 
## Note:
I followed a slightly different approach on how I was instructed to do this task. In your instructions you said the user 
should be able to visit this URL: https://intellipharm.com.au/devtest/index.php?firstname=Phyllida&surname=Josey
and get a JSON view of the data.

Instead of typing the URL straight away I created a form in where the user can fill the 3 parameters or none in order 
to filter the returned data. To get to this page click on the main page on the Query link.

Once you get to the Query Parameters page. You can type any of the 3 parameters or none of them. If you type any of
the 3 parameters, it will display data filtered by those parameters. On the other you can see all the results by 
sending an empty query (not filling in any of the fields).
