Polymer('three-material', {

    ready: function() {
        this.watchChildren();
        this.createMaterial();
    },

    watchChildren: function() {
        var self = this;
        this.addEventListener('three-material-changed', function(e){
            if($.inArray(e.srcElement, self.children) > -1){
                self.addChild(e.srcElement);
            }
        });
    },

    createMaterial: function(){
        var material;
        if(this.type == "MeshFaceMaterial"){
            material = new THREE.MeshFaceMaterial(this.materials);
        } else if(this.type == "MeshLambertMaterial") {
            var texture = THREE.ImageUtils.loadTexture( this.img );
            material = new THREE.MeshLambertMaterial({
                map: texture,
                overdraw: true
            });
            material.path = this.path;
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

        this.objectChanged();
    },

    objectChanged: function(){
        this.fire('material-changed', this.object);
    },

    addChild: function(child){
        if(!this.materials){
            this.materials = [];
        }
        if(child.localName == "three-material"){
            this.materials.push(child.object);
            this.object = new THREE.MeshFaceMaterial(this.materials);
            this.objectChanged();
        }
    },






});
