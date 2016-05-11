window.code.Utilities = window.code.Utilities || {};

window.code.Utilities = (function(){
  'use strict';
  var api = {};

  api.addEventListener = function(el, eventName, eventHandler) {
    el.addEventListener(eventName, eventHandler);
  };

  api.append = function(parent, el) {
    parent.appendChild(el);
  };

  api.text = function (el, string){
    el.textContent = string;
  };

  api.addClass = function(el, className) {
    el.classList.add(className);
  };

  api.removeClass = function(el, className) {
    el.classList.remove(className);
  };

  api.clone = function(el) {
    return el.cloneNode(true);
  };

  api.setVendorPrefixes = function(element, property, value) {
		element.style['webkit' + property] = value;
		element.style['Moz' + property] = value;
		element.style['ms' + property] = value;
		element.style['O' + property] = value;
	};

  api.circleTransform = function(element, rotationArg, wheelWidth) {
    var transfromString = ('rotate(' + rotationArg + 'deg) translate(0, ' + wheelWidth + 'px) rotate(180deg)');

   // now attach that variable to each prefixed style
   element.style.webkitTransform = transfromString;
   element.style.MozTransform = transfromString;
   element.style.msTransform = transfromString;
   element.style.OTransform = transfromString;
   element.style.transform = transfromString;
  };

  return api;
})();
