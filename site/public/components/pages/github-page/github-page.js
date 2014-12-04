Polymer('github-page', {
    ready: function() {
        this.super();

        this.changeBackground();
        this.fadeIn();
        console.log("github page ready()");

    },

    changeBackground: function(){
        $('body' ).css('background-image', " -webkit-linear-gradient(-45deg, #e7ea03, #f3ef71)");
    },


});
