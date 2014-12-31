// Shim & native-safe ownerDocument lookup
var owner = (document._currentScript || document.currentScript).ownerDocument;

class aboutPageController {
    constructor(aboutPage) {
        this.aboutPage = aboutPage;
        //this.aboutPage.super();
        this.setupComponent();
        this.srcChanged(this.aboutPage.getAttribute('src'));
    }

    setupComponent() {
        // Create a shadow root
        this.shadow = this.aboutPage.createShadowRoot();

        // stamp out our template in the shadow dom
        var template = owner.querySelector("#template").content.cloneNode(true);
        this.shadow.appendChild(template);
        this.changeBackground();
    }

    changeBackground(){
        //this.shadow.querySelector("#juke").style.backgroundImage = "-webkit-linear-gradient(-45deg, #0674ef, #00d3f4)";

    }

    srcChanged(src) {
        if (!src) return;
        console.log("Loading " + src);
    }
}

class aboutPage extends makoPage {

    createdCallback() {
        super();
        this.controller = new aboutPageController(this);
    }

}

document.registerElement('about-page', aboutPage);
