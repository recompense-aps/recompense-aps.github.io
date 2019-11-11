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
