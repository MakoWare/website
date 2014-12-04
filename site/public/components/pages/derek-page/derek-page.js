Polymer('derek-page', {
    ready: function() {
        this.super();

        this.changeBackground();
        this.fadeIn();
        console.log("derek page ready()");

    },

    changeBackground: function(){
        $('body' ).css('background-image', " -webkit-linear-gradient(-45deg, #e83700, #f36008)");

    },


});
