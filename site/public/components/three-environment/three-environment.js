Polymer('three-environment', {
    ready: function() {
        this.renderFunctions = [];
        this.createRenderer();
        this.createCamera();
        this.createScene();
        this.createStats();

        //this.createCube();

        console.log("three-environment: ready()");

        this.render();

    },

    getRenderer: function(event) {
        event.detail.renderer = this.renderer;
        //return this.renderer;
      },

    createRenderer: function(){
        var renderer = new THREE.CanvasRenderer();

//        var renderer = new THREE.WebGLRenderer();
        window.renderer = renderer;
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( 0xf0f0f0 );
        this.shadowRoot.appendChild(renderer.domElement);
    },

    createCamera: function(){
        var camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.y = 150;
	camera.position.z = 500;
        this.camera = camera;
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

    },

    createCube: function(){
        var geometry = new THREE.BoxGeometry( 200, 200, 200 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var cube = new THREE.Mesh( geometry, material );
        cube.hasAnimation = true;

        cube.animate = function(){
            this.rotation.x += 0.01;
        };

	this.addToScene(cube);
    }

});
