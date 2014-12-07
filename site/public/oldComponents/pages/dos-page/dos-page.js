Polymer('dos-page', {
    ready: function() {
        this.super();

        this.changeBackground();
        this.fadeIn();
        console.log("dos page ready()");

    },

    changeBackground: function(){
        $('body' ).css('background-image', " -webkit-linear-gradient(-45deg, #a103d5, #d475f3)");
    },


});
