@extends('layouts.default')

@section('content')
    <section class="mbr-section mbr-section-hero mbr-section-full mbr-parallax-background mbr-section-with-arrow mbr-after-navbar" id="header1-1" style="background-image: url(assets/img/mbr-2000x1333.jpg);">

        <div class="mbr-overlay" style="opacity: 0.8; background-color: rgb(0, 0, 0);"></div>

        <div class="mbr-table-cell">
            <div class="container">
                <div class="row">
                    <div class="mbr-section col-md-10 col-md-offset-1 text-xs-center">
                        <p class="mbr-section-lead lead">
                            <img src="{{ url('assets/img/logo.jpg') }}" />
                        </p>
                        <div class="mbr-section-btn">
                            <a class="btn btn-lg btn-primary" href="#">SIGN IN WITH SOCIAL NETWORKS</a>
                            <a class="btn btn-lg btn-white btn-white-outline" href="#">SIGN IN WITH EMAIL</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mbr-arrow mbr-arrow-floating" aria-hidden="true"><a href="#content1-2"><i class="mbr-arrow-icon"></i></a></div>

    </section>

    <section class="mbr-section article mbr-section__container" id="content1-2" style="background-color: rgb(255, 255, 255); padding-top: 20px; padding-bottom: 20px;">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 lead">

                </div>
            </div>
        </div>
    </section>
@stop