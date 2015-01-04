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
  },
  srcChanged: function(src) {
    if (!src)
      return;
    console.log("Loading " + src);
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