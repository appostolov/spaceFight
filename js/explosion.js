/**
* Explosion
* @constructor
* @param {number} x coord
* @param {number} y coord
* @property {object} animation - createjs Sprite
* @property {boolean} blow - explosion action checker
*/
function explosion(x, y){
	
	/**
	* Frame counter
	* @type {number}
	*/
	var frame = 0;
	
	/**
	* Explosion images DOM node
	* @type {object}
	*/
	var img = document.getElementById("explosion");
	
	/**
	* Data for explosion animation
	* @type {object}
	* @property {Array} images - the rocket animation frames
	* @property {object} frames - describing the animation frames
	* @property {object} animations - group frames into animations
	*/
	var data = {
		images: [img],
		frames: {width:128, height:128},
		animations: {
			blow:[0,32]
		}
	};
	
	/** 
	* @type {object}
	* @param {object} data - animation data
	*/
	var spriteSheet = new createjs.SpriteSheet(data);

	/** 
	* The explosion animation object
	* @type {object}
	* @param {object} spriteSheet
	* @param {string} blow - start mode for the animation
	*/
	this.animation = new createjs.Sprite(spriteSheet, "blow");
	
	/** Adding the animation object to the {stage} */
	stage.addChild(this.animation);
	
	/** Setting some animation properties */
	this.animation.x = x;
	this.animation.y = y;
	this.animation.regX = data.frames.width/2;
	this.animation.regY = data.frames.height/2;
	
	/**
	* Explosion action checker
	* @type {boolean}
	*/
	this.blow = true;
	
	/** Upadete the explosion stage */
	this.act = function(){
		if(frame > data.animations.blow[1] - 1){
			
			/** Removes the explosion animation from the {stage} */
			stage.removeChild(this.animation);
			
			/** Sets the action checker to FALSE */
			this.blow = false;
		}
		
		/** Count the frames */
		frame ++;
		return;
	};
};