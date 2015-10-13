// Shim & native-safe ownerDocument lookup
var owner = (document._currentScript || document.currentScript).ownerDocument;

class contactPageController {
    constructor(contactPage) {
        this.contactPage = contactPage;
        this.setupComponent();
        console.log("contactPage");
    }

    setupComponent() {
        // Create a shadow root
        this.shadow = this.contactPage.createShadowRoot();

        // stamp out our template in the shadow dom
        var template = owner.querySelector("#template").content.cloneNode(true);
        this.shadow.appendChild(template);
    }
}

class contactPage extends makoPage {
    createdCallback() {
        super();
        this.controller = new contactPageController(this);
    }
}

document.registerElement('contact-page', contactPage);
