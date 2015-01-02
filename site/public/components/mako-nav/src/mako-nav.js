// Shim & native-safe ownerDocument lookup
var owner = (document._currentScript || document.currentScript).ownerDocument;

class makoNavController {
    constructor(makoNav) {
        this.makoNav = makoNav;
        this.setupComponent();
        console.log("makoNav");
    }

    setupComponent() {
        // Create a shadow root
        this.shadow = this.makoNav.createShadowRoot();

        // stamp out our template in the shadow dom
        var template = owner.querySelector("#template").content.cloneNode(true);
        this.shadow.appendChild(template);
    }

    srcChanged(src) {
        if (!src) return;
        console.log("Loading " + src);
    }
}

class makoNav extends HTMLElement {
    createdCallback (){
        this.controller = new makoNavController(this);
    }
}

document.registerElement('mako-nav', makoNav);
