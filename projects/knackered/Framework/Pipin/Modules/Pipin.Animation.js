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
