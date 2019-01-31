/**
 * Created by Ben.Hamlett on 21/04/2017.
 */
app.service('ModalsService', [ '$uibModal', '$uibModalStack', function ($uibModal, $uibModalStack)
{
    /**
     * Opens a bootstrap modal box with the following options
     * @param controller    = Controller to use
     * @param title         = Title of the modal box
     * @param template      = Template view to use
     * @param size          = size
     * @param resolve       = data to pass to the controller
     * @returns {Window|*|{get, set}}
     */
    this.openModal = function(controller, title, template, size, resolve)
    {
        return $uibModal.open({
            ignoreLoadingBar: true,
            templateUrl: 'views/modal.html',
            controller: controller,
            size: size,
            backdrop: 'static',
            keyboard: false,
            resolve: {
                items: function () {
                    return resolve
                },
                title: function () {
                    return title
                },
                view: function () {
                    return template
                }
            }
        });
    };

    this.closeAll = function () {
        return $uibModalStack.dismissAll();
    }
}]);