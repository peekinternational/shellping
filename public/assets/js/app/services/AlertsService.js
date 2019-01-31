/**
 * Created by Ben.Hamlett on 20/04/2017.
 */
app.service('AlertsService', function () {
    var alerts = [];

    /**
     * Adds new alerts
     * @param code      = Message code/s ( 200 ok; 201 created; 204 no content; 401 auth required; 403 forbidden; 409 conflict; 422 unprocessable entity;)
     * @param message   = Message
     */
    alerts.add = function (code, message) {
        var type;
        // Determine the message type
        switch (code) {
            case 200:
                type = "success";
                break;
            case 201:
                type = "success";
                break;
            case 204:
                type = "warning";
                break;
            case 401:
                type = "warning";
                break;
            case 403:
                type = "warning";
                break;
            case 409:
                type = "danger";
                break;
            case 422:
                type = "danger";
        }
        // Add message to array
        alerts.push({
            id: alerts.length,
            code: code,
            type: type,
            message: message
        });
    };

    return alerts;
});