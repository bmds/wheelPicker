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

			$newCircle.style.backgroundImage = 'url("' + player.playerAvatar + '")';

			Utilities.append(wonder_wheel, $newCircle);
	}

	function init(){
			$firstCircle = circleSetup();

			Utilities.addEventListener(wonder_button, 'click', callsForAWinner)

			players.map(outputPlayers);

	}

	init();

})(window.code.Utilities, window.code.players);
