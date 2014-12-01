Polymer('three-mesh', {
    ready: function() {
        this.x = this.attributes["x"].value;
        this.y = this.attributes["y"].value;
        this.z = this.attributes["z"].value;
        this.hasAnimation = this.attributes["animate"].value;

        this.validate();
        console.log("three-mesh: ready()");
    },


    validate: function() {
        if(!this.geometry){
            //Regular DOM
            var g = this.querySelector('three-geometry');
            this.geometry = g ? g.object : null;

            //Shadow DOM
            if(this.$ && this.$.geometryContainer){
                var g = this.$.geometryContainer.querySelector('#geometry');
                this.geometry = g ? g.object : null;
            }
        }

        if(!this.material){
            var m = this.querySelector('three-material');
            this.material = m ? m.object : null;


            //Shadow Dom
            if(this.$ && this.$.geometryContainer){
                var m = this.$.materialContainer.querySelector('#material');
                this.material = m ? m.object : null;
            }
        }

        if (this.geometry && this.material) {
            this.object = new THREE.Mesh(this.geometry, this.material);

            this.updatePosition();
            this.parentNode.addChild(this);
        }
    },

    onMaterialChanged: function(event, material) {
        //Check if it is a direct child
        if($.inArray(event.srcElement, this.children) > -1){
            this.material = material;
            this.validate();
        }
        event.stopPropagation();
    },

    onGeometryChanged: function(event, geometry) {
        if($.inArray(event.srcElement, this.children) > -1){
            this.geometry = geometry;
            this.validate();
        }
        event.stopPropagation();
    },

    addChild: function(child){
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
