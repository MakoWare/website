Polymer('three-material', {
    kinds: {
        basic: 'MeshBasicMaterial',
        lambert: 'MeshLambertMaterial',
        phong: 'MeshPhongMaterial',
        texture: 'texture'
    },
    sides: {
        front: 'FrontSide',
        back: 'BackSide',
        double: 'DoubleSide'
    },
    shadings: {
        flat: 'FlatShading'
    },
    color: 0x1EC876,
    texture: '',
    enteredView: function() {
        this.async(function() {
            //console.log('[%s]: lightDomReady', this.localName);
            this.lightDomReady();
        });
    },
    lightDomReady: function() {
        this.init();
        //this.super();
    },
    init: function() {
        var kind = this.kinds[this.kind] || this.kinds.lambert;
        var side = this.sides[this.side] || this.sides.front;
        var shading = this.shadings[this.shading] || this.shadings.flat;
        switch (kind) {
        case 'texture':
            var texture = THREE.ImageUtils.loadTexture(this.texture);
            var renderer = this.fire('three-js-get-renderer').detail.renderer;
            if (renderer) {
                texture.anisotropy = renderer.getMaxAnisotropy();
            } else {
                console.log('no renderer');
            }
            this.object = new THREE.MeshBasicMaterial({map: texture, side: THREE[side]});
            break;
        default:
            this.object = new (THREE[kind])({
                color: this.color,
                side: THREE[side],
                specular: this.specular,
                shininess: this.shine,
                ambient: this.ambient,
                shading: THREE[shading]
            });
            break;
        }
    },
    objectChanged: function() {
        this.fire('three-js-material-changed', this.object);
    }
});
