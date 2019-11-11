(function()
{

    var Environment = new Class(function()
    {
        ;"Environment";
        this.background_texture = Environment.Assets.background;
        this.backgroundRec1 = new Pipin.Rectangle(0,0,1280,720);
        this.backgroundRec2 = new Pipin.Rectangle(0,-710,1280,720);
        this.GenerateAsteroids();
        //this.GenerateEnemies();
    });

    Environment.Prop("SCROLL_SPEED", 0.1);

    Environment.Prop("asteroids", []);
    Environment.Prop("enemies", []);
    Environment.Prop("ExistingEnemyRectangles", []);
    Environment.Prop("lowestAsteroid", null);

    Environment.Prop("ShakeScreen", function()
    {
        var that = this;

    });

    Environment.Prop("GenerateAsteroids", function()
    {
        var that = this;
        that.asteroids = [];
        that.ExistingEnemyRectangles = [];
        var lowestAsteroid = {y:100};
        for (var i = 0; i < 100; i++)
        {
            var rec;
            var recExists = true;
            do
            {
                var rand = Math.random() * 100;
                var x = Math.random() * 1100;
                var y = Math.random() * -4000;
                rec = new Pipin.Rectangle(x, y, 91, 91);
                recExists = false;
                for (var i = 0; i < that.ExistingEnemyRectangles.length; i++)
                {
                    if (that.ExistingEnemyRectangles[i].Intersects(rec))
                    {
                        recExists = true;
                        break;
                    }
                }
            }
            while (recExists)

            that.ExistingEnemyRectangles.push(rec);
            var aster = new Asteroid(rec, "main");
            that.asteroids.push(aster);

            if (rec.y < lowestAsteroid.y)
            {
                lowestAsteroid = aster;
            }

        }

        that.lowestAsteroid = lowestAsteroid;

    });

    Environment.Prop("RegenerateAsteroids", function()
    {
        var that = this;
        var check = that.asteroids.length - 1;
        var checkCount = 0;
        for (var i = 0; i < that.asteroids.length; i++)
        {
            if (that.asteroids[i].Rectangle.y > 2000)
            {
                checkCount++;
            }
        }
        if (checkCount >= check && check != -1)
        {
            that.asteroids = [];
            that.GenerateEnemies();
            console.log("Generating enemies...");
            console.log(check);
        }

    });

    Environment.Prop("GenerateEnemies", function()
    {
        var that = this;
        var s = new Squadron(that);
        that.enemies = s.enemies;
        that.squadron = s;
        player.boost = false;

        // for (var i = 0; i < 5; i++)
        // {
        //     var rec;
        //     var recExists = true;
        //     do
        //     {
        //         var rand = Math.random() * 100;
        //         var x = Math.random() * 1100;
        //         var y = Math.random() * 150;
        //         rec = new Pipin.Rectangle(x, y, 91, 91);
        //         recExists = false;
        //         for (var i = 0; i < that.ExistingEnemyRectangles.length; i++)
        //         {
        //             if (that.ExistingEnemyRectangles[i].Intersects(rec))
        //             {
        //                 recExists = true;
        //                 break;
        //             }
        //         }
        //     }
        //     while (recExists)
        //
        //     that.ExistingEnemyRectangles.push(rec);
        //
        //
        // }
    });

    Environment.Prop("Load", function()
    {
        var that = this;
        Environment.Assets = {};
        Environment.Assets.background = pipin.LoadTexture("../Game/Art/Background/space.svg");
    });

    Environment.Prop("Draw", function()
    {
        var that = this;
        pipin.Draw(that.background_texture, that.backgroundRec1, {});
        pipin.Draw(that.background_texture, that.backgroundRec2, {});
        for (var i = 0; i < that.asteroids.length; i++)
        {
            that.asteroids[i].Draw();
        }
        for (var i = 0; i < that.enemies.length; i++)
        {
            that.enemies[i].Draw();
        }
    });

    Environment.Prop("Update", function()
    {
        var that = this;
        that.backgroundRec1.y += that.SCROLL_SPEED * pipin.deltaTime * player.SCROLL_SPEED;
        that.backgroundRec2.y += that.SCROLL_SPEED * pipin.deltaTime * player.SCROLL_SPEED;

        if (that.backgroundRec1.y >= 710)
        {
            that.backgroundRec1 = new Pipin.Rectangle(0,0,1280,720);
            that.backgroundRec2 = new Pipin.Rectangle(0,-710,1280,720);
        }
        for (var i = 0; i < that.asteroids.length; i++)
        {
            that.asteroids[i].Update();
        }
        for (var i = 0; i < that.enemies.length; i++)
        {
            that.enemies[i].Update();
        }

        that.RegenerateAsteroids();

        if (that.squadron && that.squadron.AllEnemiesAreDead())
        {
            //that.GenerateEnemies();
            that.GenerateAsteroids();
            that.squadron = null;
            player.boost = true;
        }
        if (that.squadron) that.squadron.Update();
    });

    window["Environment"] = Environment;

})();
