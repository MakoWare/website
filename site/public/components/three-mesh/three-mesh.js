Polymer('three-mesh', {
    ready: function() {
        //this.validate();
        this.observeDOM();
    },
    observeDOM: function() {
        this.onMutation(this, function() {
            this.validate();
            this.observeDOM();
        });
    },
    validate: function() {
        if (!this.objectParent) {
            if (!this.geometry) {
                var g = this.querySelector('three-geometry');
                this.geometry = g ? g.object : null;
            }
            if (this.geometry && this.material) {
                //this.removeFromParent3();
                this.object = new THREE.Mesh(this.geometry, this.material);
                this.addToParent3();
            }
        }
    },
    lightDomReady: function() {
        // stub out super class version, we don't enter the
        // scene graph until our geometry and material are both ready
    },
    doMaterialChanged: function(event, material) {
        this.material = material;
        this.validate();
        event.stopPropagation();
    }
});
