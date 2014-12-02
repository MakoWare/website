Polymer('three-environment', {
    ready: function() {
        this.renderFunctions = [];
        this.createRenderer();
        this.createCamera();
        this.createRaycaster();
        this.createScene();
        this.createStats();
        this.resizeHandler();

        console.log("three-environment: ready()");

        this.render();
    },

    resizeHandler: function() {
        var self = this;
        function onWindowResize(){
	    var windowHalfX = window.innerWidth / 2;
	    var windowHalfY = window.innerHeight / 2;

	    self.camera.aspect = window.innerWidth / window.innerHeight;
	    self.camera.updateProjectionMatrix();
	    this.renderer.setSize( window.innerWidth, window.innerHeight );
        };
        window.addEventListener( 'resize', onWindowResize, false );
    },

    getRenderer: function(event) {
        event.detail.renderer = this.renderer;
        //return this.renderer;
      },

    createRenderer: function(){
        //var renderer = new THREE.WebGLRenderer();
        var renderer = new THREE.CanvasRenderer();

        window.renderer = renderer;
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( 0xf0f0f0 );
        this.shadowRoot.appendChild(renderer.domElement);
    },

    createCamera: function(){
        var camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.y = 50;
	camera.position.z = 470;
        this.camera = camera;
    },

    createRaycaster: function(){
        this.raycaster = new THREE.Raycaster();
    },

    createScene: function(){
        var scene = new THREE.Scene();
        this.scene = scene;

    },

    createStats: function(){
        var stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
        this.stats = stats;
        this.shadowRoot.appendChild(stats.domElement);
    },

    addChild: function(child){
        this.scene.add(child.object);
    },

    render: function(){
        var camera = this.camera;
        var scene = this.scene;
        var stats = this.stats;

        window.animate = function(){
	    requestAnimationFrame( window.animate );
            window.renderer.render( scene, camera );

            scene.children.forEach(function(child){
                if(child.hasAnimation){
                    child.animate();
                }
            });

            stats.update();
        };
        window.animate();
    }

});
