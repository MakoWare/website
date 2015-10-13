"use strict";
var owner = (document._currentScript || document.currentScript).ownerDocument;
var contactPageController = function contactPageController(contactPage) {
  this.contactPage = contactPage;
  this.setupComponent();
  console.log("contactPage");
};
($traceurRuntime.createClass)(contactPageController, {setupComponent: function() {
    this.shadow = this.contactPage.createShadowRoot();
    var template = owner.querySelector("#template").content.cloneNode(true);
    this.shadow.appendChild(template);
  }}, {});
var contactPage = function contactPage() {
  $traceurRuntime.superConstructor($contactPage).apply(this, arguments);
};
var $contactPage = contactPage;
($traceurRuntime.createClass)(contactPage, {createdCallback: function() {
    $traceurRuntime.superConstructor($contactPage).call(this);
    this.controller = new contactPageController(this);
  }}, {}, makoPage);
document.registerElement('contact-page', contactPage);
//# sourceURL=contact-page.js