//Home Controller

var HomeCtrl = BaseController.extend({



    init: function($scope, $route){
        this._super($scope);
    },

    defineListeners: function(){
        this._super();
    }



});

HomeCtrl.$inject = ['$scope'];

//var homeCtrl = new HomeCtrl($scope);
//console.log(homeCtrl);
