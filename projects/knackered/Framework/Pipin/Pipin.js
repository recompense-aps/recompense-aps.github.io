/*
*	Pipin.js Build 0.1.1
*	Written By Alex Smith
*/

var Pipin;


Pipin = new Class(function(canvasId){
    ;"Pipin";
    var that = this;

    var _canvasElement = this.canvasElement = document.getElementById(canvasId);

    that.canvas = _canvasElement.getContext("2d");
    that.canvasElement = document.getElementById(canvasId);
    console.log(that.canvasElement);

    this.Viewport.maxWidth = $("body").width();

    this.canvas.imageSmoothingEnabled = true;
});
(function()
{
    Pipin.Prop("getCanvasEvents", function()
    {
        var that = this;
        var evts = [
            [
                "mousemove", function(e){
                    that.Mouse.SetMousePos(that.canvasElement, e);
                }
            ],
            [
                "mousedown", function(){
                    that.Mouse.down = true;
                }
            ],
            [
                "mouseup", function(){
                    that.Mouse.down = false;
                }
            ],
            [
                "touchstart", function(){
                    that.Mouse.down = true;
                }
            ],
            [
                "touchend", function(){
                    that.Mouse.down = false;
                }
            ],
            [
                "click", function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            ]
        ];

        return evts;
    });

    var bodyEvents =
    [
        [
            "keydown", function(e){
                e.preventDefault();
                e.stopPropagation();
                Keys[String.fromCharCode(e.keyCode).toUpperCase()].down = true;
            }
        ],
        [
            "keyup", function(e){
                e.preventDefault();
                e.stopPropagation();
                Keys[String.fromCharCode(e.keyCode).toUpperCase()].down = false;
            }
        ]
    ];

    var Keys = (function(){
        var _keys = [];
        for (i = 0; i < 230; i++)
        {
            var _char = String.fromCharCode(i).toUpperCase();
            switch (i)
            {
                case 37:
                _keys["LeftArrow"] = {down:false};
                break;
                default:
                _keys[_char] = {down:false};
                break;
            }


        }
        return _keys;
    })();

    var Viewport =
    {
			x: 0,
			y: 0,
			width: 1280,
			height: 720,
			maxWidth: $("body").width(),
			maxHeight: $("body").height(),
			rotation: 0,

			Maximize: function(){
				$(canvasElement).attr("width", Viewport.maxWidth);

				//console.log(Viewport.maxHeight);

				$(canvasElement).attr("height", Viewport.maxWidth * 0.5);

				Viewport.width = Viewport.maxWidth;
				Viewport.height = Viewport.maxWidth * 0.5;
			},

			GetViewRectangle: function(){
				 return new Pipin.Rectangle(-Viewport.x, -Viewport.y, Viewport.width, Viewport.height);
			}


	};

    var Mouse =
    {
        x: 0,
        y: 0,
        down: false,
        SetMousePos: function(c, evt)
        {
            var rect = c.getBoundingClientRect();

            Mouse.x = evt.clientX - rect.left;
            Mouse.y = evt.clientY - rect.top;
        },
        GetRectangle: function()
        {
            return new Pipin.Rectangle(Mouse.x - Viewport.x, Mouse.y - Viewport.y, 5, 5);
        }
    };


    /*
    * Pipin.Core
    */

    Pipin.Prop("WireUpEvents", function()
    {
        var that = this;
        $(that.getCanvasEvents()).each(function(){
            var eventItem = $(this);
            that.canvasElement.addEventListener(eventItem[0], eventItem[1], false);
        });

        $(bodyEvents).each(function(){
            var eventItem = $(this);
            document.body.addEventListener(eventItem[0], eventItem[1], false);
        });
    });

    Pipin.Prop("LoadStack", 0);

    Pipin.Prop("time", null);
    Pipin.Prop("deltaTime", null);
    Pipin.Prop("activeGame", null);

    Pipin.Prop("loading", false);

    Pipin.Prop("Viewport", Viewport);
    Pipin.Prop("Mouse", Mouse);
    Pipin.Prop("Keys", Keys);

    //Pipin.Prop("canvasEvents", canvasEvents);
    Pipin.Prop("bodyEvents", bodyEvents);

    Pipin.Prop("Run", function(Game)
    {
        var that = this;
        that.WireUpEvents();
        window.requestAnimationFrame(function(timestamp)
        {
            that.activeGame.Run(timestamp, that.activeGame);
        });
    });

    Pipin.Prop("Loop", function(timestamp)
    {
        var that = this;

        if (!that.time)
        {
            that.time = timestamp
        }

        that.deltaTime = timestamp - that.time;

        that.time = timestamp;


        window.requestAnimationFrame(function(timestamp)
        {
            that.activeGame.Run(timestamp, that.activeGame);
        });
    });

    Pipin.Prop("LoadGame", function(Game)
    {
        var that = this;
        that.activeGame = Game;
        Game.Load();
    });

    Pipin.Prop("LoadTexture", function(textureData)
    {
        var that = this;

        that.LoadStack++;

        var image = new Image();
        var returnTexture = null;

        pipin.loading = true;

        if (typeof(textureData) == "string")
        {
            var textureDataObject = {};
            textureDataObject.path = textureData.split(";")[0];
            textureDataObject.scale = textureData.split(";")[1];
            textureDataObject.width = parseInt(textureData.split(";")[2]);
            textureDataObject.height = parseInt(textureData.split(";")[3]);
            textureDataObject.id = textureData.split(";")[4] ? textureData.split(";")[4] : null;
            textureData = textureDataObject;
        }


        image.src = textureData.path;
        image.onload = function()
        {
            that.LoadStack--;
        }

        var displayWidth = textureData.scale ? image.width * textureData.width : textureData.width;
        var displayHeight = textureData.scale ? image.height * textureData.height : textureData.height;

        var texture =
        {
            id: 		  textureData.id,
            path: 		  textureData.path,
            texture: 	  image,
            actualWidth:  image.width,
            actualHeight: image.height,
            width: 		  displayWidth,
            height: 	  displayHeight
        };

        return texture;
    });

    Pipin.Prop("LoadSound", function(path)
    {
        var that = this;
        //that.LoadStack++;
        var a = new Audio();
        a.src = path;
        a.onload = function()
        {
            that.LoadStack--;
        }
        return a;
    });

    Pipin.Prop("LoadTextures", function()
    {
        var that = this;
        for (var i = textures.length - 1; i >= 0; i--)
        {
            that.LoadTexture(textures[i]);
        };
    });

    Pipin.Prop("Draw", function(texture, rectangle, params)
    {
        var that = this;

        viewRect = that.Viewport.GetViewRectangle();
        if (!rectangle.Intersects(viewRect)){return}
        that.canvas.save(); //save the state of the  canvas

        var x = rectangle.x + that.Viewport.x; //get x coordinate for drawing, adjust for viewport position
        var y = rectangle.y + that.Viewport.y; //get y coordinates for drawing, adjust for viewport position
        var width = rectangle.width;
        var height = rectangle.height;
        var rotation = params.rotation ? params.rotation + that.Viewport.rotation: that.Viewport.rotation;

        that.canvas.globalAlpha = params.alpha ? params.alpha : that.canvas.globalAlpha;
        that.canvas.translate(x + width / 2, y + height / 2);
        that.canvas.rotate(rotation);
        if (params.clipWidth)
        {
            that.canvas.drawImage(texture.texture, params.clipX, params.clipY, params.clipWidth, params.clipHeight, -width/2, -height/2, rectangle.width, rectangle.height);
        }
        else
        {
            that.canvas.drawImage(texture.texture, -width/2, -height/2, rectangle.width, rectangle.height);
        }

        that.canvas.rotate(0);
        that.canvas.globalAlpha = 1;

        that.canvas.restore();
    });

    Pipin.Prop("DrawCircle", function(x, y, r, color)
    {
        var that = this;
        pipin.canvas.save();
        pipin.canvas.fillStyle = color;
        pipin.canvas.beginPath();
        pipin.canvas.arc(x,y,r,0,2*Math.PI);
        pipin.canvas.fill();
        pipin.canvas.restore();
    });


})();


