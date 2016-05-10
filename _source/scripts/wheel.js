/**************************************************************

				Script          : Wheel Spinner
				Authors         : Matthew Claffey
				Version         : 2.0.0
				Version Notes:


**************************************************************/
window.code.wheelSpinner = window.code.wheelSpinner || {};

window.code.wheelSpinner = (function($, Utilities, players) {
	// Elements

	var wonder_wheel    = $('[data-wheel]');
	var wonder_button   = $('[data-button]');
	var wonder_title    = $('[data-title]');

	var players = players.keys;


	// Other

	var anglesArr           = [];
	var rotationPosition    = (360 / players.length);
	var wheelWidth          = wonder_wheel.outerWidth() / 2;
	var $firstCircle;

	var pastWinners = [];

	// Call for a winner

	function callsForAWinner() {
			var chosenNumber = Math.floor(Math.random() * players.length);

			if(pastWinners.length > 2) {
					pastWinners = [];
			}

			// If player does not exist
			if($.inArray(chosenNumber, pastWinners) === -1) {

					pastWinners.push(chosenNumber);

					setEvents(chosenNumber);

			} else {
					wonder_title.text(players[chosenNumber].playerName + ' has already beem selected.');
			}
	}

	function tensionBuilder(){
			 wonder_wheel.css({
					'transform': 'rotate(1420deg)'
			});
	}

	function setEvents(chosenNumber){
			var wheelSpin = 180 - anglesArr[chosenNumber];
			var wonder_circle   = $('[data-circle]');


			wonder_title.text('Lets Go!');

			tensionBuilder();

			wonder_circle.removeClass('active');


			setTimeout(function(){
					wonder_wheel.css({
							'transform': 'rotate('+ wheelSpin +'deg)'
					});
			}, 3000);

			setTimeout(function(){
					wonder_circle.eq(chosenNumber + 1).addClass('active');
					wonder_title.text(players[chosenNumber].playerName + ' has been selected.');
			}, 6000);
	}

	function getWidth(elem){
			return $(elem).width();
	}

	function createCircle(){
			return $('<div />', {
					'class': 'wheel-circle',
					'html': '<a class="user"></a>',
					'data-circle': ''
			});
	}

	function circleSetup(){
			//Jquery object
			var $circle = createCircle();

			wonder_wheel.append($circle);

			return $circle;
	}

	function setProperties($newCircle, rp, wheelWidth){
		 $newCircle.css({
			 		'transform': 'rotate('+rp+'deg) translateY('+wheelWidth+'px) rotate(180deg)',
					'margin': getWidth($firstCircle) / 2 *-1
			});
	}

	function outputPlayers(player) {
			var i = player.playerNumber + 1;

			var $newCircle = $firstCircle;

			var rp = (rotationPosition * i);

			//capture the angles

			anglesArr.push(rp);

			if(i > 0){
					$newCircle = $firstCircle.clone();
			}

			setProperties($newCircle, rp, wheelWidth);

			$newCircle.text(player.playerInitials);

			wonder_wheel.append($newCircle);
	}

	function init(){
			$firstCircle = circleSetup();

			wonder_button.on('click', callsForAWinner);
			players.map(outputPlayers);

	}

	init();

})(jQuery, window.code.Utilities, window.code.players);
