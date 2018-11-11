@extends ('layouts.master')

@section ('content')

    <div class="col-sm-8">
        <br />
        <h2>Query Parameters</h2>
        <form method="POST" action="/get-results">

            {{ csrf_field() }}

            <div class="form-group">
                <label for="firstname">First Name:</label>
                <input type="text" class="form-control" id="firstname" name="firstname">
            </div>

            <div class="form-group">
                <label for="surname">Surname</label>
                <input type="text" class="form-control" id="surname" name="surname">
            </div>

            <div class="form-group">
                <label for="email">E-Mail</label>
                <input type="text" class="form-control" id="email" name="email">
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary">Query</button>
            </div>
        </form>
    </div>

@endsection
