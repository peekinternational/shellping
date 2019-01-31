<section id="menu-0" class="hidden-sm-down">
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

                    <ul class="nav-dropdown collapse pull-md-right nav navbar-nav navbar-toggleable-sm">
                        <li class="nav-item dropdown" ng-class="navUrl == '/projects' ? 'active' : ''">
                            <a class="nav-link link dropdown-toggle" data-toggle="dropdown-submenu" href="projects" aria-expanded="false">PROJECTS</a>
                            <div class="dropdown-menu">
                                {{--<a ng-repeat="c in categories" ng-if="!c.disabled" class="dropdown-item" href="projects?category=[[ c.id ]]">[[ c.name ]]</a>--}}
                                <div class="dropdown dropdown-flex" ng-repeat="c in categories" ng-if="!c.disabled">
                                    <a class="dropdown-item" ng-class="c.children ? 'dropdown-toggle' : ''" href="projects?category=[[ c.id ]]" data-toggle="dropdown-submenu" aria-expanded="false">[[ c.name ]]</a>
                                    <div class="dropdown-menu dropdown-submenu" ng-if="c.children.length > 0">
                                        <a class="dropdown-item" href="projects?category=[[ sub.id ]]" ng-repeat="sub in c.children" ng-if="!sub.disabled">[[ sub.name ]]</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <!--user.tab-->
                        <li class="nav-item" ng-class="navUrl == '/users' ? 'active' : ''">
                            <a class="nav-link link single-link"  href="users" aria-expanded="false">USERS</a>
                        </li>

                        <li class="nav-item dropdown" ng-class="navUrl == '/shops' ? 'active' : ''">
                            <a class="nav-link link dropdown-toggle" data-toggle="dropdown-submenu" href="shops" aria-expanded="false">SHOPS</a>
                            <div class="dropdown-menu dropdown-flex">
                                {{--<a ng-repeat="c in shopCategories" ng-if="!c.disabled" class="dropdown-item" href="shops/categories/[[ c.id ]]" ng-if="!c.children">[[ c.name ]]</a>--}}
                                <div class="dropdown" ng-repeat="c in shopCategories" ng-if="!c.disabled">
                                    <a class="dropdown-item" ng-class="c.children ? 'dropdown-toggle' : ''" href="shops?category=[[ c.id ]]" data-toggle="dropdown-submenu" aria-expanded="false">[[ c.name ]]</a>
                                    <div class="dropdown-menu dropdown-submenu" ng-if="c.children.length > 0">
                                        <a class="dropdown-item" href="shops?category=[[ sub.id ]]" ng-repeat="sub in c.children" ng-if="!sub.disabled">[[ sub.name ]]</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <!-- Login Btn -->
                        <li class="nav-item nav-btn hidden-sm-down" ng-if="!account.token">
                            <button class="nav-link btn btn-white btn-white-outline" ng-click="auth.getLogin()">Log In</button>
                        </li>

                        <!-- Create New Project -->
                        <li class="nav-item nav-btn hidden-sm-down">
                            <button class="nav-link btn btn-white btn-white-outline pull-md-right" ng-click="createProject()">Create Project</button>
                        </li>

                        <li class="nav-item dropdown nav-account" ng-if="account.token" ng-class="navUrl == '/profile*' ? 'active' : ''">
                            <a class="nav-link link sm-link" data-toggle="dropdown-submenu" href="users/[[account.id]]" aria-expanded="false">
                                <img check-image class="img-circle account-photo" ng-src="[[ account.photo ? account.photo : '/assets/img/missing-avatar.png' ]]" width="25px" />
                                <span class="visible-xs hidden-md-up"> [[ account.name ]]</span>
                            </a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="profile/[[account.id]]/edit">Profile Manager</a>
                                <a class="dropdown-item" href="profile/[[account.id]]/project-manager">Project Manager</a>
                                <a class="dropdown-item" href="profile/[[account.id]]/funds" >Funds Manager</a>
                                <a class="dropdown-item" href="profile/[[account.id]]/messages" >Messages</a>
                                <a class="dropdown-item" href="profile/[[account.id]]/settings">Settings</a>
                                <a class="dropdown-item divider" href=""></a>
                                <a class="dropdown-item" href="" ng-click="auth.logout()">Logout</a>
                            </div>
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
                                <a class="dropdown-item" href="" socialshare socialshare-provider="facebook" socialshare-text="Sky rocket your project on CompleteDoddle." socialshare-type="share" socialshare-via="274676456259523" socialshare-url="[[ sharableUrl ]]">
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

                </div>
            </div>

        </div>
    </nav>

</section>
