<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Basic Page Needs
    ================================================== -->
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>
        Shelping.COM | @if(array_key_exists('title', $data)){{ $data['title'] }}@endif
    </title>
    <meta name="author" content="Shelping.COM" />
    <meta name="description" content="@if(array_key_exists('desc', $data)){{ $data['desc'] }}@endif" />
    <base href="{{ url('/') }}">

    <!-- OG Metas -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="@if(array_key_exists('title', $data)){{ $data['title'] }}@endif">
    <meta property="og:site_name" content="Shelping.COM">
    <meta property="og:url" content="{{ url('projects/' . $data['id']) }}">
    <meta property="og:image" content="@if(array_key_exists('logo', $data)){{ str_replace('"','', $data['logo']) }}@endif">
</head>
<body>
    @if(array_key_exists('title', $data))
    <h1>{{ $data['title'] }}</h1>
    @endif
    @if(array_key_exists('desc', $data))
    <p>{{ $data['desc'] }}</p>
    @endif
    @if(array_key_exists('logo', $data))
    <img width="400px" src="{{ str_replace('"','', $data['logo']) }}">
    @endif
</body>