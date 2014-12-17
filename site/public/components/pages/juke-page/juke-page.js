Polymer('juke-page', {
    ready: function() {
        this.super();

        this.changeBackground();
        this.fadeIn();

        console.log("juke page ready()");
    },

    changeBackground: function(){
        $('body' ).css('background-image', " -webkit-linear-gradient(-45deg, #0674ef, #00d3f4)");
    },

    goToJuke: function(){
        $('body' ).css('background-image', "none");

        var pageContent = this.$.page;
        var opacity = 1;


        var fadeInterval = setInterval(function(){
            if(opacity > 0){
                opacity -= .05;
                pageContent.style.opacity =  opacity;
            } else {
                clearInterval(fadeInterval);
                window.location.href = "http://juke.parseapp.com";
            }
        }, 50);
    }
});
