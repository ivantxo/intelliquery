@extends ('layouts.master')

@section ('content')
    <script src="http://code.highcharts.com/highcharts.js"></script>
    <script src="http://code.highcharts.com/modules/exporting.js"></script>

    <div class="col-sm-8">
        <br />
        <h2>Graph</h2>
        <div id="years" data="{{ $data['years'] }}"></div>
        <div id="series" data="{{ $data['series'] }}"></div>
    </div>

    <div id="container" style="min-width: 1400px; height: 800px; margin: 0 auto"></div>
    <script>
        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Signups per year'
            },
            xAxis: {
                categories: JSON.parse(document.getElementById('years').getAttribute('data'))
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of Signups'
                }
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: JSON.parse(document.getElementById('series').getAttribute('data'))
        });
    </script>
@endsection
