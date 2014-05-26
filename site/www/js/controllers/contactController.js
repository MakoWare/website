//Contact Controller

var ContactCtrl = BaseController.extend({

    init: function($scope, $route){
        this._super($scope);
    },

    defineListeners: function(){
        this._super();
    }
});

ContactCtrl.$inject = ['$scope'];
