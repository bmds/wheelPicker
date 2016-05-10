window.code.Utilities = window.code.Utilities || {};

window.code.Utilities = (function(){
  'use strict';
  var api = {};

  api.addEventListener = function(eventName, eventHandler) {
    el.addEventListener(eventName, eventHandler);
  };

  api.append = function(parent, el) {
    parent.appendChild(el);
  };

  api.addClass = function(el, className) {
    el.classList.add(className);
  };

  api.removeClass = function() {
    el.classList.remove(className);
  };

  api.clone = function(el) {
    el.cloneNode(true);
  };

  api.setVendorPrefixes = function(element, property, value) {
		element.style['webkit' + property] = value;
		element.style['Moz' + property] = value;
		element.style['ms' + property] = value;
		element.style['O' + property] = value;
	};

  return api;
})();
