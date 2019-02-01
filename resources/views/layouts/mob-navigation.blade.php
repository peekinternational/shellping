<section id="menu-0" class="visible-xs visible-sm hidden-md-up" ng-controller="MobileNavController">
    <nav class="navbar navbar-dropdown navbar-fixed-top" ng-class="transNav == true ? 'transparent' : ''">
        <div class="container">

            <div class="mbr-table">
                <div class="mbr-table-cell">

                    <div class="navbar-brand" {{--ng-mouseenter="logoHover = true" ng-mouseleave="logoHover = false"--}}>
                        <a href="/" class="navbar-logo">
                            <img ng-class="logoHover == true ? 'fa-spin' : ''" src="{{ url('assets/img/logo-ico.png') }}" alt="Shelping.COM">
                        </a>
                        <!-- <a class="navbar-caption" href="/">Shelping.COM</a> -->
                    </div>
                </div>
                <div class="mbr-table-cell hidden-md-up">
                    <!-- Toggle -->
                    <a class="nav-link link sm-link" data-toggle="dropdown-account" href="users/119290002">
                      <span>
                        <i class="fa fa-search fa-2x"></i>
                      </span>
                    </a>
                    <a class="nav-link link sm-link" data-toggle="dropdown-account" href="account/[[account.id]]/edit" style="margin-left: 15px; margin-right: -36px;">
                      <div class="cd-avatar cd-avatar-sm">
                          <img ng-src="/assets/img/missing-avatar.png" src="/assets/img/missing-avatar.png">
                      </div>
                    </a>
                    
                    <button id="mobNavToggle" class="btn btn-link btn-xs pull-xs-right hidden-md-up text-black cd-no-padding" style="margin-left: 15px;" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar" ng-click="MobNav()">
                        <i ng-class="!toggleMobNav ? 'fas fa-bars fa-2x' : 'fas fa-times fa-2x'"></i>
                    </button>
                    <!-- Cart -->
                    <a class="btn btn-link btn-xs pull-xs-right hidden-md-up text-black cd-no-padding" href="store/cart" aria-expanded="false" style="margin-left: -36px;">
                        <span ng-class="cart.getTotalItems() > 0 ? 'text-success' : ''">
                            <i class="fa fa-shopping-cart fa-2x"></i> [[ cart.getItems().length ]]
                        </span>
                    </a>
                </div>
                <div class="mbr-table-cell">

                    <ul class="nav-dropdown collapse pull-md-right nav navbar-nav navbar-toggleable-sm mob-nav" id="exCollapsingNavbar" aria-expanded="true">
                        <!-- Store -->
                        <li class="nav-item dropdown" ng-class="navUrl == '/projects/create' ? 'nav-active' : ''" ng-click="MobNav()">
                            <a class="nav-link link single-link" ng-href="projects/create" aria-expanded="false">Add Project</a>
                        </li>
                        <!-- Projects -->
                        <li class="nav-item dropdown" ng-class="mobNavType == 'Projects' ? 'nav-item dropdown open' : 'nav-item dropdown'" id="navProjects">
                            <h2 class="nav-link link dropdown-toggle" data-toggle="dropdown-topmenu" ng-click="typeSelect('Projects')" aria-expanded="[[ mobNavType == 'Projects' ? 'true' : 'false' ]]" data-target="#navProjects"><b>Search Projects</b></h2>
                            <h4 class="nav-link link nav-breadcrumb dropdown-toggle" aria-expanded="true" ng-show="mobNavBreadcrumbs.length > 0 && mobNavType == 'Projects'" ng-repeat="b in mobNavBreadcrumbs" ng-click="mobPrevSelect(b)"><b>[[ b.name ]]</b></h4>
                            <div class="dropdown-menu">
                                <h4 class="nav-link link dropdown-toggle" aria-expanded="true" ng-show="mobParent.name != null">
                                    <b><img style="width: 25px;margin-right: 5px;" class="pull-left" ng-src="assets/img/icons/grey/[[ mobParent.name ]]_ico.png"/> [[ mobParent.name ]]</b>
                                    <i class="fa fa-check fa-2x pull-right check-ico"></i>
                                </h4>
                                <a class="dropdown-item animated fadeInUp" ng-href="[[ mobParent.children.length > 0 ? 'projects?category=' + mobParent.id : 'projects' ]]" ng-bind="mobParent.children.length > 0 ? 'View all ' + mobParent.name : 'View all projects'" data-target="#navShops"></a>
                                <div class="animated fadeInUp" ng-repeat="c in mobCategory" ng-if="!c.disabled" ng-class="c.children ? 'dropdown' : ''" >
                                    <!-- Recursive Dropdown Start -->
                                    <a ng-class="c.children.length > 0 ? 'dropdown-item dropdown-toggle' : 'dropdown-item'" ng-click="c.children.length > 0 ? mobCategorySelect(c) : ''" ng-href="[[ c.children.length > 0 ? '' : 'projects?category=' + c.id ]]" aria-expanded="false">
                                        <img style="width: 25px;margin-right: 5px;" class="pull-left" ng-src="assets/img/icons/grey/[[ c.name ]]_ico.png"/> [[ c.name ]]
                                        <i class="fa fa-check pull-right sub-check-ico" ng-if="navUrl == '/projects?category=' + c.id"></i>
                                    </a>
                                    <!-- End Recursive -->
                                </div>
                            </div>
                        </li>

                        <!-- Store -->
                        <li class="nav-item dropdown" ng-class="navUrl == '/store' ? 'nav-active' : ''">
                            <a class="nav-link link single-link"  href="store" aria-expanded="false">Shelping.COM Products</a>
                        </li>

                        <!-- Calculator -->
                        <li class="nav-item dropdown" ng-class="navUrl == '/calculator' ? 'nav-active' : ''">
                            <a class="nav-link link single-link"  href="calculator" aria-expanded="false">Funds Calculator</a>
                        </li>

                        <!-- Account Signed In -->
                        <li ng-if="account.token" class="nav-item dropdown" ng-class="mobNavType == 'Account' ? 'nav-item dropdown open' : 'nav-item dropdown'" id="navAccount">
                            <h2 class="nav-link link dropdown-toggle" data-toggle="dropdown-topmenu" ng-click="typeSelect('Account')" data-target="#navAccount" aria-expanded="[[ mobNavType == 'Account' ? 'true' : 'false' ]]">
                                <b>My account</b>
                            </h2>
                            <div class="dropdown-menu">
                                <a class="dropdown-item animated fadeInUp" href="account/[[account.id]]/edit">Profile Manager</a>
                                <a class="dropdown-item animated fadeInUp" href="account/[[account.id]]/project-manager">My Projects</a>
                                <a class="dropdown-item animated fadeInUp" href="account/[[account.id]]/supported-projects">My Supported Projects</a>
                                <a class="dropdown-item animated fadeInUp" href="account/[[account.id]]/subscriptions">Subscriptions Manager</a>
                                <a class="dropdown-item animated fadeInUp" href="account/[[account.id]]/purchase-history">Purchase History</a>
                                <a class="dropdown-item animated fadeInUp" href="account/[[account.id]]/funds" >Funds Manager</a>
                                <a class="dropdown-item animated fadeInUp" href="account/[[account.id]]/messages" >Messages</a>
                                <a class="dropdown-item animated fadeInUp" href="account/[[account.id]]/settings">Settings</a>
                            </div>
                        </li>

                        <!-- Signin -->
                        <li ng-if="!account.token" class="nav-item">
                            <h2 class="nav-link link sm-link"  href="" aria-expanded="false" ng-click="auth.getLogin()"><b>Signin</b></h2>
                        </li>

                        <!-- Signout -->
                        <li ng-if="account.token" class="nav-item">
                            <h2 class="nav-link link sm-link"  href="" aria-expanded="false" ng-click="auth.logout()"><b>Signout</b></h2>
                        </li>

                        <!-- Notifications -->
                        {{--<li class="nav-item dropdown" ng-if="account.token">
                            <a class="nav-link link sm-link" data-toggle="dropdown-submenu" href="" aria-expanded="false">
                                <i class="pull-right" ng-if="account.notifications.length > 0" ng-bind="account.notifications.length"></i>
                                <span class="visible-xs hidden-md-up"> Notifications</span>
                            </a>
                            <div class="dropdown-menu" ng-if="account.notifications.length > 0" ng-scrollbars>
                                <a ng-repeat="n in account.notifications" class="dropdown-item" href="" ng-if="!n.deleted" ng-click="viewNotification(n)" aria-expanded="false">
                                    <p ng-bind-html="n.payload.data.notificationTitle"></p>
                                    <p ng-bind-html="n.payload.data.notificationText"></p>
                                </a>
                            </div>
                        </li>--}}

                        <!-- Help -->
                        {{--<li class="nav-item" ng-if="account.token">
                            <a class="nav-link link sm-link"  href="" aria-expanded="false" ng-click="showHelp(currentHelpText)">
                                <span class="visible-xs hidden-md-up"> Help</span>
                            </a>
                        </li>--}}

                        <!-- Share Page -->
                        <li class="nav-item dropdown" ng-class="mobNavType == 'Share' ? 'nav-item dropdown open' : 'nav-item dropdown'" id="navShare">
                            <h2 class="nav-link link dropdown-toggle" data-toggle="dropdown-topmenu" ng-click="typeSelect('Share')" aria-expanded="[[ mobNavType == 'Share' ? 'true' : 'false' ]]" data-target="#navShare">
                                <b>Share page</b>
                            </h2>
                            <div class="dropdown-menu">
                                <a class="dropdown-item animated fadeInUp" href="" socialshare socialshare-provider="twitter" socialshare-text="Sky rocket your project on Shelping.COM." socialshare-hashtags="Shelping.COM" socialshare-url="[[ sharableUrl ]]" socialshare-media="assets/img/logo-ico.png">
                                    <i class="fab fa-twitter" aria-hidden="true"></i> Twitter
                                </a>
                                <a class="dropdown-item animated fadeInUp" href="">
                                    <i class="fab fa-facebook-f" aria-hidden="true"></i> Facebook
                                </a>
                                <a class="dropdown-item animated fadeInUp" href="" socialshare socialshare-provider="google" socialshare-text="Sky rocket your project on Shelping.COM." socialshare-url="[[ sharableUrl ]]">
                                    <i class="fab fa-google-plus-g" aria-hidden="true"></i> Google+
                                </a>
                                <a class="dropdown-item animated fadeInUp" href="" socialshare socialshare-provider="linkedin" socialshare-text="Sky rocket your project on Shelping.COM." socialshare-url="[[ sharableUrl ]]">
                                    <i class="fab fa-linkedin-in" aria-hidden="true"></i> LinkedIn
                                </a>
                                <a class="dropdown-item animated fadeInUp" href="" ng-click="ShareModel()">
                                    <i class="fa fa-share-alt" aria-hidden="true"></i> Other
                                </a>
                                <a class="dropdown-item animated fadeInUp" href="" socialshare socialshare-provider="email" socialshare-text="Sky rocket your project on Shelping.COM." socialshare-url="[[ sharableUrl ]]">
                                    <i class="fa fa-envelope" aria-hidden="true"></i> Email
                                </a>
                            </div>
                        </li>
                    </ul>

                </div>
            </div>

        </div>
        <div class="nav-breadcrumbs cd-shadow" ng-if="navUrl != '/'">
            <div class="container">
                <ol class="ab-nav breadcrumb">
                    <li ng-repeat="breadcrumb in breadcrumbs.get() track by breadcrumb.path" ng-class="{ active: $last }">
                        <a ng-if="!$last" ng-href="[[ breadcrumb.path ]]" ng-bind="breadcrumb.label" class="margin-right-xs text-black"></a>
                        <span ng-if="$last" ng-bind="breadcrumb.label"></span>
                    </li>
                </ol>
            </div>
        </div>
    </nav>

</section>
