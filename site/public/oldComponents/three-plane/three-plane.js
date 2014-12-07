Polymer('three-plane', {
    ready: function() {
        this.super();

        this.object.targetRotation = 0;
	this.targetRotationOnMouseDown = 0;
	this.mouseX = 0;
	this.mouseXOnMouseDown = 0;

	this.windowHalfX = window.innerWidth / 2;
	this.windowHalfY = window.innerHeight / 2;


        this.object.previewAnimation = true;

        $(document).on("mousedown", this.onDocumentMouseDown.bind(this));

        this.initAnimation();


        console.log("three-plane: ready()");
    },

    onDocumentMouseDown: function(event) {
	event.preventDefault();
        this.object.previewAnimation = false;
        console.log("on mouse down");
        $(document).on("mousemove", this.onDocumentMouseMove.bind(this));
        $(document).on("mouseup", this.onDocumentMouseUp.bind(this));
        $(document).on("mouseout", this.onDocumentMouseOut.bind(this));

	this.mouseXOnMouseDown = event.clientX - this.windowHalfX;
	this.targetRotationOnMouseDown = this.object.targetRotation;
    },

    onDocumentMouseMove: function(event) {
        console.log("on mouse move");
	this.mouseX = event.clientX - this.windowHalfX;
	this.object.targetRotation = this.targetRotationOnMouseDown + ( this.mouseX - this.mouseXOnMouseDown ) * 0.02;
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
	if ( event.touches.length === 1 ) {
	    event.preventDefault();

	    this.mouseXOnMouseDown = event.touches[ 0 ].pageX - this.windowHalfX;
	    this.targetRotationOnMouseDown = this.object.targetRotation;
	}
    },

    onDocumentTouchMove: function(event) {
	if ( event.touches.length === 1 ) {
	    event.preventDefault();

	    this.mouseX = event.touches[ 0 ].pageX - this.windowHalfX;
	    this.object.targetRotation = this.targetRotationOnMouseDown + ( this.mouseX - this.mouseXOnMouseDown ) * 0.05;
	}
    },

    initAnimation: function(){
        this.object.hasAnimation = true;
        this.object.animate = function(){
            if(this.previewAnimation){
                this.rotation.y += 0.01;

            } else {
                this.rotation.y += ( this.targetRotation - this.rotation.y ) * 0.05;
            }
        };
    }

});
