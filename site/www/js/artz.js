var artz = function(){
    var rando1 = Math.floor((Math.random()*10)+1),
        rando2 = Math.floor((Math.random()*10)+1),
        colors = [colorbrewer.YlOrBr[rando1 - 1], colorbrewer.YlOrRd[rando2 - 1], colorbrewer.YlGn[rando1 - 1], colorbrewer.YlGnBu[rando2 - 1], colorbrewer.BuPu[rando1 - 1], colorbrewer.GnBu[rando2 - 1], colorbrewer.PuBuGn[rando1 - 1], colorbrewer.OrRd[rando2 - 1], colorbrewer.PuRd[rando1 - 1]];
    var cellsize = (($(window).width() + $(window).height()) / (rando2 * rando1)) + 50,
        cellpadding = rando2 * rando1;

    var pattern = new Trianglify(
        {
            x_gradient: colors[rando1 - 1],
            y_gradient: colors[rando2 - 1],
            noiseIntensity: 0.0,
            cellpadding: cellpadding,
            cellsize: cellsize
        }).generate($(window).width(), $(window).height());
    document.body.setAttribute('style', 'background-image: ' + 'url(images/noise.png)' + ', ' + pattern.dataUrl);
};


window.onload = artz;

window.onresize = artz;
