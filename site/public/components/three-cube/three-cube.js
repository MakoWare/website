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

        this.object.previewAnimation = true;

        $(document).on("mousedown", this.onDocumentMouseDown.bind(this));
        $(document).on("touchstart", this.onDocumentTouchStart.bind(this));
        $(document).on("touchmove", this.onDocumentTouchMove.bind(this));

        this.initAnimation();
        console.log("three-cube: ready()");
    },

    onDocumentMouseDown: function(event) {
	event.preventDefault();
        this.object.previewAnimation = false;
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
	this.mouseX = event.clientX - this.windowHalfX;
        this.mouseY = event.clientY - this.windowHalfY;
	this.object.targetRotation = this.targetRotationOnMouseDown + ( this.mouseX - this.mouseXOnMouseDown ) * 0.02;
	this.object.targetRotationX = this.targetRotationOnMouseDownX + ( this.mouseY - this.mouseYOnMouseDown ) * 0.02;

    },

    onDocumentMouseUp: function(event) {
        console.log("on mouse up");
        $(document).unbind("mousemove");
        $(document).unbind("mouseup");
        $(document).unbind("mouseout");
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
        console.log(event);
	if ( event.originalEvent.touches.length === 1 ) {
	    event.preventDefault();

	    this.mouseXOnMouseDown = event.originalEvent.touches[ 0 ].pageX - this.windowHalfX;
	    this.mouseYOnMouseDown = event.originalEvent.touches[ 0 ].pageY - this.windowHalfY;

	    this.targetRotationOnMouseDown = this.object.targetRotation;
	    this.targetRotationOnMouseDownX = this.object.targetRotationX;
        }
    },

    onDocumentTouchMove: function(event) {
        console.log("on touch move");
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
