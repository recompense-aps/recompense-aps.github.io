(function()
{
    var Bullet = new Class(function(rectangle, collector, direction, environment, moveVector, angle, bulletType)
    {
        ;"Bullet";
        this.Rectangle = rectangle;
        this.direction = direction;
        this.environment = environment;
        this.moveVector = moveVector;
        this.DrawParams = {rotation: angle};

        switch(bulletType)
        {
            case "red":
            this.DrawTexture = Bullet.Assets.bullet_red;
            break;
            case "green":
            this.DrawTexture = Bullet.Assets.bullet_green;
            break;
        }
        this.bulletType = bulletType;
        collector.push(this);
    });

    Bullet.Prop("MOVE_SPEED", 1.5);
    Bullet.Prop("dieTimer", 0);
    Bullet.Prop("draw", true);


    Bullet.Prop("Shooting", true);

    Bullet.Prop("Rectangle", null);
    Bullet.Prop("DrawTexture", null);

    Bullet.Prop("UpdateMove", function()
    {
        var that = this;
        if (that.direction == "up" && that.Shooting)
        {
            that.Rectangle.y += that.MOVE_SPEED * pipin.deltaTime * that.moveVector.y;
            that.Rectangle.x += that.MOVE_SPEED * pipin.deltaTime * that.moveVector.x;
        }
    });

    Bullet.Prop("Load", function()
    {
        var that = this;
        Bullet.Assets = {};
        Bullet.Assets.bullet_red = pipin.LoadTexture("../Game/Art/laserRed.png");
        Bullet.Assets.bullet_green = pipin.LoadTexture("../Game/Art/laserGreen.png");
        Bullet.Assets.bullet_red_hit = pipin.LoadTexture("../Game/Art/laserRedShot.png");
        Bullet.Assets.bullet_green_hit = pipin.LoadTexture("../Game/Art/laserGreenShot.png");

    });

    Bullet.Prop("Draw", function()
    {
        var that = this;
        if (that.draw)
        {
            pipin.Draw(that.DrawTexture, that.Rectangle, that.DrawParams);
        }

    });

    Bullet.Prop("Update", function()
    {
        var that = this;
        if (!that.Shooting)
        {
            that.dieTimer += pipin.deltaTime;
            if (that.dieTimer >= 100)
            {
                that.draw = false;
            }
        }
        that.UpdateMove();
        // for (var i = 0; i < that.environment.asteroids.length; i++)
        // {
        //     if (that.Rectangle.Intersects(that.environment.asteroids[i].Rectangle) && that.environment.asteroids[i].Rectangle.y > 10)
        //     {
        //
        //         that.Shooting = false;
        //     }
        // }
        var b = that;
        var enemies = that.bulletType == "green" ? that.environment.enemies : [player];
        for (var j = 0; j < enemies.length; j++)
        {

            if (b.Rectangle.Intersects(enemies[j].Rectangle) && enemies[j].Rectangle.y > 10 && enemies[j].draw && b.draw && b.Shooting)
            {
                enemies[j].Hit();
                b.Shooting = false;
                b.DrawTexture = b.bulletType == "red" ? Bullet.Assets.bullet_red_hit : Bullet.Assets.bullet_green_hit;
                b.Rectangle.width = 56;
                b.Rectangle.height = 54;
            }
        }
        for (var j = 0; j < that.environment.asteroids.length; j++)
        {
            if (b.Rectangle.Intersects(b.environment.asteroids[j].Rectangle) && b.environment.asteroids[j].Rectangle.y > 10 && b.environment.asteroids[j].draw && b.draw && b.Shooting)
            {
                b.Shooting = false;
                b.DrawTexture = b.bulletType == "red" ? Bullet.Assets.bullet_red_hit : Bullet.Assets.bullet_green_hit;
                b.Rectangle.width = 56;
                b.Rectangle.height = 54;
            }
        }
    });

    window["Bullet"] = Bullet;

})();
