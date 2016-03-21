angular.module('helloAngular.directives')
    .directive('message', ['dataService', function(dataService) {
        return {
            restrict: 'E',
            scope: {
                message: "=data"
            },
            templateUrl: 'app/directives/message.html',
            link: function($scope, $el, attr) {
                $scope.dataService = dataService;
            }
        };
    }]);