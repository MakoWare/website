Polymer('juke-page', {
    ready: function() {
        this.changeBackground();
        this.fadeIn();
        console.log("juke page ready()");
    },

    changeBackground: function(){
        $('body' ).css('background-image', " -webkit-linear-gradient(-45deg, #0674ef, #00d3f4)");

    },

    fadeIn: function(){
        var pageContent = this.$.pageContent;
        console.log(pageContent.style.opacity);

        var opacity = 0;
        var fadeInterval = setInterval(function(){
            if(pageContent.style.opacity < 1){
                opacity += .05;
                pageContent.style.opacity =  opacity;
            } else {
                clearInterval(fadeInterval);
            }
        }, 100);

    }


});
