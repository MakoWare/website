import Nothing from './nothing.js';

// Shim & native-safe ownerDocument lookup
var owner = (document._currentScript || document.currentScript).ownerDocument;

class XGifController {
    constructor(xgif) {
        console.log("constructor");
        this.xgif = xgif;
        this.setupComponent();
    }

    setupComponent() {
        // Create a shadow root
        this.shadow = this.xgif.createShadowRoot();

        // stamp out our template in the shadow dom
        var template = owner.querySelector("#template").content.cloneNode(true);
        this.shadow.appendChild(template);
    }

    attrChanged(attr) {
        if (this.attr) this.attri = speed;
    }
}

// Register the element in the document
class XGif extends HTMLElement {
    createdCallback() {
        console.log("created loco ");
        this.controller = new XGifController(this);
    }

    attributeChangedCallback(attribute, oldVal, newVal) {
        //if (attribute == "src") {
        //this.controller.srcChanged(newVal)
    //}
    }
}

// Register our todo-item tag with the document
document.registerElement('x-gif', XGif);
