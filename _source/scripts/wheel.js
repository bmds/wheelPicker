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
