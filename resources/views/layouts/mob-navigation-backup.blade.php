<section id="menu-0" class="visible-xs visible-sm hidden-md-up">
    <nav class="navbar navbar-dropdown navbar-fixed-top" ng-class="transNav == true ? 'transparent' : ''">
        <div class="container">

            <div class="mbr-table">
                <div class="mbr-table-cell">

                    <div class="navbar-brand" ng-mouseenter="logoHover = true" ng-mouseleave="logoHover = false">
                        <a href="/" class="navbar-logo">
                            <img ng-class="logoHover == true ? 'fa-spin' : ''" src="{{ url('assets/img/logo-ico.png') }}" alt="Complete Doddle">
                        </a>
                        <a class="navbar-caption" href="/">Complete Doddle</a>
                    </div>

                </div>
                <div class="mbr-table-cell">

                    <button class="navbar-toggler pull-xs-right hidden-md-up" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar">
                        <div class="hamburger-icon"></div>
                    </button>

                    <ul class="nav-dropdown collapse pull-md-right nav navbar-nav navbar-toggleable-sm" id="exCollapsingNavbar">
                        <!-- Mobile Logo -->
                        <li class="mob-logo">
                            <a href="/" class="navbar-logo">
                                <img ng-class="logoHover == true ? 'fa-spin' : ''" src="{{ url('assets/img/logo-ico.png') }}" alt="Complete Doddle">
                            </a>
                        </li>
                        <!-- Login / Create Btn Mobile -->
                        <li class="clearfix dropdown-buttons">
                            <div class="col-xs-6">
                                <button  ng-if="!account.token" class="nav-link btn btn-white btn-white-outline btn-block" ng-click="auth.getLogin()">Log In</button>
                                <button  ng-if="account.token" class="nav-link btn btn-white btn-white-outline btn-block" ng-click="auth.logout()">Log Out</button>
                            </div>
                            <div class="col-xs-6">
                                <button class="nav-link btn btn-white btn-white-outline btn-block" ng-click="createProject()">Create Project</button>
                            </div>
                        </li>

                        <!-- Account -->
                        <li ng-if="account.token" class="dropdown-header">Account</li>
                        <li ng-if="account.token" class="nav-item">
                            <a class="dropdown-item" href="profile/[[account.id]]/edit">Profile Manager</a>
                        </li>
                        <li ng-if="account.token" class="nav-item">
                            <a class="dropdown-item" href="profile/[[account.id]]/project-manager">Project Manager</a>
                        </li>
                        <li ng-if="account.token" class="nav-item">
                            <a class="dropdown-item" href="profile/[[account.id]]/funds" >Funds Manager</a>
                        </li>
                        <li ng-if="account.token" class="nav-item">
                            <a class="dropdown-item" href="profile/[[account.id]]/messages" >Messages</a>
                        </li>
                        <li ng-if="account.token" class="nav-item">
                            <a class="dropdown-item" href="profile/[[account.id]]/settings">Settings</a>
                        </li>

                        <li class="dropdown-header">Projects</li>
                        <!-- Project Categories -->
                        <li class="nav-item">
                            <a class="dropdown-item" href="projects">All Projects</a>
                        </li>
                        <li class="nav-item" ng-repeat="c in flatCats">
                            <a class="dropdown-item" href="projects?category=[[c.id]]">[[ c.name ]]</a>
                        </li>

                        <li class="dropdown-header">Shops</li>
                        <!-- Shop Categories -->
                        <li class="nav-item">
                            <a class="dropdown-item" href="shops">All Shops</a>
                        </li>
                        <li class="nav-item" ng-repeat="s in flatShopCats">
                            <a class="dropdown-item" href="shops?category=[[s.id]]">[[ s.name ]]</a>
                        </li>

                        <!-- Notifications -->
                        <li class="nav-item dropdown" ng-if="account.token">
                            <a class="nav-link link sm-link" data-toggle="dropdown-submenu" href="" aria-expanded="false">
                                <i class="fa fa-2x" ng-class="account.notifications.length > 0 ? 'fa-bell' : 'fa-bell-o'"></i>
                                <i ng-if="account.notifications.length > 0" ng-bind="account.notifications.length"></i>
                                <span class="visible-xs hidden-md-up"> NOTIFICATIONS</span>
                            </a>
                            <div class="dropdown-menu" ng-if="account.notifications.length > 0" ng-scrollbars>
                                <a ng-repeat="n in account.notifications" class="dropdown-item" href="" ng-if="!n.deleted">
                                    <p ng-bind-html="n.payload.data.notificationTitle"></p>
                                    <p ng-bind-html="n.payload.data.notificationText"></p>
                                </a>
                            </div>
                        </li>

                        <!-- Help -->
                        <li class="nav-item" ng-if="account.token">
                            <a class="nav-link link sm-link"  href="" aria-expanded="false">
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
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="" socialshare socialshare-provider="twitter" socialshare-text="Sky rocket your project on CompleteDoddle." socialshare-hashtags="CompleteDoddleUK" socialshare-url="[[ sharableUrl ]]" socialshare-media="assets/img/logo-ico.png">
                                    <i class="fa fa-twitter" aria-hidden="true"></i> Twitter
                                </a>
                                <a class="dropdown-item" href="">
                                    <i class="fa fa-facebook" aria-hidden="true"></i> Facebook
                                </a>
                                <a class="dropdown-item" href="" socialshare socialshare-provider="google" socialshare-text="Sky rocket your project on CompleteDoddle." socialshare-url="[[ sharableUrl ]]">
                                    <i class="fa fa-google-plus" aria-hidden="true"></i> Google+
                                </a>
                                <a class="dropdown-item" href="" socialshare socialshare-provider="linkedin" socialshare-text="Sky rocket your project on CompleteDoddle." socialshare-url="[[ sharableUrl ]]">
                                    <i class="fa fa-linkedin" aria-hidden="true"></i> LinkedIn
                                </a>
                                <a class="dropdown-item" href="" socialshare socialshare-provider="email" socialshare-text="Sky rocket your project on CompleteDoddle." socialshare-url="[[ sharableUrl ]]">
                                    <i class="fa fa-envelope" aria-hidden="true"></i> Email
                                </a>
                            </div>
                        </li>
                    </ul>

                    <button hidden="" class="navbar-toggler navbar-close pull-xs-right" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar">
                        <div class="close-icon"></div>
                    </button>

                </div>
            </div>

        </div>
    </nav>

</section>
