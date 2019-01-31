<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Basic Page Needs
    ================================================== -->
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>
        Shelping.COM | @if(array_key_exists('name', $data)){{ $data['name'] }}@endif
    </title>
    <meta name="author" content="Shelping.COM" />
    <meta name="description" content="@if(array_key_exists('about', $data)){{ $data['about'] }}@endif" />
    <base href="{{ url('/') }}">

    <!-- OG Metas -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="@if(array_key_exists('name', $data)){{ $data['name'] }}@endif">
    <meta property="og:site_name" content="Shelping.COM">
    <meta property="og:url" content="{{ url('projects/' . $data['id']) }}">
    <meta property="og:image" content="@if(array_key_exists('photo', $data)){{ str_replace('"','', $data['photo']) }}@endif">
</head>
<body>
    @if(array_key_exists('name', $data))
    <h1>{{ $data['name'] }}</h1>
    @endif
    @if(array_key_exists('about', $data))
    <p>{{ $data['about'] }}</p>
    @endif
    @if(array_key_exists('photo', $data))
    <img width="400px" src="{{ str_replace('"','', $data['photo']) }}">
    @endif
</body>