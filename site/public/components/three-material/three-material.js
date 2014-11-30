Polymer('three-material', {
    type: "",

    ready: function() {
        this.materials = [];
        this.watchChildren();
        this.initMaterial();
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
        }
        this.object = material;
        this.attributes["ready"] = true;
        //console.log("three-material: init");
        //console.log(this.object);
        this.fire('three-material-changed');
    },

    addChild: function(child){
        if(child.localName == "three-material"){
            this.materials.push(child.object);
            this.object = new THREE.MeshFaceMaterial(this.materials);
        }
    }





});
