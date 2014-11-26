// Shim & native-safe ownerDocument lookup
var owner = (document._currentScript || document.currentScript).ownerDocument;


class MakoCube extends HTMLElement {

 createdCallback() {
     console.log("MakoCube init()");
  }

};



document.registerElement('mako-cube', MakoCube);
