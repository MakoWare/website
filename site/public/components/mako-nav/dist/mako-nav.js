"use strict";
var owner = (document._currentScript || document.currentScript).ownerDocument;
var makoNavController = function makoNavController(makoNav) {
  this.makoNav = makoNav;
  this.setupComponent();
  console.log("makoNav");
};
($traceurRuntime.createClass)(makoNavController, {
  setupComponent: function() {
    this.shadow = this.makoNav.createShadowRoot();
    var template = owner.querySelector("#template").content.cloneNode(true);
    this.shadow.appendChild(template);
    $(this.makoNav.shadowRoot.querySelector("#burger")).on("click", this.onBurgerClicked.bind(this));
    $(this.makoNav.shadowRoot.querySelector("#d1")).click(this.onLinkClicked.bind(this));
    $(this.makoNav.shadowRoot.querySelector("#d2")).click(this.onLinkClicked.bind(this));
    $(this.makoNav.shadowRoot.querySelector("#d3")).click(this.onLinkClicked.bind(this));
    this.mobileNav = false;
  },
  srcChanged: function(src) {
    if (!src)
      return;
    console.log("Loading " + src);
  },
  onBurgerClicked: function() {
    var mobileNav = this.makoNav.shadowRoot.querySelector("#mobileNav");
    if (this.mobileNav) {
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
  },
  onLinkClicked: function() {
    var mobileNav = this.makoNav.shadowRoot.querySelector("#mobileNav");
    $(mobileNav).hide();
    this.mobileNav = false;
  }
}, {});
var makoNav = function makoNav() {
  $traceurRuntime.superConstructor($makoNav).apply(this, arguments);
};
var $makoNav = makoNav;
($traceurRuntime.createClass)(makoNav, {createdCallback: function() {
    this.controller = new makoNavController(this);
  }}, {}, HTMLElement);
document.registerElement('mako-nav', makoNav);
//# sourceURL=mako-nav.js