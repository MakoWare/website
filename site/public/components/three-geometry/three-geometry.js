Polymer('three-geometry', {
    w: 100,
    h: 100,
    d: 100,
    extent: 0,
    ready: function() {
        console.log("three-geometry: ready()");


        this.initGeometry();
        this.parentNode.addChild(this);
    },

    initGeometry: function(){
        this.w = this.attributes["w"].value;
        this.h = this.attributes["h"].value;
        this.d = this.attributes["d"].value;
        this.object = new THREE.BoxGeometry(this.w, this.h, this.d);
    },

    addChild: function(child){
        console.log("three-geometry: addChild()");

        if(child.object){
            if(child.localName == 'three-face'){
                this.object.faces[child.object.index] = child.object;
            }
        }
    }
});
