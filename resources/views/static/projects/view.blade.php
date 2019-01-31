@extends('static.default')

<!-- region Meta Data -->

    {{-- Update the Meta Description --}}
    @section('meta_description')
        {{ $data['desc'] }}
    @stop

    {{-- Update the Title --}}
    @section('meta_title')
        {{ $data['title'] }}
    @stop

    {{-- Update the URL --}}
    @section('meta_url')
        {{ app('url')->full() }}
    @stop

    {{-- Update the Description --}}
    @section('meta_description')
        {{ $data['desc'] }}
    @stop

    {{-- Update Image --}}
    @section('meta_image')
        {{ str_replace('"','', $data['logo']) }}
    @stop

<!-- endregion -->

@section('content')
    @if(array_key_exists('title', $data))
        <h1>{{ $data['title'] }}</h1>
    @endif
    @if(array_key_exists('desc', $data))
        <p>{{ $data['desc'] }}</p>
    @endif
    @if(array_key_exists('logo', $data))
        <img width="400px" src="{{ str_replace('"','', $data['logo']) }}">
    @endif
@stop