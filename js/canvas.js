/**
* Catch canvas DOM element and provide additional functions.
* @type {object}
* @property {object} get - DOM element.
* @property {function} size - change the width, height, top and left of the DOM element.
* @property {function} degTOrad - convert degreeses to radians.
* @property {function} radTOdeg - convert radians to degreeses.
* @property {function} mouseCoords - returns the mouse position about the DOM element.
*/
var canvas = {
	
	/** Catch canvas DOM element. */
	get: document.getElementById("canvas_ID"),
	
	/** Size the {canvas.get} */
	size: function(){
		var w = window.innerWidth;
		var h = window.innerHeight;
		
		var size;
		if(h <= w){
			size = h;
		}else{
			size = w;
		}
		
		this.get.width = size;
		this.get.height = size;
		this.get.style.left = ((w - size)/2) + "px";
		this.get.style.top = ((h - size)/2) + "px";
		
		return;
	},
	
	/**
	* Convert degrees to radians.
	* @param {number} deg - angle in degreeses.
	* @returns {number} the angle in radians
	*/
	degTOrad: function(deg){
		return deg*Math.PI/180;
	},
	
	/**
	* Convert radians to degreeses.
	* @param {number} rad - angle in radians.
	* @returns {number} the angle in degreeses
	*/
	radTOdeg: function(rad){
		return rad*180/Math.PI;
	},
	
	/**
	* Calculate the mouse position about the canvas
	* @param {number} clientX - mouse X position about the screen
	* @param {number} clientY - mouse Y position about the screen
	* @returns {Array} the position
	*/
	mouseCoords: function(clientX, clientY){
		var x = this.get.offsetLeft;
		var y = this.get.offsetTop;
		
		return [clientX - x, clientY - y];
	}
};