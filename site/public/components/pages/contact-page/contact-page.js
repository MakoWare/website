Polymer('contact-page', {
    ready: function() {
        this.super();

        this.changeBackground();
        this.fadeIn();
        console.log("juke page ready()");
    },

    changeBackground: function(){
        $('body' ).css('background-image', " -webkit-linear-gradient(-45deg, #e87e00, #f3ae09)");
    },

});
