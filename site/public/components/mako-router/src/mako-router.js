// Shim & native-safe ownerDocument lookup
var owner = (document._currentScript || document.currentScript).ownerDocument;

class makoRouterController {
    constructor(makoRouter) {
        this.makoRouter = makoRouter;
        this.setupComponent();
        console.log("makoRouter");
    }

    setupComponent() {
        var self = this;

        this.container = document.createElement("div");
        this.makoRouter.appendChild(this.container);


        $(window).on('hashchange', function(){
                console.log("hashchange");
                self.loadComponents();
            });

        this.loadComponents();


    }


    //Load Components
    loadComponents(){
        var path = window.location.hash.slice(1);
        if(path == ""){
            path = "/";
        }

        //Find the route that matches this path
        var match = false;
        var ultRoute = "";
        var childNodes = this.makoRouter.childNodes;
        for(var i = 0; i < childNodes.length; i++){
            var child = childNodes[i];
            if(child.localName == "mako-route"){
                if(child.attributes.path.nodeValue == path){
                    match = true;
                    this.changeComponents(child.attributes.import.nodeValue);
                } else if(child.attributes.path.nodeValue == "*"){
                    ultRoute = child.attributes.import.nodeValue;
                }
            }
        }

        if(!match && ultRoute != ""){
            this.changeComponents(ultRoute);
        }
    }


    //Change Components
    changeComponents(path){
        var self = this;
        var componentName = path.split("/")[path.split("/").length - 1].split(".")[0];
        //console.log(componentName);

        //Remove all components in container
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }

        //Import Components
        function importLoadedCallback() {
            var customElement = document.createElement(componentName);
            self.container.appendChild(customElement);
        };

        this.importComponent(path, importLoadedCallback);
    }

    //Import Component
    importComponent(path, callback){
        var importLink = document.createElement('link');
        importLink.setAttribute('rel', 'import');
        importLink.setAttribute('href', path);
        importLink.addEventListener('load', callback);
        document.head.appendChild(importLink);

    }



}

class makoRouter extends HTMLElement {
    createdCallback (){
        this.controller = new makoRouterController(this);
    }
}

document.registerElement('mako-router', makoRouter);



//MakoRoute
class makoRoute extends HTMLElement {
    createdCallback (){
        //console.log("route");
        //console.log(this.attributes);
    }
}

document.registerElement('mako-route', makoRoute);
