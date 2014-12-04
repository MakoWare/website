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
        //this.object.previewAnimation = true;
        this.object.currentAnimation = "preview";

        $(document).on("mousedown", this.onDocumentMouseDown.bind(this));
        $(document).on("touchstart", this.onDocumentTouchStart.bind(this));
        $(document).on("touchmove", this.onDocumentTouchMove.bind(this));


        this.initAnimation();
        console.log("three-cube: ready()");
    },

    selectFace: function(event){
	event.preventDefault();
        console.log("select Face");
        console.log(event);

        var environment = $('#three-environment')[0];
        if(!environment){
            environment = this.parentNode;
        }

        var camera = environment.camera;
        var raycaster = environment.raycaster;
	var vector = new THREE.Vector3();

        if(event.type == "touchend"){
            vector.set( ( event.originalEvent.changedTouches[0].clientX / window.innerWidth ) * 2 - 1, - ( event.originalEvent.changedTouches[0].clientY / window.innerHeight ) * 2 + 1, 0.5 );
        } else {
	    vector.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );

        }

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
        this.object.currentAnimation = "zoom";

        console.log("center Face");
        switch(faceIndex) {
        case 0:
            this.object.targetRotation = - Math.PI / 2;
            this.object.targetRotationX = 0;
            this.object.targetRotationNegative = true;
            break;
        case 1:
            this.object.targetRotation = - Math.PI / 2;
            this.object.targetRotationX = 0;
            this.object.targetRotationNegative = true;
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
            this.object.targetRotationNegative = true;
            break;
        case 7:
            this.object.targetRotation = 0;
            this.object.targetRotationX = -Math.PI / 2;
            this.object.targetRotationNegative = true;
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
        this.object.currentAnimation = "transition";
        var self = this;
        this.fullScreen = true;
        var environment = $('#three-environment')[0];
        if(!environment){
            environment = this.parentNode;
        }
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

        this.object.pageURL = "";

        switch(faceIndex) {
        case 0:
            this.object.scale.z = windowScale;
            this.object.pageURL = "/juke";
            break;
        case 1:
            this.object.scale.z = windowScale;
            this.object.pageURL = "/juke";
            break;
        case 2:
            this.object.scale.z = windowScale;
            this.object.pageURL = "/juke";
            break;
        case 3:
            this.object.scale.z = windowScale;
            this.object.pageURL = "/juke";
            break;
        case 4:
            this.object.scale.x = windowScale;
            this.object.pageURL = "/juke";
            break;
        case 5:
            this.object.scale.x = windowScale;
            this.object.pageURL = "/juke";
            break;
        case 6:
            this.object.scale.x = windowScale;
            this.object.pageURL = "/juke";
            break;
        case 7:
            this.object.scale.x = windowScale;
            this.object.pageURL = "/juke";
            break;
        case 8:
            this.object.scale.x = windowScale;
            this.object.pageURL = "/juke";
            break;
        case 9:
            this.object.scale.x = windowScale;
            this.object.pageURL = "/juke";
            break;
        case 10:
            this.object.scale.x = windowScale;
            this.object.pageURL = "/juke";
            break;
        case 11:
            this.object.scale.x = windowScale;
            this.object.pageURL = "/juke";
            break;
        }

        var windowZoom = setInterval(function(){
            console.log('runnin');
            if(camera.position.z > 240){
                camera.position.z -= 5;
            } else {
                clearInterval(windowZoom);
            }
        }, 10);
    },

    transitionPage: function(){
        this.currentAnimation = "none";
        console.log(this.pageURL);
        document.querySelector('app-router').go(this.pageURL);

    },

    backToCube: function(){
        var self = this;
        this.fullScreen = true;

        var environment = $('#three-environment')[0];
        if(!environment){
            environment = this.parentNode;
        }
        var camera = environment.camera;

        this.object.scale.x = 1;
        this.object.scale.y = 1;
        this.object.scale.z = 1;

        var windowZoom = setInterval(function(){
            console.log('runnin');
            if(camera.position.z > 240){
                camera.position.z -= 5;
            } else {
                clearInterval(windowZoom);
            }
        }, 10);
    },

    onDocumentMouseDown: function(event) {
	event.preventDefault();
        this.object.currentAnimation = "controlled";
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
        this.moved = false;
        $(document).on("touchend", this.onDocumentTouchEnd.bind(this));

        console.log("on touch start");
	if ( event.originalEvent.touches.length === 1 ) {
	    event.preventDefault();

	    this.mouseXOnMouseDown = event.originalEvent.touches[ 0 ].pageX - this.windowHalfX;
	    this.mouseYOnMouseDown = event.originalEvent.touches[ 0 ].pageY - this.windowHalfY;

	    this.targetRotationOnMouseDown = this.object.targetRotation;
	    this.targetRotationOnMouseDownX = this.object.targetRotationX;
        }
    },

    onDocumentTouchEnd: function(event){
        console.log("Touch End");

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
        this.object.animations = [];
        this.object.animations.push(this.previewAnimation.bind(this.object));
        this.object.animations.push(this.controlledAnimation.bind(this.object));
        this.object.animations.push(this.transitionPage.bind(this.object));
        this.object.animate = function(){
            switch(this.currentAnimation){
            case "none":

                break;
            case "preview":

                this.animations[0]();
                break;
            case "controlled":

                this.animations[1]();
                break;
            case "zoom":


                break;
            case "transition":

                if(!this.targetRotationNegative){
                    if(this.targetRotation >=  (this.rotation.y - .01) && this.targetRotationX >= (this.rotation.x - .01)){
                        this.animations[2]();
                    }
                } else {
                    if(this.targetRotation >= (this.rotation.y  - .01) && this.targetRotationX >= (this.rotation.x - .01)){
                        this.animations[2]();
                    }
                }
                this.animations[1]();
                break;
            }
        };
    },


    previewAnimation: function(){
        this.rotation.y += 0.008;
        this.rotation.x += 0.01;
    },

    controlledAnimation: function(){
        this.rotation.y += ( this.targetRotation - this.rotation.y) * 0.05;
        this.rotation.x += ( this.targetRotationX - this.rotation.x) * 0.05;
    }

});
