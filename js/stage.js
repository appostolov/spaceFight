/**
* Createjs stage object.
* @type {object}
*/
var stage = (function () {
    var instance;
 	
	/** Creates stage instance. */
    function createInstance() {
        var object = new createjs.Stage("canvas_ID");
        return object;
    }
	
	if (!instance) {
		instance = createInstance();
	}
 
    return instance;
})();