Polymer('three-material', {
    ready: function() {
        console.log("three-material: ready()");

        this.initMaterial();
        this.parentNode.addChild(this);
    },

    initMaterial: function(){
        var  material = new THREE.MeshBasicMaterial( { color: 0xe0e0e0, overdraw: 0.5 } );
        this.object = material;
    }

});
