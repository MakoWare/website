Polymer('mako-page', {
    ready: function() {

        console.log("page ready()");
    },

    fadeIn: function(){
        var pageContent = this.$.page;

        var opacity = 0;
        var fadeInterval = setInterval(function(){
            if(pageContent.style.opacity < 1){
                opacity += .05;
                pageContent.style.opacity =  opacity;
            } else {
                clearInterval(fadeInterval);
            }
        }, 50);
    },

    backToCube: function(){
        console.log("back to cube");
        document.querySelector('app-router').go("/");

    }


});
