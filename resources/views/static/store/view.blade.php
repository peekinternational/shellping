@extends('layouts.static.default')

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
        "{{ $data['logo'] }}"
    @stop

<!-- endregion -->

@section('content')
    View
@stop