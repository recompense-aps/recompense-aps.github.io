(function()
{

    var Player = new Class(function(environment)
    {
        ;"Player";
        this.Rectangle = new Pipin.Rectangle(100,600, 90, 77);
        this.DrawTexture = Player.Assets.def_draw_texture;
        this.environment = environment;
        this.shootSound = Player.Assets.shoot_sound;
        this.DrawParams = {rotation:0};
    });

    Player.Prop("MOVE_SPEED", 0.4);
    Player.Prop("SCROLL_SPEED", 2);
    Player.Prop("SPEED_SCROLL", 6);
    Player.Prop("score", 0);
    Player.Prop("Health", 10);

    Player.Prop("mouseTrigger", false);
    Player.Prop("boost", true);
    Player.Prop("draw", true);

    Player.Prop("Bullets", []);

    Player.Prop("DrawHUD", function()
    {
        var that = this;

        var c = pipin.canvas;
        c.save();
        c.font = "16px arcade";
        c.fillStyle = "red";
        c.fillText("Score: " + Player.Points, 50,50);
        c.fillStyle = "green";
        c.fillText("Health: " + that.Health, 50,70);
        c.restore();
    });

    Player.Prop("DrawSpeedLines", function()
    {
        var that = this;
        if (that.SCROLL_SPEED == 6)
        {
            var sp1 = new Pipin.Rectangle(that.Rectangle.x +  that.Rectangle.width + 50, 500, 7, 186);
            var sp2 = new Pipin.Rectangle(that.Rectangle.x -50, 500, 7, 186);
            var sp3 = new Pipin.Rectangle(that.Rectangle.x + (that.Rectangle.width / 2), 400, 7, 186);
            pipin.Draw(Player.Assets.speed_line, sp1, {});
            pipin.Draw(Player.Assets.speed_line, sp2, {});
            pipin.Draw(Player.Assets.speed_line, sp3, {});

        }
    });

    Player.Prop("DrawBullets", function()
    {
        var that = this;
        for (var i = 0; i < that.Bullets.length; i++)
        {
            that.Bullets[i].Draw();
        }
    });

    Player.Prop("Hit", function()
    {
        var that = this;
        var a = new Audio();
        a.src = "../Game/Sound/enemy_explode.wav";
        a.play();
        that.Health--;
    });

    Player.Prop("UpdateBullets", function()
    {
        var that = this;
        for (var i = 0; i < that.Bullets.length; i++)
        {
            that.Bullets[i].Update();
        }

    });

    Player.Prop("UpdateMove_Mobile", function()
    {
        var that = this;
        if (pipin.Mouse.down)
        {
            if (pipin.Mouse.x >= (pipin.Viewport.width - 100) && pipin.Mouse.y >= (pipin.Viewport.height - 100))
            {
                //shoot
            }
            else if (pipin.Mouse.x >= pipin.Viewport.width / 2 && !that.moveLock)
            {
                that.Rectangle.x += that.MOVE_SPEED * pipin.deltaTime;
            }
            else
            {
                that.Rectangle.x -= that.MOVE_SPEED * pipin.deltaTime;
            }
        }
    });

    Player.Prop("UpdateRotateToMouse", function()
    {
        var that = this;
        if (that.SCROLL_SPEED == 6){
            that.DrawParams.rotation = 0;
            return;
        }
        var x = that.Rectangle.x - pipin.Mouse.x;
        var y = that.Rectangle.y - pipin.Mouse.y;
        var angle = Math.atan2(y, x);
        //angle = angle * (180/Math.PI);
        that.DrawParams.rotation = angle - (Math.PI / 2) - 0.1;
    });

    Player.Prop("UpdateMove", function()
    {
        var that = this;
        if (pipin.Keys.A.down)
        {
            that.Rectangle.x -= pipin.deltaTime * that.MOVE_SPEED;
            that.DrawTexture = Player.Assets.left_draw_texture;
        }
        else if (pipin.Keys.D.down)
        {
            that.Rectangle.x += pipin.deltaTime * that.MOVE_SPEED;
            that.DrawTexture = Player.Assets.right_draw_texture;
        }
        else
        {
            that.DrawTexture = Player.Assets.def_draw_texture;
        }
        if (that.boost)
        {
            that.SCROLL_SPEED = 6;
            if (that.Rectangle.y >= 580)
            {
                that.Rectangle.y -= that.SPEED_SCROLL;
            }
        }
        else
        {
            that.SCROLL_SPEED = 2;
            if (that.Rectangle.y < 600)
            {
                that.Rectangle.y += that.SPEED_SCROLL;
            }
        }
    });

    Player.Prop("UpdateShoot", function()
    {
        var that = this;
        if (!pipin.Mouse.down && that.mouseTrigger)
        {
            that.mouseTrigger = false;
            var rectL = Object.Clone(that.Rectangle);
            var rectR = Object.Clone(that.Rectangle);
            var transX = Math.cos(that.DrawParams.rotation);
            var transY = Math.sin(that.DrawParams.rotation);
            rectL.x = rectR.x + transX;//- (that.Rectangle.width / 5);
            rectR.x = rectR.x + (that.Rectangle.width - 10) + transY;
            rectL.width = rectR.width = 9;
            rectL.height = rectR.height = 31;


            var moveVectorL = new Pipin.Vector(pipin.Mouse.x - rectL.x,  pipin.Mouse.y - rectL.y);
            moveVectorL.Normalize();

            var moveVectorR = new Pipin.Vector(pipin.Mouse.x - rectR.x, pipin.Mouse.y - rectR.y);
            moveVectorR.Normalize();

            var bulletL = new Bullet(rectL, that.Bullets, "up", that.environment, moveVectorL, that.DrawParams.rotation, "green");
            var bulletR = new Bullet(rectR, that.Bullets, "up", that.environment, moveVectorR, that.DrawParams.rotation, "green");
            pipin.LoadSound("../Game/Sound/shoot.wav").play();
        }
        if (!that.mouseTrigger && pipin.Mouse.down)
        {
            that.mouseTrigger = true;
        }
    });

    Player.Prop("Load", function()
    {
        var that = this;
        Player.Assets = {};
        Player.Assets.def_draw_texture = pipin.LoadTexture("../Game/Art/player.png");
        Player.Assets.right_draw_texture = pipin.LoadTexture("../Game/Art/playerRight.png");
        Player.Assets.left_draw_texture = pipin.LoadTexture("../Game/Art/playerLeft.png");
        Player.Assets.speed_line = pipin.LoadTexture("../Game/Art/Background/speedLine.png");
        Player.Assets.shoot_sound = pipin.LoadSound("../Game/Sound/shoot.wav");
    });

    Player.Prop("Draw", function()
    {
        var that = this;
        pipin.Draw(that.DrawTexture, that.Rectangle, that.DrawParams);
        that.DrawBullets();
        that.DrawHUD();
        that.DrawSpeedLines();
    });

    Player.Prop("Update", function()
    {
        var that = this;
        that.UpdateMove();
        that.UpdateShoot();
        that.UpdateBullets();
        that.UpdateRotateToMouse();
    });

    window["Player"] = Player;

})();

Player.Points = 0;
