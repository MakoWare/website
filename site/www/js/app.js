var makoware = angular.module('makoware', [
    'ngRoute'
]);


makoware.config(['$routeProvider',
                function($routeProvider) {
                    $routeProvider.
                        when('/', {
                            templateUrl: 'partials/home.html',
                            controller: HomeCtrl}).
                        when('/about', {
                            templateUrl: 'partials/about.html',
                            controller: AboutCtrl}).
                        when('/contact', {
                            templateUrl: 'partials/contact.html',
                            controller: ContactCtrl}).
			otherwise({redirectTo: '/'});
		}]);
