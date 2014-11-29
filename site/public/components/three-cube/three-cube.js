Polymer('three-cube', {
    ready: function() {
        this.super();
//        this.initGeometry();
//        this.initMaterial();
//        this.initObject();

//        this.parentNode.addChild(this);
        console.log("three-cube: ready()");
    },

    addChildGeomentryinitGeometry: function(){
        this.geometry = new THREE.BoxGeometry( 200, 200, 200 );
    },

    initMaterial: function(){
	this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    },

    initObject: function(){
        this.object = new THREE.Mesh(this.geometry, this.material);
        this.object.hasAnimation = true;
        this.initAnimation();
    },

    initAnimation: function(){
        this.object.animate = function(){
            this.rotation.x += 0.01;
        };
    }

});
