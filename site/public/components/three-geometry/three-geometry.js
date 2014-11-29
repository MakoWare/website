Polymer('three-geometry', {
    w: 100,
    h: 100,
    d: 100,
    extent: 0,
    ready: function() {
        this.extentChanged();
        this.object = new THREE.CubeGeometry(this.w, this.h, this.d);
    },
    extentChanged: function() {
        if (this.extent) {
            this.w = this.h = this.d = this.extent;
        }
    }
});
