<section id="menu-0" class="hidden-sm-down">
    <nav class="navbar navbar-dropdown navbar-fixed-top navbar-short" ng-class="transNav == true ? 'transparent' : ''">
        <div class="container">

            <div class="mbr-table">
                <div class="mbr-table-cell">

                    <div class="navbar-brand" {{--ng-mouseenter="logoHover = true" ng-mouseleave="logoHover = false"--}}>
                        <a href="/" class="navbar-logo">
                            <img ng-class="logoHover == true ? 'fa-spin' : ''" src="{{ url('assets/img/logo-ico.png') }}" alt="Shelping.COM">
                        </a>
                        <a class="navbar-caption" href="/">Shelping.COM</a>
                    </div>

                </div>
                <div class="mbr-table-cell">

                    <ul class="nav-dropdown collapse pull-md-right nav navbar-nav navbar-toggleable-sm" ng-mouseover="desktopNavActive = true" ng-mouseleave="desktopNavActive = false">

                        <!-- Projects -->
                        <li class="dynamic-nav-item nav-item dropdown" ng-class="navUrl == '/projects' ? 'active' : ''">
                            <a class="nav-link link dropdown-toggle" data-toggle="dropdown-submenu" href="projects" aria-expanded="false">PROJECTS</a>
                            <div class="dropdown-menu dropdown-menu-dynamic dropdown-menu-cols menu-full-width" ng-class="desktopNavActive == true ? 'dropdown-container' : ''">
                                {{--<a ng-repeat="c in categories" ng-if="!c.disabled" class="dropdown-item" href="projects?category=[[ c.id ]]">[[ c.name ]]</a>--}}
                                <div class="dropdown dropdown-flex" ng-repeat="c in categories" ng-if="!c.disabled" ng-hide="selectedProjectCat.parent">
                                    <a class="dropdown-item" ng-class="c.children ? 'dropdown-toggle' : ''" ng-click="c.children ? setSubCats(c, c.children, null, 'projects') : resetNavDropdown()" ng-href="[[ c.children ? '' : 'projects?category=' + c.id ]]" data-toggle="dropdown-submenu" aria-expanded="false">
                                        <img style="width: 25px;margin-right: 5px;" class="pull-left" ng-src="assets/img/icons/grey/[[ c.name ]]_ico.png"/> [[ c.name ]]
                                    </a>
                                </div>

                                <!-- Create a project link -->
                                <div class="dropdown dropdown-flex">
                                    <a class="dropdown-item" ng-click="createProject()">Create A New Project</a>
                                </div>

                                <!-- Sub Cats -->
                                <div ng-if="selectedProjectCat.parent">
                                    <ng-include src="'views/partials/project-sub-cats.html'"></ng-include>
                                </div>
                            </div>
                        </li>

                        <!-- Shops -->
                        {{--<li class="dynamic-nav-item nav-item dropdown" ng-class="navUrl == '/shops' ? 'active' : ''">
                            <a class="nav-link link dropdown-toggle" data-toggle="dropdown-submenu" href="shops" aria-expanded="false">SHOPS</a>
                            <div class="dropdown-menu dropdown-menu-dynamic dropdown-menu-cols menu-full-width" ng-class="desktopNavActive == true ? 'dropdown-container' : ''">
                                <div class="dropdown dropdown-flex" ng-repeat="c in shopCategories" ng-if="!c.disabled" ng-hide="selectedShopCat.parent">
                                    <a class="dropdown-item" ng-class="c.children ? 'dropdown-toggle' : ''" ng-click="c.children ? setSubCats(c, c.children, null, 'shops') : resetNavDropdown()" ng-href="[[ c.children ? '' : 'shops?category=' + c.id ]]" data-toggle="dropdown-submenu" aria-expanded="false">[[ c.name ]]</a>
                                </div>

                                <!-- Back Link -->
                                <div class="dropdown" ng-if="selectedShopCat.parent">
                                    <a class="dropdown-item" ng-class="" ng-click="selectedShopCat.lastParent != null ? setSubCats(selectedShopCat.lastParent, selectedShopCat.lastParent.children, null, 'shops') : resetSubCats('shops')" data-toggle="dropdown-submenu" aria-expanded="false">< Back</a>
                                </div>

                                <!-- Sub Cats -->
                                <div ng-if="selectedShopCat.parent">
                                    <ng-include src="'views/partials/shop-sub-cats.html'"></ng-include>
                                </div>
                            </div>
                        </li>--}}

                        <!-- Users -->
                        {{--<li class="nav-item dropdown" ng-class="navUrl == '/users' ? 'active' : ''">
                            <a class="nav-link link single-link"  href="users" aria-expanded="false">USERS</a>
                        </li>--}}

                        <!-- Store -->
                        <li class="nav-item dropdown" ng-class="navUrl == '/store' ? 'active' : ''">
                            <a class="nav-link link single-link"  href="store" aria-expanded="false">STORE</a>
                        </li>

                        <!-- Create New Project -->
                        <li class="nav-item nav-btn hidden-sm-down">
                            <button class="nav-link btn btn-white btn-white-outline pull-md-right" ng-click="createProject()">Create Project</button>
                        </li>

                        <!-- Login Btn -->
                        <li class="nav-item nav-btn hidden-sm-down" ng-if="!account.token">
                            <button class="nav-link btn btn-white btn-white-outline" ng-click="auth.getLogin()" data-toggle="tooltip" data-placement="bottom" title="Login">
                                <i class="fa fa-user-circle" aria-hidden="true"></i>
                            </button>
                        </li>

                        <!-- Account -->
                        <li class="nav-item dropdown nav-account" ng-if="account.token" ng-class="navUrl == '/profile*' ? 'active' : ''">
                            <a class="nav-link link sm-link" data-toggle="dropdown-account" href="users/[[account.id]]">
                                <div class="cd-avatar cd-avatar-sm">
                                    <img ng-src="[[ account.photo ? account.photo : '/assets/img/missing-avatar.png' ]]" />
                                </div>
                                <span class="visible-xs hidden-md-up"> [[ account.name ]]</span>
                            </a>
                            <div class="dropdown-menu dropdown-container dropdown-menu-sm">
                                <a class="dropdown-item" href="account/[[account.id]]/edit">Profile Manager</a>
                                <a class="dropdown-item" href="account/[[account.id]]/project-manager">My Projects</a>
                                <a class="dropdown-item" href="account/[[account.id]]/supported-projects">My Supported Projects</a>
                                <a class="dropdown-item" href="account/[[account.id]]/subscriptions">Subscriptions Manager</a>
                                <a class="dropdown-item" href="account/[[account.id]]/purchase-history">Purchase History</a>
                                <a class="dropdown-item" href="account/[[account.id]]/funds" >Funds Manager</a>
                                <a class="dropdown-item" href="account/[[account.id]]/messages" >Messages</a>
                                <a class="dropdown-item" href="account/[[account.id]]/settings">Settings</a>
                                <a class="dropdown-item divider" href=""></a>
                                <a class="dropdown-item" href="" ng-click="auth.logout()">Logout</a>
                            </div>
                        </li>

                        <!-- Notifications -->
                        {{--<li class="nav-item dropdown" ng-if="account.token">
                            <a class="nav-link link sm-link" data-toggle="dropdown-submenu" href="" aria-expanded="false" aria-hidden="true">
                                <i class="fa fa-2x" ng-class="account.notifications.length > 0 ? 'fa-bell' : 'fa-bell-o'"></i>
                                <i ng-if="account.notifications.length > 0" ng-bind="account.notifications.length"></i>
                                <span class="visible-xs hidden-md-up"> NOTIFICATIONS</span>
                            </a>
                            <div class="dropdown-menu dropdown-container dropdown-menu-sm notification-container" ng-if="account.notifications.length > 0" ng-scrollbars>
                                <a ng-repeat="n in account.notifications" ng-class="n.unread == true ? 'unread' : ''" class="dropdown-item notification" href="" ng-if="!n.deleted" ng-click="viewNotification(n)">
                                    <div><p ng-bind-html="n.payload.data.notificationTitle"></p></div>
                                    <div><p ng-bind-html="n.payload.data.notificationText"></p></div>
                                    <div><p><span ng-bind="n.created | date:'longDate' : timezone:'GMT'"></span></p></div>
                                </a>
                            </div>
                        </li>--}}
                        <li class="nav-item" data-toggle="tooltip" data-placement="bottom" title="Notifications" ng-if="account.token">
                            <a class="nav-link link sm-link"  href="" aria-expanded="false" ng-click="showNotifications()">
                                <i class="fa-2x" ng-class="account.notifications.length > 0 ? 'fas fa-bell' : 'far fa-bell'"></i>
                                <i ng-if="account.notifications.length > 0" ng-bind="account.notifications.length"></i>
                                <span class="visible-xs hidden-md-up"> NOTIFICATIONS</span>
                            </a>
                        </li>

                        <!-- Help -->
                        <li class="nav-item" data-toggle="tooltip" data-placement="bottom" title="Help">
                            <a class="nav-link link sm-link"  href="" aria-expanded="false" ng-click="showHelp(currentHelpText)">
                                <i class="fa fa-question-circle fa-2x"></i>
                                <span class="visible-xs hidden-md-up"> HELP</span>
                            </a>
                        </li>

                        <!-- Share Page -->
                        <li class="nav-item dropdown">
                            <a class="nav-link link sm-link" data-toggle="dropdown-submenu" href="" aria-expanded="false">
                                <i class="fa fa-share-alt fa-2x"></i>
                                <span class="visible-xs hidden-md-up"> SHARE PAGE</span>
                            </a>
                            <div class="dropdown-menu dropdown-container dropdown-menu-sm">
                                <a class="dropdown-item" href="" socialshare socialshare-provider="twitter" socialshare-text="Sky rocket your project on Shelping.COM." socialshare-hashtags="Shelping.COM" socialshare-url="[[ sharableUrl ]]" socialshare-media="assets/img/logo-ico.png">
                                    <i class="fab fa-twitter" aria-hidden="true"></i> Twitter
                                </a>
                                <a class="dropdown-item" href="" socialshare socialshare-provider="facebook" socialshare-text="Sky rocket your project on Shelping.COM." socialshare-type="share" socialshare-via="274676456259523" socialshare-url="[[ sharableUrl ]]">
                                    <i class="fab fa-facebook-f" aria-hidden="true"></i> Facebook
                                </a>
                                <a class="dropdown-item" href="" socialshare socialshare-provider="google" socialshare-text="Sky rocket your project on Shelping.COM." socialshare-url="[[ sharableUrl ]]">
                                    <i class="fab fa-google-plus-g" aria-hidden="true"></i> Google+
                                </a>
                                <a class="dropdown-item" href="" socialshare socialshare-provider="linkedin" socialshare-text="Sky rocket your project on Shelping.COM." socialshare-url="[[ sharableUrl ]]">
                                    <i class="fab fa-linkedin-in" aria-hidden="true"></i> LinkedIn
                                </a>
                                <a class="dropdown-item" href="" ng-click="ShareModel()">
                                    <i class="fa fa-share-alt" aria-hidden="true"></i> Other
                                </a>
                                <a class="dropdown-item" href="" socialshare socialshare-provider="email" socialshare-subject="Shelping.COM" socialshare-body="Sky rocket your project on Shelping.COM. [[ sharableUrl ]]">
                                    <i class="fa fa-envelope" aria-hidden="true"></i> Email
                                </a>
                            </div>
                        </li>

                        <!-- Cart -->
                        <li class="nav-item dropdown" ng-class="navUrl == '/store/cart' ? 'active' : ''">
                            <a class="nav-link link single-link" href="store/cart" aria-expanded="false">
                                <span ng-class="cart.getTotalItems() > 0 ? 'text-success' : ''">
                                    <i class="fa fa-2x fa-shopping-cart"></i> 
                                    <span class="cart-count">[[ cart.getItems().length ]]</span>
                                </span>
                            </a>
                        </li>
                    </ul>

                </div>
            </div>

        </div>

        <div class="nav-breadcrumbs cd-shadow" ng-if="navUrl != '/'">
            <div class="container">
              
                <ol class="ab-nav breadcrumb" ng-if="navUrl != '/projects/create'">
                    <li ng-repeat="breadcrumb in breadcrumbs.get() track by breadcrumb.path" ng-class="{ active: $last }">
                        <a ng-if="!$last" ng-href="[[ breadcrumb.path ]]" ng-bind="breadcrumb.label" class="margin-right-xs text-black"></a>
                        <span ng-if="$last" ng-bind="breadcrumb.label"></span>
                    </li>

                </ol>
                <ol class="ab-nav breadcrumb create-breadcrmb" ng-if="navUrl == '/projects/create'">
                    <!-- <li ng-repeat="breadcrumb in breadcrumbs.get() track by breadcrumb.path" ng-class="{ active: $last }">
                        <a ng-if="!$last" ng-href="[[ breadcrumb.path ]]" ng-bind="breadcrumb.label" class="margin-right-xs text-black"></a>
                        <span ng-if="$last" ng-bind="breadcrumb.label"></span>
                    </li>-->
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="projects/create">Add Project</a>
                    </li>
                    <li  ng-if="createStep == 3">
                        <a href="">Share on Facebook</a>
                    </li>

                    <li  ng-if="createStep == 4">
                        <a href="">Share on Twitter</a>
                    </li>

                    <li  ng-if="createStep == 5">
                        <a href="">Share Project</a>
                    </li>
                </ol>
            </div>
        </div>
    </nav>
</section>
