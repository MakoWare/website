//Nav Controller

var NavCtrl = BaseController.extend({

    _location: null,

    init: function($scope, $route){
        this._super($scope);
        this._location = "replace with url";
    },

    defineListeners: function(){
        this._super();

    }
});
