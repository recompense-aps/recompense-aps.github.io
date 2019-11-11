/*
* Pipin.Geometry
* Geometry Module
* This Module does not have its own Namespace,
* It's components are added directly to Ppipin
*/

/*
* Pipin.Rectangle
*/

(function(){

	var Rectangle = new Class(function(x, y, width, height){
		;"Rectangle";
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	});

	Rectangle.Prop("x", 0);
	Rectangle.Prop("y", 0);
	Rectangle.Prop("width", 0);
	Rectangle.Prop("height", 0);

	Rectangle.Prop("Intersects", function(rectangle)
	{
		var a = this;
		var b = rectangle;
		if (a.x < (b.x + b.width) && (a.x + a.width) > b.x && a.y < (b.y + b.height) && (a.y + a.height) > b.y)
		{
			return true;
		}
		else
		{
			return false;
		}
	});

	Rectangle.Prop("Scale", function(scale)
	{
		this.width = scale * Pipin.Viewport.width;
		this.height = scale * Pipin.Viewport.height;
	});

	Rectangle.Prop("GetDistance", function(otherVector){
		var basex = otherVector.x - this.x;
		var basey = otherVector.y - this.y;

		basex = basex * basex;
		basey = basey * basey;

		return Math.sqrt(basex + basey);
	});

	Pipin["Rectangle"] = Rectangle;

})();

/*
* Pipin.Vector
*/

(function(){

	var Vector = new Class(function(x, y){
		;"Vector";
		this.x = x;
		this.y = y;
	});

	Vector.Prop("Normalize", function()
	{
		var that = this;
		var r = (that.x * that.x) + (that.y * that.y);
		r = Math.sqrt(r);

		var x = that.x;
		var y = that.y;

		that.x = x / r;
		that.y = y / r;
	});

	Vector.Prop("GetDistance", function(otherVector){
		var basex = otherVector.x - this.x;
		var basey = otherVector.y - this.y;

		basex = basex * basex;
		basey = basey * basey;

		return Math.sqrt(basex + basey);
	});

	Pipin["Vector"] = Vector;

})();
