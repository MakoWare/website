Polymer('three-mesh', {
    ready: function() {
        this.validate();
        this.observeDOM();
        console.log("three-mesh: ready()");
    },
    observeDOM: function() {
        this.onMutation(this, function() {
            console.log("Mesh mutated");
            this.validate();
            this.observeDOM();
        });
    },
    validate: function() {
        console.log("three-mesh: validate()");
        if (!this.geometry) {
            var g = this.querySelector('three-geometry');
            this.geometry = g ? g.object : null;
        }
        if (this.geometry && this.material) {
            this.object = new THREE.Mesh(this.geometry, this.material);

            this.parentNode.addChild(this);
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
    },

    addChild: function(child){
        console.log("three-mesh: addChild()");

        if(child.object){
            if(child.localName == 'three-geometry'){
                this.geometry = child.object;
            } else if (child.localName == 'three-material'){
                this.material = child.object;
            }
            this.validate();
        }
    }
});
