Polymer('three-cube', {
    ready: function() {
        this.super();

        this.object.targetRotation = 0;
        this.object.targetRotationX = 0;

	this.targetRotationOnMouseDown = 0;
	this.targetRotationOnMouseDownX = 0;

	this.mouseX = 0;
	this.mouseXOnMouseDown = 0;

	this.mouseY = 0;
	this.mouseYOnMouseDown = 0;


	this.windowHalfX = window.innerWidth / 2;
	this.windowHalfY = window.innerHeight / 2;

        this.moved = false;




        this.object.previewAnimation = true;

        $(document).on("mousedown", this.onDocumentMouseDown.bind(this));
        $(document).on("touchstart", this.onDocumentTouchStart.bind(this));
        $(document).on("touchmove", this.onDocumentTouchMove.bind(this));


        this.initAnimation();
        /*
         */

        //$(document).on("mousedown", this.createMeshListener.bind(this));


        console.log("three-cube: ready()");
    },

    selectFace: function(event){
        console.log("select Face");
        var environment = $('#three-environment')[0];
        var camera = environment.camera;
        var raycaster = environment.raycaster;


	event.preventDefault();

	var vector = new THREE.Vector3();
	vector.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
	vector.unproject( camera );

	raycaster.ray.set( camera.position, vector.sub( camera.position ).normalize() );

        var objects = [];
        objects.push(this.object);
	var intersects = raycaster.intersectObjects( objects );

	if ( intersects.length > 0 ) {
            this.centerFace(intersects[0].faceIndex);
	}

    },

    centerFace: function(faceIndex){
        console.log("center Face");
        switch(faceIndex) {
        case 0:
            this.object.targetRotation = - Math.PI / 2;
            this.object.targetRotationX = 0;
            break;
        case 1:
            this.object.targetRotation = - Math.PI / 2;
            this.object.targetRotationX = 0;
            break;
        case 2:
            this.object.targetRotation = Math.PI / 2;
            this.object.targetRotationX = 0;
            break;
        case 3:
            this.object.targetRotation = Math.PI / 2;
            this.object.targetRotationX = 0;
            break;
        case 4:
            this.object.targetRotation = 0;
            this.object.targetRotationX = Math.PI / 2;
            break;
        case 5:
            this.object.targetRotation = 0;
            this.object.targetRotationX = Math.PI / 2;
            break;
        case 6:
            this.object.targetRotation = 0;
            this.object.targetRotationX =  -Math.PI / 2;
            break;
        case 7:
            this.object.targetRotation = 0;
            this.object.targetRotationX = -Math.PI / 2;
            break;
        case 8:
            this.object.targetRotation = 0;
            this.object.targetRotationX = 0;
            break;
        case 9:
            this.object.targetRotation = 0;
            this.object.targetRotationX = 0;
            break;
        case 10:
            this.object.targetRotation = Math.PI;
            this.object.targetRotationX = 0;
            break;
        case 11:
            this.object.targetRotation = Math.PI;
            this.object.targetRotationX = 0;
            break;
        }

        this.fullScreeFace(faceIndex);
    },

    fullScreeFace: function(faceIndex){
        var environment = $('#three-environment')[0];
        var camera = environment.camera;

        var currentX = this.object.geometry.parameters.width;
        var currentY = this.object.geometry.parameters.height;

        var windowX = window.innerWidth;
        var windowY = window.innerHeight;

        var scaleX = windowX / currentX;
        var scaleY = windowY / currentY;
        var windowScale = windowX / windowY;

        console.log("currenX: " + currentX);
        console.log("currentY: " + currentY);

        console.log("windowX: " + windowX);
        console.log("windowY: " + windowY);

        console.log("scaleX: " + scaleX);
        console.log("scaleY: " + scaleY);

        console.log("windowScale: " + windowScale);


        //Needs Real Math
        var cameraVariance = (windowX - windowY) / 7500;
        console.log(cameraVariance);
        windowScale += cameraVariance;

        switch(faceIndex) {
        case 0:
            this.object.scale.z = windowScale;
            break;
        case 1:
            this.object.scale.z = windowScale;
            break;
        case 2:
            this.object.scale.z = windowScale;
            break;
        case 3:
            this.object.scale.z = windowScale;
            break;
        case 4:
            this.object.scale.x = windowScale;
            break;
        case 5:
            this.object.scale.x = windowScale;
            break;
        case 6:
            this.object.scale.x = windowScale;
            break;
        case 7:
            this.object.scale.x = windowScale;
            break;
        case 8:
            this.object.scale.x = windowScale;
            break;
        case 9:
            this.object.scale.x = windowScale;
            break;
        case 10:
            this.object.scale.x = windowScale;
            break;
        case 11:
            this.object.scale.x = windowScale;
            break;
        }



        //Need to stop interval after this
        var windowZoom = setInterval(function(){
            console.log('runnin');
            if(camera.position.z > 250){
                camera.position.z -= 5;
            } else {
                clearInterval(windowZoom);
            }
        }, 10);



    },

    onDocumentMouseDown: function(event) {
	event.preventDefault();
        this.object.previewAnimation = false;
        this.moved = false;
        console.log("on mouse down");
        $(document).on("mousemove", this.onDocumentMouseMove.bind(this));
        $(document).on("mouseup", this.onDocumentMouseUp.bind(this));
        $(document).on("mouseout", this.onDocumentMouseOut.bind(this));

	this.mouseXOnMouseDown = event.clientX - this.windowHalfX;
        this.mouseYOnMouseDown = event.clientY - this.windowHalfY;

	this.targetRotationOnMouseDown = this.object.targetRotation;
	this.targetRotationOnMouseDownX = this.object.targetRotationX;
    },

    onDocumentMouseMove: function(event) {
        console.log("on mouse move");
        this.moved = true;
	this.mouseX = event.clientX - this.windowHalfX;
        this.mouseY = event.clientY - this.windowHalfY;
	this.object.targetRotation = this.targetRotationOnMouseDown + ( this.mouseX - this.mouseXOnMouseDown ) * 0.02;
	this.object.targetRotationX = this.targetRotationOnMouseDownX + ( this.mouseY - this.mouseYOnMouseDown ) * 0.02;

    },

    onDocumentMouseUp: function(event) {
        console.log("on mouse up");
        console.log("moved: " + this.moved);
        $(document).unbind("mousemove");
        $(document).unbind("mouseup");
        $(document).unbind("mouseout");

        if(!this.moved){
            this.selectFace(event);
        }
    },

    onDocumentMouseOut: function(event) {
        console.log("on mouse out");
        $(document).unbind("mousemove");
        $(document).unbind("mouseup");
        $(document).unbind("mouseout");
    },

    onDocumentTouchStart: function(event) {
        this.object.previewAnimation = false;
        console.log("on touch start");

        $(document).on("touchstop", this.onDocumentTouchStop.bind(this));

	if ( event.originalEvent.touches.length === 1 ) {
	    event.preventDefault();

	    this.mouseXOnMouseDown = event.originalEvent.touches[ 0 ].pageX - this.windowHalfX;
	    this.mouseYOnMouseDown = event.originalEvent.touches[ 0 ].pageY - this.windowHalfY;

	    this.targetRotationOnMouseDown = this.object.targetRotation;
	    this.targetRotationOnMouseDownX = this.object.targetRotationX;
        }
    },

    onDocumentTouchStop: function(event){
        console.log("on mouse up");
        console.log("moved: " + this.moved);

        if(!this.moved){
            this.selectFace(event);
        }
    },

    onDocumentTouchMove: function(event) {
        console.log("on touch move");
        this.moved = true;
	if ( event.originalEvent.touches.length === 1 ) {
	    event.preventDefault();

	    this.mouseX = event.originalEvent.touches[ 0 ].pageX - this.windowHalfX;
	    this.mouseY = event.originalEvent.touches[ 0 ].pageY - this.windowHalfY;

	    this.object.targetRotation = this.targetRotationOnMouseDown + ( this.mouseX - this.mouseXOnMouseDown ) * 0.01;
	    this.object.targetRotationX = this.targetRotationOnMouseDownX + ( this.mouseY - this.mouseYOnMouseDown ) * 0.01;
        }
    },

    initAnimation: function(){
        this.object.hasAnimation = true;
        this.object.animate = function(){
            if(this.previewAnimation){
                this.rotation.y += 0.01;
                this.rotation.x += 0.03;

            } else {
                this.rotation.y += ( this.targetRotation - this.rotation.y) * 0.05;
                this.rotation.x += ( this.targetRotationX - this.rotation.x) * 0.05;
            }
        };
    }

});
