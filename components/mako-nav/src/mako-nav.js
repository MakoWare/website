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
        $(this.makoNav.shadowRoot.querySelector("#burger")).on("click", this.onBurgerClicked.bind(this));
        $(this.makoNav.shadowRoot.querySelector("#d1")).click(this.onLinkClicked.bind(this));
        $(this.makoNav.shadowRoot.querySelector("#d2")).click(this.onLinkClicked.bind(this));
        $(this.makoNav.shadowRoot.querySelector("#d3")).click(this.onLinkClicked.bind(this));

        this.mobileNav = false;
    }

    srcChanged(src) {
        if (!src) return;
        console.log("Loading " + src);
    }

    onBurgerClicked() {
        var mobileNav = this.makoNav.shadowRoot.querySelector("#mobileNav");

        if(this.mobileNav){
            $(mobileNav).hide();
            this.mobileNav = false;
        } else {

            var windowHeight = $(window).height();
            var windowWidth = $(window).width();
            $(mobileNav).height(windowHeight);
            $(mobileNav).width(windowWidth);
            $(mobileNav).slideToggle("slow");
            this.mobileNav = true;
        }
    }

    onLinkClicked(){
        var mobileNav = this.makoNav.shadowRoot.querySelector("#mobileNav");
        $(mobileNav).hide();

        this.mobileNav = false;
    }

}

class makoNav extends HTMLElement {
    createdCallback (){
        this.controller = new makoNavController(this);
    }
}

document.registerElement('mako-nav', makoNav);
