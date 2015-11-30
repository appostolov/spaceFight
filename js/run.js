/** Establish the game engine. */
(function () {
	
	/** Manage the html5 canvas element size.*/
	canvas.size();
	window.addEventListener('resize', function(){
		canvas.size();
	});
	
	/**
	*@type {object} 
	* Creates the players hero.
	*/
	var user = new User(100, 100, 0);
	
	/** Attach events to the canvas, which are provided by the {user}. */
	canvas.get.addEventListener('mousemove', function(e){
		user.rotate(e);
	});
	canvas.get.addEventListener('contextmenu', function(e){
		user.startMove(e);
	});
	canvas.get.addEventListener('click', function(e){
		user.shoot(e);
	});
	
	/** Creates a listener for the animations loop. */
	createjs.Ticker.addEventListener("tick", handleTick);
	
	/**
	* The animation loop event listener.
	* @param {window.event}
	*/
	function handleTick(event) {
		
		/** Draws the {user} and its relevant ({rockets}, {markers}, etc...) */
		user.draw();
		
		/** Updating the animation {state}. */
		stage.update();
	};
	
})();