window.code = window.code || {};  

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

window.code.players = window.code.players || {};

window.code.players = (function(){
  'use strict';

  return {
    keys: [
      {
          playerName: 'Matthew Claffey',
          playerInitials: 'MC',
          playerNumber: 0,
          playerAvatar: 'https://github.com/code-mattclaffey.png'
      },
      {
          playerName: 'Andrew Brandwood',
          playerInitials: 'AB',
          playerNumber: 1,
          playerAvatar: 'https://github.com/andrewbrandwood.png'
      },
      {
          playerName: 'Tristan Ashley',
          playerInitials: 'TA',
          playerNumber: 2,
          playerAvatar: 'https://github.com/tawashley.png'
      },
      {
          playerName: 'Daniel Furze',
          playerInitials: 'DF',
          playerNumber: 3,
          playerAvatar: 'https://github.com/furzeface.png'
      },
      {
          playerName: 'Barney Scott',
          playerInitials: 'BS',
          playerNumber: 4,
          playerAvatar: 'https://github.com/bmds.png'
      },
      {
          playerName: 'Matthew Macartney',
          playerInitials: 'MM',
          playerNumber: 5,
          playerAvatar: 'https://github.com/mmacartney10.png'
      },
      {
          playerName: 'James Tudsbury',
          playerInitials: 'JT',
          playerNumber: 6,
          playerAvatar: 'https://github.com/jtuds.png'
      },
      {
          playerName: 'Darren Hall',
          playerInitials: 'DH',
          playerNumber: 7,
          playerAvatar: 'https://github.com/iamdarrenhall.png'
      }
    ]
  };
})();

/**************************************************************

				Script          : Wheel Spinner
				Authors         : Matthew Claffey
				Version         : 3.1.0
				Version Notes:


**************************************************************/
window.code.wheelSpinner = window.code.wheelSpinner || {};

window.code.wheelSpinner = (function(Utilities, players) {
	// Elements

	var wonder_wheel    = document.querySelectorAll('[data-wheel]')[0];
	var wonder_button   = document.querySelectorAll('[data-button]')[0];
	var wonder_title    = document.querySelectorAll('[data-title]');

	players = players.keys;


	// Other

	var anglesArr           = [];
	var rotationPosition    = (360 / players.length);
	var wheelWidth          = wonder_wheel.offsetWidth / 2;
	var $firstCircle;

	// Call for a winner

	// Utilities

	function injectText(el, text) {
		Utilities.text(el, text);
	}

	function applyBackgroundImage(el, bg) {
		el.style.backgroundImage = 'url("' + bg + '")';
	}

	function appendElement(parent, el) {
		Utilities.append(parent, el);
	}

	function addClass(el, className) {
		Utilities.addClass(el, className);
	}

	function removeClass(el, className) {
		Utilities.removeClass(el, className);
	}

	function setVendorPrefixes(el, prop, value) {
		Utilities.setVendorPrefixes(el, prop, value);
	}

	function getWidth(elem){
		return elem.offsetWidth;
	}

	function spinWheel(wheelSpin) {
		setTimeout(function() {
			setVendorPrefixes(wonder_wheel, 'Transform', 'rotate('+ wheelSpin +'deg)');
		}, 3000);
	}

	function declareSelected(chosenPlayer, chosenNumber) {
		setTimeout(function(){
				addClass(chosenPlayer, 'active');
				injectText(wonder_title[0], players[chosenNumber].playerName + ' has been selected.');
		}, 6000);
	}

	function setEvents(chosenNumber){
			var wheelSpin = 180 - anglesArr[chosenNumber];
			var wonder_circle   = document.querySelectorAll('[data-circle]');

			injectText(wonder_title[0], 'Lets Go!');

			setVendorPrefixes(wonder_wheel, 'Transform', 'rotate(1420deg)');

			for(var i =0; i < wonder_circle.length; i++) {
				removeClass(wonder_circle[i], 'active');
			}

			spinWheel(wheelSpin);

			declareSelected(wonder_circle[chosenNumber + 1], chosenNumber);

	}

	function callsForAWinner() {
			var chosenNumber = Math.floor(Math.random() * players.length);
			setEvents(chosenNumber);
	}

	function createCircle() {
		var circle = document.createElement('div');
		addClass(circle, 'wheel-circle');
		circle.setAttribute('data-circle', '');

		return circle;
	}

	function setProperties($newCircle, rp, wheelWidth) {
			var margin = getWidth($firstCircle) / 2 * -1;
			Utilities.circleTransform($newCircle, rp, wheelWidth);
			$newCircle.style.margin = margin + 'px';
	}

	function calculateRotationPosiiton(i) {
		var position = rotationPosition * i;
		anglesArr.push(position);

		return position;
	}

	function outputPlayers(player) {
			var i = player.playerNumber + 1;
			var rp = calculateRotationPosiiton(i);

			var $newCircle = $firstCircle;

			if(i > 0){
					$newCircle = Utilities.clone($firstCircle);
			}

			setProperties($newCircle, rp, wheelWidth);


			// Utility Functions
			injectText($newCircle, player.playerInitials);

			applyBackgroundImage($newCircle, player.playerAvatar);

			appendElement(wonder_wheel, $newCircle);

	}

	function circleSetup(){
			//Jquery object
			var $circle = createCircle();

			appendElement(wonder_wheel, $circle);

			$firstCircle = $circle;
	}

	function bindEvents() {
		Utilities.addEventListener(wonder_button, 'click', callsForAWinner);
	}

	function init(){
			circleSetup();
			bindEvents();
			players.map(outputPlayers);
	}

	init();

})(window.code.Utilities, window.code.players);
