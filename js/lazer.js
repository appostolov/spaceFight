/**
* Lazer of the users weapon
* @constructor
* @param {number} x1 - users X position ( lazer line start )
* @param {number} y1 - users Y position ( lazer line start )
* @param {number} angle - lazer direction
* @property {object} line - createjs line object
*/
function lazer(x1,y1,angle){
	
	/**
	* Lazer length
	* @type {number}
	*/
	var length = 500;
	
	/**
	* Drwaing the lazer onto the canvas
	* @param {number} X1 - lazer start X coord
	* @param {number} Y1 - lazer start Y coord
	* @param {number} ANGLE - lazer direction
	*/
	this.draw = function(X1,Y1,ANGLE){
		
		if(this.line){
			
			/** Removes the line from the {stage} */
			stage.removeChild(this.line);
		}
		
		/**
		* Lazer end position
		* @type {number}
		*/
		var x2 = X1 + length*Math.cos(canvas.degTOrad(ANGLE));
		var y2 = Y1 + length*Math.sin(canvas.degTOrad(ANGLE));
		
		/**
		* New createjs shape for drowing the lazer line
		* @type {object}
		*/
		this.line = new createjs.Shape();
		
		/** Adding the lazer line to the {stage} */
		stage.addChild(this.line);
		
		/** Setting the line properties */
		this.line.graphics.setStrokeStyle(1);
		this.line.graphics.beginLinearGradientStroke(["red", "#333"], [.1, 1], X1, Y1, x2, y2)
		this.line.graphics.moveTo(X1, Y1);
		this.line.graphics.lineTo(x2, y2);
		this.line.graphics.endStroke();
		
		return;
	};
	
	/** Drawing the start view of the lazer */
	this.draw(x1,y1,angle);
};