(function(){

	var Game = new Class(function(engine, load, draw, update){
		;"Game";
		this.Engine = engine;
		this.Load = load;
		this.Draw = draw;
		this.Update = update;
	});

	var
		Run = function(timestamp){
			var en = this.Engine;
			if (en.LoadStack <= 0)
			{
				en.canvas.clearRect(0, 0, en.Viewport.width, en.Viewport.height);
				this.Draw();
				this.Update();
				if (Pipin.Animation)
				{
					Pipin.Animation.Run();
				}
			}
            try
            {
                en.Loop(timestamp);
            }
            catch (e)
            {
                alert(e);
            }

		};

	Game.Properties({
		Run:Run
	});

	Pipin["Game"] = Game;

})();



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




(function(){
	var Loader = new Class(function(loadStack, loadVersion, loadLogoPath)
	{
		this.LoadStack = loadStack;
		this.loadVersion = loadVersion;
		this.loadLogoPath = loadLogoPath;
	});

	Loader.Prop("Load", function()
	{
		var that = this;
		var loadLength = that.LoadStack.length;
		that.SetUpProgress(loadLength);
		for (var i = 0; i < loadLength; i++)
		{
			$("#loadDump").append("Loaded " + that.LoadStack[i][0] + " Assets...<br />");
			that.LoadStack[i][1]();
			$("#loadProg").animate({
				value: i + 1
			}, 10, function(){
				if (parseFloat($(this).attr("value")) == loadLength)
				{
					$("#loadCont").animate({
						opacity: 0
					}, 400, function(){
						$(this).hide();
						$("#gameCanvas").show();
					});

				}
			});
		}
	});

	Loader.Prop("SetUpProgress", function(max){
		var that = this;
	    var el = "<div id = 'loadCont' class = 'center-block'>" +
	        "<img id = 'logoImage' src = '" + that.loadLogoPath + "' />" +
	        "<progress value = '0' max = '" + max + "' id = 'loadProg'>" +
	        "</progress>" +
	        "<p id = 'loadTitle'>Loading...</p>" +
	        "<p id = 'loadVersion'>v" + that.loadVersion + " Development</p>" +
	        "<p id = 'loadDump'></p>" +
	        "</div>";
	    $("#gameCanvas").hide();
	    $("#gameContainer").append(el);
	});

	Pipin["Loader"] = Loader;

})();



