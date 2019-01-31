
app.controller("dashController", function($scope, $http, $window, $location, $rootScope) {
        $http.get('getLoginData') // get login user data from nodejs session if has a session then store user details to angular varaible else redirect to login 
        .then(function(res){
            if(res.data.id){
                
                $scope.user = res.data;

                /* hit api to get projects and store into angular variable projects*/
                
                $http.get('http://winged-guild-133523.appspot.com/api/v1/projects/random?max=8')
                .then(function(res){
                    $scope.projects = res.data;
                })

                /* hit api to get products and store into angular variable products*/

                $http.get('http://winged-guild-133523.appspot.com/api/v1/items?categories=cat1&categories=cat2&promo=false')
                .then(function(res){
                    $scope.products = res.data.data;
                })

                /* send request to nodejs server to remove session and redirect to login page*/
                $scope.logout = () => {
                    $http.get('/logout').then((res) => {
                        if(res.data.message === 'session destroy')
                            $location.path("/");
                    })
                }
            }else{
                $location.path("/");// if user not login then redirect to login so no one can direct access this page with out login
            }
            
        })
    
});