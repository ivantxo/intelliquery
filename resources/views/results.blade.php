@extends ('layouts.master')

@section ('content')

    <div class="container">
        <div id="root" results='{{ $members }}'></div>
        <script src="js/app.js" ></script>
    </div>

@endsection
