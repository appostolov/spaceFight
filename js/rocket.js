/**
* Rocket
* @constructor
* @param {number} x - rocket START X coord
* @param {number} y - rocket START Y coord
* @param {number} endX - rocket END X coord
* @param {number} endY - rocket END Y coord
* @property {object} animation - createjs Sprite
* @property {boolean} fly - rocket movement checker
* @property {number} vell - rocket movement velocity
*/
function rocket(x, y, endX, endY){
	
	/**
	* Rocket direction (angle)
	* @type {number}
	*/
	var a = canvas.radTOdeg(Math.atan2(endY - y, endX - x));
	
	/**
	* Rocket image angle for fixing to the X axs
	* @type {number}
	*/
	var imgAngle = 90;	
	
	/**
	* Rocket image DOM node
	* @type {object}
	*/
	var img = document.getElementById("rocket");
	
	/**
	* Data for rocket animation
	* @type {object}
	* @property {Array} images - the rocket animation frames
	* @property {object} frames - describing the animation frames
	* @property {object} animations - group frames into animations
	*/
	var data = {
		images: [img],
		frames: {width:26, height:49},
		animations: {
			fly:[0,3, "fly"]
		}
	};
	
	/** 
	* @type {object}
	* @param {object} data - animation data
	*/
	var spriteSheet = new createjs.SpriteSheet(data);
	
	/** 
	* The rocket animation object
	* @type {object}
	* @param {object} spriteSheet
	* @param {string} fly - start mode for the animation
	*/
	this.animation = new createjs.Sprite(spriteSheet, "fly");
	
	/** Adding the animation object to the {stage} */
	stage.addChild(this.animation);
	
	/** Setting some animation properties */
	this.animation.x = x;
	this.animation.y = y;
	this.animation.regX = data.frames.width/2;
	this.animation.regY = data.frames.height/2;
	this.animation.rotation = a + imgAngle;
	
	/** 
	* The rocket movement checker
	* @type {boolean}
	*/
	this.fly = true;

	/** 
	* The rocket movement velocity
	* @type {number}
	*/
	this.vell = 25;
	
	/** Moving the rocket */
	this.move = function(){
		
		/**
		* Rocket coordinates
		* @type {number}
		*/
		var rocketX = this.animation.x;
		var rocketY = this.animation.y;
		
		/**
		* Steps forward about the axis
		* @type {number}
		*/
		var stepX = this.vell*Math.cos(canvas.degTOrad(a));
		var stepY = this.vell*Math.sin(canvas.degTOrad(a));
		
		/** Move about X axs */
		if(Math.abs(endX - rocketX) > Math.abs(stepX)){
			this.animation.x += stepX;
		}else{
			this.animation.x = endX;
		}
		
		/** Move about Y axs */
		if(Math.abs(endY - rocketY) > Math.abs(stepY)){
			this.animation.y += stepY;
		}else{
			this.animation.y = endY;
		}
		
		/** Checks if the rocket hitting the target */
		if(this.animation.x === endX && this.animation.y === endY){
			this.stopRocket();
		}
		return;
	};
	
	/** Stops the rocket movement and animation */
	this.stopRocket = function(){
		
		/** Removes the rocket animation from the {stage} */
		stage.removeChild(this.animation);
		
		/** Sets the movement checker to FALSE */
		this.fly = false;
		
		return;
	};
};