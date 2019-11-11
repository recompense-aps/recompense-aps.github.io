(function()
{
    var Asteroid = new Class(function(rectangle, asteroidType)
    {
        ;"Asteroid";
        this.Rectangle = rectangle;
        var tex;
        var rand = Math.random();
        if (rand > 0.5)
        {
            tex = Asteroid.Assets.asteroidBig;
            this.Rectangle.width = 136;
            this.Rectangle.height = 111;
        }
        else
        {
            tex = Asteroid.Assets.asteroidSmall;
            this.Rectangle.width = 44;
            this.Rectangle.height = 42;
        }
        this.DrawTexture = tex;
    });

    Asteroid.Prop("ASTEROID_SPEED", 0.01);
    Asteroid.Prop("draw", true);

    Asteroid.Prop("Load", function()
    {
        var Assets = {};
        //Assets.asteroid_brown_1 = pipin.LoadTexture("../Game/Art/asteroid1_brown.svg");
        //Assets.asteroid_brown_2 = pipin.LoadTexture("../Game/Art/asteroid2_brown.svg");
        //Assets.asteroid_grey_1 = pipin.LoadTexture("../Game/Art/asteroid1_grey.svg");
        //Assets.asteroid_grey_2 = pipin.LoadTexture("../Game/Art/asteroid2_grey.svg");
        Assets.asteroidBig = pipin.LoadTexture("../Game/Art/meteorBig.png");
        Assets.asteroidSmall = pipin.LoadTexture("../Game/Art/meteorSmall.png");
        Asteroid.Assets = Assets;
    });

    Asteroid.Prop("Draw", function()
    {
        var that = this;
        pipin.Draw(that.DrawTexture, that.Rectangle, {});
    });

    Asteroid.Prop("Update", function()
    {
        var that = this;
        that.Rectangle.y += that.ASTEROID_SPEED * pipin.deltaTime + player.SCROLL_SPEED;
    });

    window["Asteroid"] = Asteroid;

})();
