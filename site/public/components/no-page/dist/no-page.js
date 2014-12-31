"use strict";
var owner = (document._currentScript || document.currentScript).ownerDocument;
var noPageController = function noPageController(noPage) {
  this.noPage = noPage;
  this.setupComponent();
  this.srcChanged(this.noPage.getAttribute('src'));
};
($traceurRuntime.createClass)(noPageController, {
  setupComponent: function() {
    this.shadow = this.noPage.createShadowRoot();
    var template = owner.querySelector("#template").content.cloneNode(true);
    this.shadow.appendChild(template);
    this.initMatrix();
  },
  initMatrix: function() {
    var canvas = this.shadow.querySelector("#matrix");
    var s = window.screen;
    var windowWidth = $(window).innerWidth();
    var windowHeight = $(window).outerHeight();
    var navHeight = $(".navbar").outerHeight();
    if (navHeight > 70) {
      navHeight = 0;
    }
    console.log("window inner height: " + windowHeight);
    console.log("nav Height: " + navHeight);
    var width = canvas.width = windowWidth;
    var height = canvas.height = windowHeight - navHeight;
    var letters = Array(256).join(1).split('');
    var draw = function() {
      canvas.getContext('2d').fillStyle = 'rgba(0,0,0,.05)';
      canvas.getContext('2d').fillRect(0, 0, width, height);
      canvas.getContext('2d').fillStyle = '#0F0';
      letters.map(function(y_pos, index) {
        var text = String.fromCharCode(3e4 + Math.random() * 33);
        var x_pos = index * 10;
        canvas.getContext('2d').fillText(text, x_pos, y_pos);
        letters[index] = (y_pos > 758 + Math.random() * 1e4) ? 0 : y_pos + 10;
      });
    };
    setInterval(draw, 50);
    this.scareNeo();
  },
  scareNeo: function() {
    var self = this;
    setTimeout(function() {
      var messageContainer = self.shadow.querySelector('#message');
      var message = "The Matrix is looking for you Neo";
      var messageElement = $('<p>', {
        text: message,
        id: 'neoPara'
      }).appendTo(messageContainer);
      var top = Math.max(0, (($(window).height() - $(messageContainer).outerHeight()) / 2) + $(window).scrollTop()) + "px";
      var left = Math.max(0, (($(window).width() - $(messageContainer).outerWidth()) / 2) + $(window).scrollLeft()) + "px";
      messageContainer.style.top = top;
      messageContainer.style.left = left;
    }, 3000);
  },
  srcChanged: function(src) {
    if (!src)
      return;
    console.log("Loading " + src);
  }
}, {});
var noPage = function noPage() {
  $traceurRuntime.superConstructor($noPage).apply(this, arguments);
};
var $noPage = noPage;
($traceurRuntime.createClass)(noPage, {
  createdCallback: function() {
    this.controller = new noPageController(this);
  },
  attributeChangedCallback: function(attribute, oldVal, newVal) {
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
  }
}, {}, HTMLElement);
document.registerElement('no-page', noPage);
//# sourceURL=no-page.js