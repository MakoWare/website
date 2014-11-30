Polymer('three-mesh', {
    ready: function() {
        this.x = this.attributes["x"].value;
        this.y = this.attributes["y"].value;
        this.z = this.attributes["z"].value;
        this.hasAnimation = this.attributes["animate"].value;

        this.validate();
        this.watchChildren();

        console.log("three-mesh: ready()");
    },


    watchChildren: function() {
        var self = this;
        this.addEventListener('three-geometry-changed', function(e){
            if($.inArray(e.srcElement, self.children) > -1){
                self.validate();
            }
        });

        this.addEventListener('three-material-changed', function(e){
            if($.inArray(e.srcElement, self.children) > -1){
                self.validate();
            }
        });
    },
    validate: function() {
        var g = this.querySelector('three-geometry');
        this.geometry = g ? g.object : null;

        var m = this.querySelector('three-material');
        this.material = m ? m.object : null;

        if (this.geometry && this.material) {
            this.object = new THREE.Mesh(this.geometry, this.material);
            this.initAnimation();
            this.updatePosition();
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

    initAnimation: function(){
        if(this.hasAnimation == "true"){
            if(this.animation){
                console.log(this.animation);
                this.object.animate = this.animation;
            } else {
                this.object.hasAnimation = true;
                this.object.animate = function(){
                    this.rotation.y += 0.01;
                    //this.rotation.x += 0.01;
                };
            }
        }

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
