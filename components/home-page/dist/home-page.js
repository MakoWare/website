"use strict";
var owner = (document._currentScript || document.currentScript).ownerDocument;
var homePageController = function homePageController(homePage) {
  this.homePage = homePage;
  this.setupComponent();
  console.log("homePage");
};
($traceurRuntime.createClass)(homePageController, {setupComponent: function() {
    this.shadow = this.homePage.createShadowRoot();
    var template = owner.querySelector("#template").content.cloneNode(true);
    this.shadow.appendChild(template);
  }}, {});
var homePage = function homePage() {
  $traceurRuntime.superConstructor($homePage).apply(this, arguments);
};
var $homePage = homePage;
($traceurRuntime.createClass)(homePage, {createdCallback: function() {
    $traceurRuntime.superConstructor($homePage).call(this);
    this.controller = new homePageController(this);
  }}, {}, makoPage);
document.registerElement('home-page', homePage);
//# sourceURL=home-page.js