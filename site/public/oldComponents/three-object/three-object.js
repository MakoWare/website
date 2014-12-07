Polymer('three-object', {
    x: 0,
    y: 0,
    z: 0,
    rx: 0,
    ry: 0,
    rz: 0,
    castShadow: false,
    receiveShadow: false,
    tracking: false,
    hasAnimation: false,

    observe: {
        x: 'updatePosition',
        y: 'updatePosition',
        z: 'updatePosition'
    },

    setPosition: function(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    },

    objectChanged: function() {
        this.updatePosition();
    },

    updatePosition: function() {
        if (this.object) {
            this.object.position.set(Number(this.x), Number(this.y), Number(this.z));
            this.object.rotation.set(this.rx * Math.PI/180, this.ry * Math.PI/180, this.rz * Math.PI/180);
            this.object.castShadow = this.castShadow;
            this.object.receiveShadow = this.receiveShadow;
        }
    },

    addToParent3: function() {
        if (this.parentNode.add3 && !this.objectParent) {
            this.objectParent = this.parentNode;
            this.parentNode.add3(this);
        }
    },

    removeFromParent3: function() {
        if (this.objectParent) {
            this.objectParent.remove3(this);
            this.objectParent = null;
        }
    },

    enteredView: function() {
        /*
         var l = '';
         var p = this.parentNode;
         while (p) {
         l += ':' + p.localName;
         p = p.parentNode || p.host;
         }
         console.log('[%s]: enteredView: parent chain: [%s]', this.localName + (this.id ? '#' + this.id : ''), l);
         */
        this.async(function() {
            //console.log('[%s]: lightDomReady', this.localName);
            this.lightDomReady();
        });
    },
    lightDomReady: function() {
        this.addToParent3();
    },
    leftView: function() {
        this.removeFromParent3();
    }
});
