/**
* Creates new User
* @constructor
* @param {number} x - user position X coordinate
* @param {number} y - user position Y coordinate
* @param {number} angle - user direction
* @property {object} animation - createjs SpriteSheet
* @property {object} line - new lazer object
* @property {boolean} isMove - checks if the user is moving
* @property {number} vell - users walking vellocity
* @property {Array} marks - created by user mark objects
* @property {Array} shoots - created by user shoot objects
* @property {Array} shoots - created by user explosion objects
*/
function User(x, y, angle){
	
	/** The angle, needed to orientate the user image about X axs */
	var imgAngle = 90;	
	
	/** The image for users view */
	var img = document.getElementById("sniper");
	
	/**
	* Data for users animation
	* @type {object}
	* @property {Array} images - the user animation frames
	* @property {object} frames - describing the animation frames
	* @property {object} animations - group frames into animations
	*/
	var data = {
		images: [img],
		frames: {width:52.875, height:63},
		animations: {
			stay:[0,"stay"],
			run:[0,7, "run"]
		}
	};
	
	/** 
	* @type {object}
	* @param {object} data - animation data
	*/
	var spriteSheet = new createjs.SpriteSheet(data);
	
	/** 
	* The users animation object
	* @type {object}
	* @param {object} spriteSheet
	* @param {string} stay - start mode for the animation
	*/
	this.animation = new createjs.Sprite(spriteSheet, "stay");
	
	/** Adding the animation object to the {stage} */
	stage.addChild(this.animation);
	
	/**
	* The users target lazer
	* @type {object}
	* @param {number} x - start point X coord
	* @param {number} y - start point Y coord
	* @param {number} angle - lazer direction
	*/
	this.line = new lazer(100,100,0);
	
	/** Setting some animation properties */
	this.animation.x = x;
	this.animation.y = y;
	this.animation.regX = 14;
	this.animation.rotation = angle + imgAngle;
	
	/** Movement checker */
	this.isMove = false;
	
	/** Users walking velocity */
	this.vell = 10;
	
	/** Created by user shoots, etc... */
	this.marks = [];
	this.shoots = [];
	this.explos = [];
	
	/**
	* Rotates the user
	* @param {object} e - window.event
	*/
	this.rotate = function(e){
		
		/**
		* Users coordinates
		* @type {Array}
		*/
		var userCoord = [this.animation.x, this.animation.y];
		
		/**
		* Mouse coordinates about the canvas
		* @type {Array}
		*/
		var mouseCoord = canvas.mouseCoords(e.clientX, e.clientY);
		
		/**
		* The direction of the user (angle)
		* @type {number}
		*/
		var a = Math.atan2(mouseCoord[1] - userCoord[1], mouseCoord[0] - userCoord[0])*180/Math.PI;
		
		/** Setting the users direction  */
		this.animation.rotation = a + imgAngle;
		
		/** Redrawing the users lazer */
		this.line.draw(userCoord[0], userCoord[1], a);
		
		return;
	};
	
	/**
	* Starting users movement
	* @param {object} e - window.event
	*/
	this.startMove = function(e){
		
		/** Prevent the browqser default actions */
		e.preventDefault();
		
		/** Sets the movement checker to TRUE */
		this.isMove = true;
		
		/** Sets the next destination for the user */
		var mouseCoord = canvas.mouseCoords(e.clientX, e.clientY);
		this.endX = mouseCoord[0];
		this.endY = mouseCoord[1];
		
		/** Sets the needed user animation  (run/stay) */
		this.animation.gotoAndPlay("run");
		
		/**
		* Creates new marker for the next destination
		* @type {object}
		* @param {number} x - new destination X coord
		* @param {number} y - new destination Y coord
		*/
		var mark = new marker(mouseCoord[0], mouseCoord[1]);
		
		/** Adding the marker to the markers array */
		this.marks.push(mark);
		
		return;
	};
	
	/** Moves the user */
	this.move = function(){
		
		/**
		* Users position coordinates
		* @type {number}
		*/
		var userX = this.animation.x;
		var userY = this.animation.y;
		
		/**
		* Direction to the next destination (angle)
		* @type {number}
		*/
		var a = canvas.radTOdeg(Math.atan2(this.endY - userY, this.endX - userX));
		
		/**
		* Step forward about the X and Y axis
		* @type {number}
		*/
		var stepX = this.vell*Math.cos(canvas.degTOrad(a));
		var stepY = this.vell*Math.sin(canvas.degTOrad(a));
		
		/** Move about X axs */
		if(Math.abs(this.endX - userX) > Math.abs(stepX)){
			this.animation.x += stepX;
		}else{
			this.animation.x = this.endX;
		}
		
		/** Move about Y axs */
		if(Math.abs(this.endY - userY) > Math.abs(stepY)){
			this.animation.y += stepY;
		}else{
			this.animation.y = this.endY;
		}
		
		/** Checks if the user is arrived */
		if(this.animation.x === this.endX && this.animation.y === this.endY){
			this.stopMove();
		}
		
		/** Redraw the users lazer */
		this.line.draw(this.animation.x, this.animation.y, this.animation.rotation - imgAngle);
		
		return;
	};
	
	/** Ends the user movement */
	this.stopMove = function(){
		
		/** Setting users animation to "stay" mode */
		this.animation.gotoAndPlay("stay");
		
		/** Setting the users movement checker */
		this.isMove = false;
		
		return;
	};
	
	/**
	* Shooting a rocket
	* @param {object} e - window.event
	*/
	this.shoot = function(e){
		
		/**
		* The mouse position about the canvas
		* @type {Array}
		*/
		var mouseCoord = canvas.mouseCoords(e.clientX, e.clientY);
		
		/**
		* Creates a new rocket
		* @type {object}
		* @param {number} startX
		* @param {number} startY
		* @param {number} endX
		* @param {number} endY
		*/
		var shot = new rocket(this.animation.x, this.animation.y, mouseCoord[0], mouseCoord[1]);
		
		/** Adding the new shot to the users shots */
		this.shoots.push(shot);
		
		return;
	};
	
	/** Render the user and users relatives */
	this.draw = function(){
		
		if(this.isMove === true){
			/** Move the user */
			this.move();
		}
		
		if(this.marks.length > 0){
			for(var i = 0; i < this.marks.length; i ++){
				if(this.marks[i].isMove === true){
					
					/** Draw the mark */
					this.marks[i].draw();
				}else{
					
					/** Destroys the mark */
					this.marks.splice(i, 1);
				}
			}
		}
		if(this.shoots.length > 0){
			for(var i = 0; i < this.shoots.length; i ++){
				if(this.shoots[i].fly === true){
					
					/** Moves the rocket */
					this.shoots[i].move();
				}else{
					
					/**
					* Creates a new explosion
					* @type {object}
					* @param {numbet} exposiont X coord
					* @param {numbet} exposiont Y coord
					*/
					var explo = new explosion(this.shoots[i].animation.x, this.shoots[i].animation.y);
					
					/** Adds the explosion to the users explosions */
					this.explos.push(explo);
					
					/** Destroys the rocket */
					this.shoots.splice(i, 1);
				}
			}
		}
		if(this.explos.length > 0){
			for(var i = 0; i < this.explos.length; i ++){
				if(this.explos[i].blow === true){
					
					/** Animate the explosion */
					this.explos[i].act();
				}else{
					
					/** Destroys the explosion */
					this.explos.splice(i, 1);
				}
			}
		}
		return;
	};
};