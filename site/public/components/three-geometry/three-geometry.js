Polymer('three-geometry', {
    w: 100,
    h: 100,
    d: 100,
    extent: 0,
    ready: function() {
        console.log("three-geometry: ready()");
        this.initGeometry();
    },

    initGeometry: function(){
        if(this.type == "Box"){
            this.object = new THREE.BoxGeometry(this.w, this.h, this.d);
        } else if(this.type == "PlaneBuffer"){
            this.object = new THREE.PlaneBufferGeometry( this.w, this.h);
            this.object.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
        }

        this.fire('three-geometry-changed');
    },

    addChild: function(child){
        if(child.object){
            if(child.localName == 'three-face'){
                this.object.faces[child.object.index] = child.object;
            }
        }
    }
});
