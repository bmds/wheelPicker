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
          playerNumber: 0
      },
      {
          playerName: 'Andrew Brandwood',
          playerInitials: 'AB',
          playerNumber: 1
      },
      {
          playerName: 'Tristan Ashley',
          playerInitials: 'TA',
          playerNumber: 2
      },
      {
          playerName: 'Daniel Furze',
          playerInitials: 'DF',
          playerNumber: 3
      },
      {
          playerName: 'Barney Scott',
          playerInitials: 'BS',
          playerNumber: 4
      },
      {
          playerName: 'Matthew Macartney',
          playerInitials: 'MM',
          playerNumber: 5
      },
      {
          playerName: 'James Tudsbury',
          playerInitials: 'JT',
          playerNumber: 6
      },
      {
          playerName: 'Darren Hall',
          playerInitials: 'DH',
          playerNumber: 7
      }
    ]
  };
})();

/**************************************************************

				Script          : Wheel Spinner
				Authors         : Matthew Claffey
				Version         : 3.0.0
				Version Notes:


**************************************************************/
window.code.wheelSpinner = window.code.wheelSpinner || {};

window.code.wheelSpinner = (function(Utilities, players) {
	// Elements

	var wonder_wheel    = document.querySelectorAll('[data-wheel]')[0];
	var wonder_button   = document.querySelectorAll('[data-button]')[0];
	var wonder_title    = document.querySelectorAll('[data-title]');

	var players = players.keys;


	// Other

	var anglesArr           = [];
	var rotationPosition    = (360 / players.length);
	var wheelWidth          = wonder_wheel.offsetWidth / 2;
	var $firstCircle;

	// Call for a winner

	function callsForAWinner() {
			var chosenNumber = Math.floor(Math.random() * players.length);
			setEvents(chosenNumber);
	}

	function tensionBuilder(){
			Utilities.setVendorPrefixes(wonder_wheel, 'Transform', 'rotate(1420deg)');
	}

	function setEvents(chosenNumber){
			var wheelSpin = 180 - anglesArr[chosenNumber];
			var wonder_circle   = document.querySelectorAll('[data-circle]');

			Utilities.text(wonder_title[0], 'Lets Go!');

			tensionBuilder();

			for(var i =0; i < wonder_circle.length; i++) {
				Utilities.removeClass(wonder_circle[i], 'active');
			}

			setTimeout(function(){
					Utilities.setVendorPrefixes(wonder_wheel, 'Transform', 'rotate('+ wheelSpin +'deg)');
			}, 3000);

			setTimeout(function(){
					Utilities.addClass(wonder_circle[chosenNumber + 1], 'active');
					Utilities.text(wonder_title[0], players[chosenNumber].playerName + ' has been selected.');
			}, 6000);
	}

	function getWidth(elem){
			return elem.offsetWidth;
	}

	function createCircle() {
		var circle = document.createElement('div');
		Utilities.addClass(circle, 'wheel-circle');
		circle.setAttribute('data-circle', '');

		return circle;
	}

	function circleSetup(){
			//Jquery object
			var $circle = createCircle();

			Utilities.append(wonder_wheel, $circle);

			return $circle;
	}

	function setProperties($newCircle, rp, wheelWidth) {
			var margin = getWidth($firstCircle) / 2 * -1;
			Utilities.circleTransform($newCircle, rp, wheelWidth);
			$newCircle.style.margin = margin + 'px';
	}

	function outputPlayers(player) {
			var i = player.playerNumber + 1;

			var $newCircle = $firstCircle;

			var rp = (rotationPosition * i);

			//capture the angles

			anglesArr.push(rp);

			if(i > 0){
					$newCircle = Utilities.clone($firstCircle);
			}

			setProperties($newCircle, rp, wheelWidth);

			Utilities.text($newCircle, player.playerInitials);

			Utilities.append(wonder_wheel, $newCircle);
	}

	function init(){
			$firstCircle = circleSetup();

			Utilities.addEventListener(wonder_button, 'click', callsForAWinner)

			players.map(outputPlayers);

	}

	init();

})(window.code.Utilities, window.code.players);
