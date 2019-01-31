<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Basic Page Needs
    ================================================== -->
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>
        Shelping.COM | Change Brand - Change Lives
    </title>
    <meta name="author" content="@yield('meta_author', 'Shelping.COM')" />
    <meta name="description" content="@yield('meta_description', 'Shelping.COM || Change Brand. Changes Lives.')" />
    <meta name="google-site-verification" content="QLBTKqKgRk3g5xOQYTQ4kSonhVO7IsqF7g4b0eASTR8" />
    <base href="{{ url('/') }}">

    <!-- OG Metas -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="@yield('meta_title', 'Shelping.COM | Change Brand - Change Lives')">
    <meta property="og:site_name" content="Shelping.COM">
    <meta property="og:url" content="@yield('meta_url', app('url')->full())">
    <meta property="og:image" content="@yield('meta_image', 'https://complete-doddle-web-app-164413.appspot.com/assets/img/logo-ico.png')">
</head>
<body>
    <h1> Shelping.COM</h1>
    <p>Change Brand - Change Lives</p>
    <img width="400px" src="https://complete-doddle-web-app-164413.appspot.com/assets/img/logo-ico.png">

    @yield('content')
</body>