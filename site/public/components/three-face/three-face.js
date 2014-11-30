Polymer('three-face', {
    a: 100,
    b: 100,
    c: 100,
    index: 0,

    ready: function() {
        this.initFace();
        this.parentNode.addChild(this);
    },

    initFace: function(){
        this.a = this.attributes["a"].value;
        this.b = this.attributes["b"].value;
        this.c = this.attributes["c"].value;
        this.index = this.attributes["index"].value;
        this.materialIndex = this.attributes["materialIndex"].value;
        this.color = this.attributes["color"].value;

        var normal = new THREE.Vector3( 0, 1, 0 );
        var face = new THREE.Face3( this.a, this.b, this.c, normal, this.color, this.materialIndex);
        face.color.setHex(this.color);
        face.index = this.index;

        this.object = face;
    }

});
