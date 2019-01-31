@extends('static.default')

<!-- region Meta Data -->

    {{-- Update the Meta Description --}}
    @section('meta_description')
        Your business if great so let's get the drapes to match the curtains.
    @stop

    {{-- Update the Title --}}
    @section('meta_title')
        Shelping.COM Projects
    @stop

    {{-- Update the URL --}}
    @section('meta_url')
        {{ app('url')->full() }}
    @stop

<!-- endregion -->

@section('content')
    @foreach($data as $p)
        @if(array_key_exists('title', $p))
            <h1>{{ $p['title'] }}</h1>
        @endif
        @if(array_key_exists('desc', $p))
            <p>{{ $p['desc'] }}</p>
        @endif
        @if(array_key_exists('logo', $data))
            <img width="400px" src="{{ str_replace('"','', $p['logo']) }}">
        @endif
    @endforeach
@stop