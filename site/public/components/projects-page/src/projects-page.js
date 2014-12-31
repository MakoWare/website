// Shim & native-safe ownerDocument lookup
var owner = (document._currentScript || document.currentScript).ownerDocument;

class projectsPageController {
    constructor(projectsPage) {
        this.projectsPage = projectsPage;
        this.setupComponent();
    }

    setupComponent() {
        // Create a shadow root
        this.shadow = this.projectsPage.createShadowRoot();

        // stamp out our template in the shadow dom
        var template = owner.querySelector("#template").content.cloneNode(true);
        this.shadow.appendChild(template);
        this.changeBackground();
    }

    changeBackground(){
        this.shadow.querySelector("#juke").style.backgroundImage = "-webkit-linear-gradient(-45deg, #0674ef, #00d3f4)";
    }
}

// Register the element in the document
class projectsPage extends makoPage {

    createdCallback() {
        super();
        this.controller = new projectsPageController(this);
    }

}

// Register our todo-item tag with the document
document.registerElement('projects-page', projectsPage);
