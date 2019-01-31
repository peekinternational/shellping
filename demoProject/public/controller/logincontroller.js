
app.controller("loginController", function($scope,$http,$location,$rootScope) {
   
   /* check if the user session has then redirect to dashboard*/
  
   $http.get('getLoginData')
   .then(function(res){
       if(res.data.id){
        $location.path("/dashboard");
       }
    });

    /* login function hit api if the given credential are correct then sore data to seesion and redirect to dashboard*/
    
    $scope.login = function () {
        $http({
              method: 'POST',
              url: 'http://winged-guild-133523.appspot.com/api/v1/users/session',
              data:{email:$scope.email,password:$scope.password}
            }).then(function successCallback(response) {

              $rootScope.user = response.data;

              /*send data to nodejs server to save in session */

              $http.post('/saveLoginData',{user:response.data}).then((res) => {
                $location.path("/dashboard");// after save data in session redirect to dashboard
              })
               
            }, function errorCallback(response) { // if credential was wrong then show an alert username or password not correct
                $scope.notAuthorize = true; // its a flag show error message that username or password not correct
            });
    }
    
});