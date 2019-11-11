(function()
{
    var Raider = new Class(function(rectangle, environment)
    {
        ;"Raider";
        this.Rectangle = rectangle;
        this.DrawTexture = Enemy.Assets.raider;
        this.DrawParams = {rotation:0};
        this.Rectangle.width = 98;
        this.Rectangle.height = 55;
        this.shootDelay = 500;
        this.shootPeriod = 300;
        this.environment = environment;
        this.DrawParams = {};

        this.fluxDirection = Math.random() > 0.5 ? "right" : "left";

        this.dFlux = 0;
    });

    Raider.Inherits(Enemy);


    Raider.Override("MOVE_SPEED", 0.05);

    Raider.Prop("shoot", false);
    Raider.Prop("immuneToAsteroids", false);
    Raider.Prop("chasingPlayer", false);

    Raider.Prop("Bullets", []);
    Raider.Prop("chaseVector", {});
    Raider.Prop("CHASE_SPEED", 0.1);

    Raider.Prop("ChasePlayer", function()
    {
        var that = this;
        that.chasingPlayer = true;

    });

    Raider.Prop("UpdateChasePlayer", function()
    {
        var that = this;
        if (that.chasingPlayer)
        {
            var chaseVector = new Pipin.Vector( player.Rectangle.x - that.Rectangle.x, player.Rectangle.y - that.Rectangle.y );

            var angle = Math.atan2(chaseVector.y, chaseVector.x);
            that.DrawParams.rotation = angle - (Math.PI / 2) - 0.1;

            chaseVector.Normalize();

            if (that.Rectangle.GetDistance(player.Rectangle) >  2 * that.Rectangle.width + 20)
            {
                that.Rectangle.x += chaseVector.x * pipin.deltaTime * that.CHASE_SPEED;
                that.Rectangle.y += chaseVector.y * pipin.deltaTime * that.CHASE_SPEED;
            }

        }
    });

    Raider.Prop("UpdateFlux", function()
    {
        var that = this;
        var FLUX = 0.01;
        var FLUX_SWITCH = 20;
        if (that.chasingPlayer)
        {
            FLUX_SWITCH = 40;
        }
        if (that.fluxDirection == "left")
        {
            var d = FLUX * pipin.deltaTime;
            that.Rectangle.x -= d;
            that.dFlux += d;
            if (that.dFlux >= FLUX_SWITCH)
            {
                that.fluxDirection = "right";
                that.dFlux = 0;
            }
        }
        if (that.fluxDirection == "right")
        {
            var d = FLUX * pipin.deltaTime;
            that.Rectangle.x += d;
            that.dFlux += d;
            if (that.dFlux >= FLUX_SWITCH)
            {
                that.fluxDirection = "left";
                that.dFlux = 0;
            }
        }

    });

    Raider.Prop("DrawBullets", function()
    {
        var that = this;
        for (var i = 0; i < that.Bullets.length; i++)
        {
            that.Bullets[i].Draw();
        }
    });

    Raider.Prop("UpdateMove", function()
    {
        var that = this;
    });

    Raider.Prop("UpdateShoot", function()
    {
        var that = this;
        if (that.shoot)
        {
            that.counter += pipin.deltaTime;
        }

        if (that.counter >= that.shootPeriod + that.shootDelay && that.Rectangle.y > 0 && that.draw && that.shoot)
        {
            that.shootDelay = 0;
            that.counter = 0;
            var rect = Object.Clone(that.Rectangle);

            rect.width = 9;
            rect.height = 31;
            var transX = Math.cos(that.DrawParams.rotation) * that.Rectangle.width;
            var transY = Math.sin(that.DrawParams.rotation) * that.Rectangle.height;
            rect.x += that.Rectangle.width / 2;
            rect.y += that.Rectangle.height / 2;

            var moveVector = new Pipin.Vector( player.Rectangle.x - that.Rectangle.x, player.Rectangle.y - that.Rectangle.y)
            moveVector.Normalize();
            moveVector.x /= 10;
            moveVector.y /= 10;

            var bullet = new Bullet(rect, that.Bullets, "up", that.environment, moveVector, that.DrawParams.rotation, "red");

            var snd = pipin.LoadSound("../Game/Sound/shoot.wav");
            snd.play();
            this.enemies = [player];
        }
    });

    Raider.Prop("UpdateBullets", function()
    {
        var that = this;
        for (var i = 0; i < that.Bullets.length; i++)
        {
            that.Bullets[i].Update();
        }
    });

    Raider.Prop("UpdateCheckAsteroids", function()
    {
        var that = this;
        var l = that.environment.asteroids.length;
        for (var i = 0; i < l; i++)
        {
            var aster = that.environment.asteroids[i];
            if (that.Rectangle.Intersects(aster.Rectangle) && that.draw && !that.immuneToAsteroids)
            {
                that.Hit();
                break;
            }
        }
    });

    Raider.Prop("UpdateDodgeAsteroids", function()
    {
        var that = this;
        var l = that.environment.asteroids.length;
        for (var i = 0; i < l; i++)
        {
            var aster = that.environment.asteroids[i];
            var dist = Math.sqrt( Math.pow( (aster.Rectangle.x - that.Rectangle.x), 2 ) + Math.pow( (aster.Rectangle.y - that.Rectangle.y), 2 ) );

            if (dist <= 20)
            {
                that.Rectangle.x += 50;
                console.log(dist);
            }
        }
    });

    Raider.Override("Draw", function()
    {
        var that = this;
        if (that.draw) pipin.Draw(that.DrawTexture, that.Rectangle, that.DrawParams);
        that.DrawBullets();
    });

    Raider.Override("Update", function()
    {
        var that = this;
        //that.Rectangle.y += that.MOVE_SPEED * pipin.deltaTime + player.SCROLL_SPEED;
        that.UpdateBullets();
        that.UpdateShoot();
        that.UpdateCheckAsteroids();
        that.UpdateDodgeAsteroids();
        that.UpdateChasePlayer();
        that.UpdateFlux();
    });



    window["Raider"] = Raider;
})();
