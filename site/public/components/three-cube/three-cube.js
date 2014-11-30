Polymer('three-cube', {
    ready: function() {
        this.super();
//        this.initGeometry();
//        this.initMaterial();
//        this.initObject();

//        this.parentNode.addChild(this);


        console.log("three-cube: ready()");
    },


    initObject: function(){
        this.object.hasAnimation = true;
        this.initAnimation();
    },

    initAnimation: function(){
        this.object.hasAnimation = true;
        this.object.animate = function(){
            this.rotation.y += 0.01;
        };
    }

});