Pipin.Animation = {
	animations: [],

	Run: function(){
		for (var i = 0; i < Pipin.Animation.animations.length; i++)
		{
			var anim = Pipin.Animation.animations[i];
			if(anim.hasRun && anim.KillOnFirstRun)
			{
				var cleanedAnims = [];
				for (var j = 0; j < Pipin.Animation.animations.length; j++)
				{
					if (j != i)
					{
						cleanedAnims.push(Pipin.Animation.animations[j]);
					}
				}
				 Pipin.Animation.animations = cleanedAnims;
			}
			else
			{
				anim.Run();
			}

		}
	}
};

(function(){

	var Animation = new Class(function()
	{
		;"Animation";
	});

	Animation.Prop("Run", function()
	{
		var that = this;
		if (that.animating)
		{
			that.Update();
			//that.boundObject.DrawTexture = that.GetCurrentFrame();
		}
		if (that.hasRun && that.KillOnFirstRun)
		{
			that.Stop();
			var cleanedAnims = [];
			for (var i = 0; i < Pipin.Animation.animations.length; i++)
			{
				if (i == that.animationPosition)
				{

				}
				else
				{
					cleanedAnims.push(Pipin.Animation.animations[i]);
				}
			}
			Pipin.Animation.animations = cleanedAnims;
		}
	});

	Animation.Prop("GetCurrentFrame", function()
	{
		var that = this;
		return that.currentFrameTexture;
	});

	Animation.Prop("Start", function()
	{
		var that = this;
		that.animating = true;
	});

	Animation.Prop("Stop", function()
	{
		var that = this;
		that.animating = false;
	});

	Animation.Prop("Single", function()
	{
		var that = this;
		this.KillOnFirstRun = true;
		this.animating = true;
	});

	Animation.Prop("Reset", function()
	{
		var that = this;
		that.elapsedTime = 0;
		that.textureListIndex = 0;
		this.hasRun = false;
	});

	Pipin.Animation["Animation"] = Animation;

})();

