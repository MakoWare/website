Polymer('three-environment', {
    ready: function() {
        this.createRenderer();
        this.createCamera();
        this.createScene();
        this.createStats();

        this.createCube();


        console.log("three-environment: ready()");

        //this.animate();
        //this.render();

        var render = function () {
	    requestAnimationFrame( this.render );



	    this.renderer.render(this.scene, this.camera);
	};
        render();

    },

    getRenderer: function(event) {
        event.detail.renderer = this.renderer;
        //return this.renderer;
      },

    createRenderer: function(){
//        var renderer = new THREE.CanvasRenderer();
        var renderer = new THREE.WebGLRenderer();
        this.renderer = renderer;
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

    addToScene: function(object){
        this.scene.add(object);
    },

    render: function(){
        this.renderer.render( this.scene, this.camera );
    },

    animate: function(){
        console.log(this);
        console.log(this.animate);
	requestAnimationFrame( this.animate );

	this.render();
	this.stats.update();
    },

    createCube: function(){
        var geometry = new THREE.Geometry( 200, 200, 200 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var cube = new THREE.Mesh( geometry, material );

	this.addToScene(cube);
    }

});
