Polymer('three-geometry', {
    w: 100,
    h: 100,
    d: 100,
    extent: 0,
    ready: function() {
        console.log("three-geometry: ready()");

        this.extentChanged();
        this.initGeometry();
        this.parentNode.addChild(this);
    },

    initGeometry: function(){
        this.object = new THREE.BoxGeometry(this.w, this.h, this.d);
    },

    extentChanged: function() {
        if (this.extent) {
            this.w = this.h = this.d = this.extent;
        }
    }
});
