//About Controller

var AboutCtrl = BaseController.extend({
    init: function($scope, $route){
        this._super($scope);
    },

    defineListeners: function(){
        this._super();
    }

});

AboutCtrl.$inject = ['$scope'];
