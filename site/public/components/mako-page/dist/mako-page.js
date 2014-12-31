"use strict";
var owner = (document._currentScript || document.currentScript).ownerDocument;
var makoPageController = function makoPageController(makoPage) {
  this.makoPage = makoPage;
  this.srcChanged(this.makoPage.getAttribute('src'));
  this.setupComponent();
  console.log("makoPage");
};
($traceurRuntime.createClass)(makoPageController, {
  setupComponent: function() {
    this.setCurrentLink();
  },
  setCurrentLink: function() {
    var path = window.location.href.split("/")[window.location.href.split("/").length - 1];
    if (path == "about") {
      $("#aboutLink").css("color", "#1EAEDB");
      $("#projectsLink").css("color", "#222");
      $("#contactLink").css("color", "#222");
    } else if (path == "projects") {
      $("#projectsLink").css("color", "#1EAEDB");
      $("#aboutLink").css("color", "#222");
      $("#contactLink").css("color", "#222");
    } else if (path == "contact") {
      $("#contactLink").css("color", "#1EAEDB");
      $("#projectsLink").css("color", "#222");
      $("#aboutLink").css("color", "#222");
    }
  },
  srcChanged: function(src) {
    if (!src)
      return;
    console.log("Loading " + src);
  }
}, {});
var makoPage = function makoPage() {
  this.controller = new makoPageController(this);
};
($traceurRuntime.createClass)(makoPage, {attributeChangedCallback: function(attribute, oldVal, newVal) {
    if (attribute == "src") {
      this.controller.srcChanged(newVal);
    } else if (attribute == "speed") {
      this.determinePlaybackMode();
      this.controller.speedChanged(this.speed);
    } else if (attribute == "bpm") {
      this.determinePlaybackMode();
      this.controller.bpmChanged(this.bpm);
    } else if (attribute == "stopped") {
      this.determinePlaybackOptions();
      this.controller.stoppedChanged(this.options.stopped);
    } else if (attribute == "ping-pong") {
      this.determinePlaybackOptions();
      this.controller.pingPongChanged(this.options.pingPong);
    } else if (attribute == "snap") {
      this.determinePlaybackOptions();
      this.controller.snapChanged(this.options.snap);
    } else if (attribute == "n-times") {
      this.determinePlaybackOptions();
      this.controller.nTimesChanged(this.options.nTimes);
    }
  }}, {}, HTMLElement);
document.registerElement('mako-page', makoPage);
//# sourceURL=mako-page.js