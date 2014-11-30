Polymer('three-material', {
    type: "",

    ready: function() {
        this.validate();
        this.watchChildren();
        this.initMaterial();
    },

    validate: function() {

    },

    watchChildren: function() {
        var self = this;
        this.addEventListener('three-material-changed', function(e){


            if($.inArray(e.srcElement, self.children) > -1){
                self.addChild(e.srcElement);
            }
        });
    },


    initMaterial: function(){
        this.type = this.attributes["type"].value;
        var material;
        if(this.type == "MeshFaceMaterial"){
            material = new THREE.MeshFaceMaterial(this.materials);
        } else {
            material = new THREE.MeshBasicMaterial( { color: 0xA0E5E4, overdraw: 0.5 } );
            if(this.color){
                material.color.setHex(this.color);
            }
        }
        this.object = material;

        if(this.parentNode.localName == "three-material"){
            this.parentNode.addChild(this);
        }
    },

    addChild: function(child){
        if(!this.materials){
            this.materials = [];

        }
        if(child.localName == "three-material"){
            this.materials.push(child.object);
            this.object = new THREE.MeshFaceMaterial(this.materials);
            this.fire('three-material-changed');
        }
    }





});