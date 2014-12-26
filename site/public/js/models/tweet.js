Parse.initialize("4ndssyMiI44k1gpROSh5TPEhSpo0RukRLXo6kBpz", "F8kuVZHiZ7QXw7wOfhigPwouQi50wv6NTkNOYFst");

var tweetModel = {
    tweets: [],

    getTweets: function(){
        var self = this;
        Parse.Cloud.run("getTweets", {}, {
            success: function(results){
                self.tweets = jQuery.parseJSON( results );
                self.parseTweets();
            },
            error: function(error){
                console.log(error);
            }
        });
    },

    parseTweets: function(){
        var marketTweets = [];
        this.tweets.forEach(function(tweet){
            if($.inArray("$", tweet.text) > -1){
                var splits = tweet.text.split("$");
                splits.forEach(function(splitz){

                    //First check if the charAt(0) is a number
                    if(isNaN(splitz.charAt(0))){

                        //Now check if charAt(0) is upper Case
                        if(splitz.charAt(0)  == splitz.charAt(0).toUpperCase() ){

                            //Now check if charAt(1) is upper Case, or a space
                            if(splitz.charAt(1)  == splitz.charAt(1).toUpperCase() ){
                                tweet.tickerSymbol = splitz.split(" ")[0].slice(0, 4);
                            }
                        }
                    }
                });

                if(tweet.tickerSymbol){
                    marketTweets.push(tweet);
                }
            }
        });
        this.tweets = marketTweets;
        this.marketTweets();
    },

    marketTweets: function(){
        var markitTweets = [];
        var promises = [];
        var self = this;
        this.tweets.forEach(function(tweet){
            promises.push(stockModel.getStockQuote(tweet));
            promises.push(stockModel.getStockPriceAtDate(tweet));
        });

        $.when.apply(null, promises).done(function(){
            console.log(self.tweets);
            self.createExchange();
        });
    },


    createExchange: function(){
        console.log("creating Exchange");
        var i = 0;
        this.tweets.forEach(function(tweet){
            var dateSplit = tweet.created_at.split(" ");
            var date = dateSplit[3] + " " + dateSplit[0] + " " + dateSplit[1] + " " +  dateSplit[2] + " " + dateSplit[5];

            //Content
            jQuery('<div/>', {
                id: 'itemContainer' + i,
                class: 'itemContainer'
            }).appendTo('#content');

            //Date Row
            jQuery('<div/>', {
                id: 'dateRow' + i,
                class: 'row'
            }).appendTo('#itemContainer' + i);

            //Date Column
            jQuery('<div/>', {
                id: 'dateColumn' + i,
                class: 'twelve columns'
            }).appendTo('#dateRow' + i);

            jQuery('<h5/>', {
                text: date
            }).appendTo('#dateColumn' + i);

            //ItemContent Row
            jQuery('<div/>', {
                id: 'itemRow' + i,
                class: 'row'
            }).appendTo('#itemContainer' + i);

            //Stock column
            jQuery('<div/>', {
                id: 'stockContent' + i,
                class: 'two-thirds column'
            }).appendTo('#itemRow' + i);

            //Tweet column
            jQuery('<div/>', {
                id: 'tweetContent' + i,
                class: 'one-third column'
            }).appendTo('#itemRow' + i);

            //Tweet Content
            jQuery('<p/>', {
                text: tweet.text
            }).appendTo('#tweetContent' + i);

            //Stock Content - Name and Symbol
            jQuery('<h6/>', {
                text: tweet.stockQuote.name + " " + " (" + tweet.stockQuote.symbol + ")"
            }).appendTo('#stockContent' + i);

            //Stock Info Table
            jQuery('<table/>', {
                id: 'stockTable' + i,
                class: 'u-full-width'
            }).appendTo('#stockContent' + i);

            //Stock Info Table Header
            jQuery('<thead/>', {
                id: 'stockTableHead' + i
            }).appendTo('#stockTable' + i);

            //Stock Info Table Header Row
            jQuery('<tr/>', {
                id: 'stockTableHeadRow' + i
            }).appendTo('#stockTableHead' + i);

            //Stock Info Table Header Column
            jQuery('<td/>', {
                text: 'Current Price'
            }).appendTo('#stockTableHeadRow' + i);

            //Stock Info Table Header Column
            jQuery('<td/>', {
                text: 'Price when Tweet Created'
            }).appendTo('#stockTableHeadRow' + i);

            //Stock Info Table Header Column
            jQuery('<td/>', {
                text: 'Current Volume'
            }).appendTo('#stockTableHeadRow' + i);

            //Stock Info Table Body
            jQuery('<tbody/>', {
                id: 'stockTableBody' + i
            }).appendTo('#stockTable' + i);

            //Stock Info Table Body Row
            jQuery('<tr/>', {
                id: 'stockTableBodyRow' + i
            }).appendTo('#stockTableBody' + i);

            //Stock Info Table Body Column
            jQuery('<td/>', {
                text: tweet.stockQuote.price
            }).appendTo('#stockTableBodyRow' + i);

            //Stock Info Table Body Column
            jQuery('<td/>', {
                text: tweet.priceAtTweetDate
            }).appendTo('#stockTableBodyRow' + i);

            //Stock Info Table Body Column
            jQuery('<td/>', {
                text: tweet.stockQuote.volume
            }).appendTo('#stockTableBodyRow' + i);


            i++;

        });
    }



};


tweetModel.getTweets();
