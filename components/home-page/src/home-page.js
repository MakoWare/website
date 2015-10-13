// Shim & native-safe ownerDocument lookup
var owner = (document._currentScript || document.currentScript).ownerDocument;

class homePageController {
    constructor(homePage) {
        this.homePage = homePage;
        this.setupComponent();
        console.log("homePage");
    }

    setupComponent() {
        // Create a shadow root
        this.shadow = this.homePage.createShadowRoot();

        // stamp out our template in the shadow dom
        var template = owner.querySelector("#template").content.cloneNode(true);
        this.shadow.appendChild(template);
    }
}

class homePage extends makoPage {
    createdCallback() {
        super();
        this.controller = new homePageController(this);
    }
}

document.registerElement('home-page', homePage);
