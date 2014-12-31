// Shim & native-safe ownerDocument lookup
var owner = (document._currentScript || document.currentScript).ownerDocument;

class contactPageController {
    constructor(contactPage) {
        this.contactPage = contactPage;
        this.setupComponent();
        this.srcChanged(this.contactPage.getAttribute('src'));
    }

    setupComponent() {
        // Create a shadow root
        this.shadow = this.contactPage.createShadowRoot();

        // stamp out our template in the shadow dom
        var template = owner.querySelector("#template").content.cloneNode(true);
        this.shadow.appendChild(template);
    }

    srcChanged(src) {
        if (!src) return;
        console.log("Loading " + src);
    }
}

class contactPage extends makoPage {
    createdCallback() {
        super();
        this.controller = new contactPageController(this);
    }
}

document.registerElement('contact-page', contactPage);