(function(){

	var TextureListAnimation = new Class(function(time, textureList, boundObject)
	{
		;"TextureListAnimation";
		this.animating = false;
		this.hasRun = false;
		this.time = time;
		this.elapsedTime = 0;
		this.currentFrameTexture = textureList[0];
		this.textureList = textureList;
		this.textureListIndex = 0;
		this.maxTextureListIndex = textureList.length - 1;
		this.step = time / textureList.length;
		this.boundObject = boundObject;

		//check the object to make sure it has a DrawTexture to be animating
		if (!boundObject.DrawTexture)
		{
			throw "Pipin.Animation Error: parameter 'boundObject' must have the property 'DrawTexture'";
		}

		Pipin.Animation.animations.push(this);


	});

	TextureListAnimation.Inherits(Pipin.Animation.Animation);

	TextureListAnimation.Prop("Update", function()
	{
		var that = this;
		that.elapsedTime += pipin.deltaTime;
		if (that.elapsedTime >= that.step)
		{
			that.textureListIndex++;
		}

		that.currentFrameTexture = that.textureList[that.textureListIndex];

		if (that.textureListIndex >= that.maxTextureListIndex)
		{
			that.elapsedTime = 0;
			that.textureListIndex = 0;
			this.hasRun = true;
		}
	});

	Pipin.Animation["TextureListAnimation"] = TextureListAnimation;

})();

(function()
{

	var LinearObjectAnimation = new Class(function(objectToAnimate, propertiesToAnimateTo, time, finishFunction, round)
	{
		this.animating = false;
		this.hasRun = false;
		this.time = time;
		this.elapsedTime = 0;

		this.objectToAnimate = objectToAnimate;
		this.propertiesToAnimateTo = propertiesToAnimateTo;
		this.finishFunction = finishFunction ? finishFunction: function(){};
		this.round = round ? round : false;


		this.Steps = (function(){

			var _steps = {};
			for (key in propertiesToAnimateTo)
			{
				var diff =  propertiesToAnimateTo[key] - objectToAnimate[key];
				if (diff == 0)
				{
					_steps[key] = 0;
				}
				else
				{
					_steps[key] = (propertiesToAnimateTo[key] - objectToAnimate[key]) / (time / pipin.deltaTime);
				}

			}
			return _steps;
		})();

		Pipin.Animation.animations.push(this);
		this.animationPosition = Pipin.Animation.animations.length - 1;

	});

	LinearObjectAnimation.Inherits(Pipin.Animation.Animation);

	LinearObjectAnimation.Prop("Update", function()
	{
		var that = this;
		that.elapsedTime += pipin.deltaTime;
		for (key in that.Steps)
		{
			var step = (that.propertiesToAnimateTo[key] - that.objectToAnimate[key]) / ((that.time - that.elapsedTime) / pipin.deltaTime);
			that.objectToAnimate[key] += step;//that.Steps[key];
			if (that.round)
			{
				that.objectToAnimate[key] = Math.round(that.objectToAnimate[key]);
			}
		}
		for (key in that.propertiesToAnimateTo)
		{
			if (Math.abs(that.propertiesToAnimateTo[key] - that.objectToAnimate[key]) <= 0.1)
			{
				that.elapsedTime = 0;
				that.hasRun = true;
				that.finishFunction(that.objectToAnimate);
			}
		}

	});

	Pipin.Animation["LinearObjectAnimation"] = LinearObjectAnimation;


})();



Pipin.Models = {};
(function(){

    var Model = new Class(function()
    {
        ;"Model";
    });

    var LinearModel = new Class(function()
    {
        ;"LinearModel";
    });

    LinearModel.Inherits(Model);

})();





Pipin.Version = "0.1.1"