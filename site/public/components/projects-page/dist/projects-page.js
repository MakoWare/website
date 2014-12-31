"use strict";
var owner = (document._currentScript || document.currentScript).ownerDocument;
var projectsPageController = function projectsPageController(projectsPage) {
  this.projectsPage = projectsPage;
  this.setupComponent();
};
($traceurRuntime.createClass)(projectsPageController, {
  setupComponent: function() {
    this.shadow = this.projectsPage.createShadowRoot();
    var template = owner.querySelector("#template").content.cloneNode(true);
    this.shadow.appendChild(template);
    this.changeBackground();
  },
  changeBackground: function() {
    this.shadow.querySelector("#juke").style.backgroundImage = "-webkit-linear-gradient(-45deg, #0674ef, #00d3f4)";
  }
}, {});
var projectsPage = function projectsPage() {
  $traceurRuntime.superConstructor($projectsPage).apply(this, arguments);
};
var $projectsPage = projectsPage;
($traceurRuntime.createClass)(projectsPage, {createdCallback: function() {
    $traceurRuntime.superConstructor($projectsPage).call(this);
    this.controller = new projectsPageController(this);
  }}, {}, makoPage);
document.registerElement('projects-page', projectsPage);
//# sourceURL=projects-page.js