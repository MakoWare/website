Polymer('about-page', {
    ready: function() {
        this.super();

        this.changeBackground();
        this.fadeIn();
        console.log("about page ready()");
    },

    changeBackground: function(){
        $('body' ).css('background-image', " -webkit-linear-gradient(-45deg, #3ad504, #a5f33b)");
    },

});
