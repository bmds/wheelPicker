(function ($) {
		"use strict";

		/**************************************************************

						Script          : Wheel Spinner
						Authors         : Matthew Claffey
						Version         : 2.0.0
						Version Notes:


		**************************************************************/


		if(!window.code) window.code = {};
		if(!window.code.components) window.code.components = {};


		var wheelSpinner = window.code.components.wheelSpinner = function (container, options) {
				// Elements

				var wonder_wheel    = $('[data-wheel]');
				var wonder_button   = $('[data-button]');
				var wonder_title    = $('[data-title]');



				// Players

				var players = [
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
								playerName: 'Tom Newton',
								playerInitials: 'TN',
								playerNumber: 6
						},
						{
								playerName: 'Charles Burdett',
								playerInitials: 'CB',
								playerNumber: 7
						},
						{
								playerName: 'Darren Hall',
								playerInitials: 'DH',
								playerNumber: 8
						}
				];


				// Other

				var anglesArr           = [];
				var rotationPosition    = (360 / players.length);
				var wheelWidth          = wonder_wheel.outerWidth() / 2;
				var $firstCircle;

				// Local Storage

				function stores() {
						var local = localStorage.getItem('previous-winners').split(',');

						local.map(function(number){
								number = parseInt(number);

								if(!isNaN(number)){
										pastWinners.push(number);
								}
						});

				};

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

								localStorage.setItem('previous-winners', pastWinners);

								setEvents(chosenNumber);

						} else {
								wonder_title.text(players[chosenNumber].playerName + ' has already beem selected.');
						}
				};

				function tensionBuilder(){
						 wonder_wheel.css({
								'transform': 'rotate(1420deg)'
						});
				};

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
				};

				function getWidth(elem){
						return $(elem).width();
				}

				function createCircle(){
						return $('<div />', {
								'class': 'wheel-circle',
								'html': '<a class="user"></a>',
								'data-circle': ''
						});
				};

				function circleSetup(){
						//Jquery object
						var $circle = createCircle();

						wonder_wheel.append($circle);

						return $circle;
				};

				function setProperties($newCircle, rp, wheelWidth){
					 $newCircle.css({'transform': 'rotate('+rp+'deg) translateY('+wheelWidth+'px) rotate(180deg)',
								'margin': getWidth($firstCircle) / 2 *-1
						});
				};

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
				};

				function init(){
						localStorage.setItem('previous-winners', null);

						stores();

						$firstCircle = circleSetup();

						wonder_button.on('click', callsForAWinner);
						players.map(outputPlayers);

				};

				init();
		};


		$(function () {
				var wonderWheel = new code.components.wheelSpinner();
		});

}(jQuery));
