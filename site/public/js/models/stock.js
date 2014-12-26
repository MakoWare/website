var stockModel = {

    getStockQuote: function(tweet){
        var dfd = new jQuery.Deferred();
        var url = "http://finance.yahoo.com/webservice/v1/symbols/" + tweet.tickerSymbol + "/quote?format=json";

        $.ajax({
            url: url,
            crossDomain: true,
            dataType: 'jsonp',
            success: function(results){
                tweet.stockQuote = results.list.resources[0].resource.fields;
                dfd.resolve(results);
            },
            error: function(results){
                dfd.reject(results);
            },
            timeout: 3000
        });

        return dfd.promise();
    },


    getStockPriceAtDate: function(tweet){
        var dfd = new jQuery.Deferred();
        var date = new Date(tweet.created_at);
        var year = date.getFullYear();
        var day =  date.getDate();
        var month = date.getMonth() + 1;

        if(day.toString().charAt(0) != "0" && day.toString().length < 2){
            day = "0" + day;
        }
        if(month.toString().charAt(0) != "0" && month.toString().length < 2){
            month = "0" + month;
        }

        var url = "http://ichart.finance.yahoo.com/table.csv?format=json&s=" + tweet.tickerSymbol + "&amp;a=" + month + "&amp;b=" + day +"&amp;c=" + year + "&amp;d=" + month + "&amp;e=" + day + "&amp;f=" + year + "&amp;g=d&amp;ignore=.csv";

        $.ajax({
            url: "http://query.yahooapis.com/v1/public/yql?"+
                "q=select%20*%20from%20html%20where%20url%3D%22"+
                encodeURIComponent(url)+
                "%22&format=json",

            crossDomain: true,
            dataType: 'jsonp',
            success: function(results){
                console.log(results);
                if(results.query.results){
                    var date =  year + "-" + month + "-" + day;
                    var priceAtDate = results.query.results.body.p.split(date)[1];
                    if(priceAtDate){
                        tweet.priceAtTweetDate = priceAtDate.split(",")[4];
                    }
                }
                dfd.resolve(results);
            },
            error: function(results){
                dfd.reject(results);
            }
        });
        return dfd.promise();
    }


};
