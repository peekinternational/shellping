<div class="growl" ng-controller="AlertsController">
    <div ng-repeat="a in alerts"
         class="alert alert-block bg-[[ a.type ]] animated fadeInDown clearfix alert-content"
         id="[[ a.id ]]" {{--ng-init="fadeOut()"--}}>
        <div class="container">
        <div class="col-xs-11 cd-no-padding">
            <i class="fa" ng-class="a.type == 'success' ? 'fa-check-circle' : (a.type == 'danger' ? 'fa-exclamation-circle' : '')"></i> <span ng-bind="a.message"></span>
        </div>
        <div class="col-xs-1 cd-no-padding">
            <button ng-click="removeAlert(a)" type="button" class="close" data-dismiss="alert">&times;</button>
        </div>
    </div>
    </div>
</div>