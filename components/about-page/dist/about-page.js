"use strict";
var owner = (document._currentScript || document.currentScript).ownerDocument;
var aboutPageController = function aboutPageController(aboutPage) {
  this.aboutPage = aboutPage;
  this.setupComponent();
  this.srcChanged(this.aboutPage.getAttribute('src'));
  console.log("aboutPage");
};
($traceurRuntime.createClass)(aboutPageController, {
  setupComponent: function() {
    this.shadow = this.aboutPage.createShadowRoot();
    var template = owner.querySelector("#template").content.cloneNode(true);
    this.shadow.appendChild(template);
    this.changeBackground();
  },
  changeBackground: function() {},
  srcChanged: function(src) {
    if (!src)
      return;
    console.log("Loading " + src);
  }
}, {});
var aboutPage = function aboutPage() {
  $traceurRuntime.superConstructor($aboutPage).apply(this, arguments);
};
var $aboutPage = aboutPage;
($traceurRuntime.createClass)(aboutPage, {createdCallback: function() {
    $traceurRuntime.superConstructor($aboutPage).call(this);
    this.controller = new aboutPageController(this);
  }}, {}, makoPage);
document.registerElement('about-page', aboutPage);
//# sourceURL=about-page.js