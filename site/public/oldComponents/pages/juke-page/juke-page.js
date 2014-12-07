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


});
