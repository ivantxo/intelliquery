@extends ('layouts.master')

@section ('content')
    <script src="http://code.highcharts.com/highcharts.js"></script>
    <script src="http://code.highcharts.com/modules/exporting.js"></script>

    <div class="col-sm-8">
        <br />
        <h2>Graph</h2>
        <div id="years" data="{{ $data['years'] }}"></div>
        <div id="num" data="{{ $data['num'] }}"></div>
    </div>

    <div id="container" style="min-width: 700px; height: 600px; margin: 0 auto"></div>
    <script>
        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Signups per year'
            },
            subtitle: {
                text: 'Source: IntelliQuery'
            },
            xAxis: {
                categories: JSON.parse(document.getElementById('years').getAttribute('data')),
                // categories: [1970, 1971, 1972],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of signups'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [
                {
                    type: 'column',
                    colorByPoint: true,
                    data: JSON.parse(document.getElementById('num').getAttribute('data')),
                    showInLegend: false
                }
            ]
        });
    </script>
@endsection
