/**
* New position marker
* @constructor
* @param {number} x coord
* @param {number} y coord
* @property {number} r - marker radius
* @property {number} opacity - marker transperancy
* @property {boolean} isMove - movement checker
*/
function marker(x, y){
	
	/**
	* Marcker circle stroke width
	* @type {number}
	*/
	var width = 1;
	
	/**
	* Start marcker circle radius
	* @type {number}
	*/
	var minR = 10;
	
	/**
	* End marcker circle radius
	* @type {number}
	*/
	var maxR = 20;
	
	/**
	* Marker circle growing velocity
	* @type {number}
	*/
	var vell = 1;
	
	/**
	* Marker circle fadeing velocity
	* @type {number}
	*/
	var opacityVell = 1/((maxR - minR)/vell);
	
	/**
	* Marcker circle radius
	* @type {number}
	*/
	this.r = minR;
	
	/**
	* Marcker stroke transperancy
	* @type {number}
	*/
	this.opacity = 1;
	
	/**
	* Marcker movement checker
	* @type {boolean}
	*/
	this.isMove = true;
	
	/** Drawing the marker onto the canvas */
	this.draw = function(){
		
		/** Removes the marker circle from the {stage} */
		stage.removeChild(this.circle);
		
		if(this.r > maxR){
			
			/** Sets the movement checker to FALSE */
			this.isMove = false;
		}else{
			
			/**
			* Createjs circle graphic
			* @type {object}
			*/
			var graphics = new createjs.Graphics().setStrokeStyle(width).beginStroke("rgba(255,0,0,"+this.opacity+")").drawCircle(x, y, this.r);
			
			/**
			* The markers circle
			* @type {object}
			*/
			this.circle = new createjs.Shape(graphics);
			
			/** Adding the circle to the {stage} */
			stage.addChild(this.circle);
			
			/** Increace the radius */
			this.r += vell;
			
			/** Increace the transperancy */
			this.opacity -= opacityVell;
		}
		return;
	};
	
	/** Draw the marker start view */
	this.draw(x,y);
};