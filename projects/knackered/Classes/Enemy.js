(function()
{

    var Enemy = new Class(function(rectangle)
    {
        this.Rectangle = rectangle;
        this.DrawTexture = Enemy.Assets.dark_draw_texture;
        this.DrawParams = {rotation:0};
    });

    Enemy.Prop("MOVE_SPEED", 0.01);
    Enemy.Prop("Health", 2);
    Enemy.Prop("Points", 10);
    Enemy.Prop("counter", 0);
    Enemy.Prop("enimies", []);

    Enemy.Prop("draw", true);

    Enemy.Prop("Hit", function()
    {
        var that = this;

        that.Health--;
        if (that.Health <= 0)
        {
            that.draw = false;
            Player.Points += that.Points;
            var a = new Audio();
            a.src = "../Game/Sound/enemy_explode.wav";
            a.play();
        }
    });


    Enemy.Prop("Load", function()
    {
        var that = this;
        var Assets = {};
        Assets.dark_draw_texture = pipin.LoadTexture("../Game/Art/enemyUFO.png");
        Assets.raider = pipin.LoadTexture("../Game/Art/enemyShip.png");
        Assets.raider_ignore_asteroids = pipin.LoadTexture("../Game/Art/enemyShip_ignore_asteroids.png");
        Enemy.Assets = Assets;
    });

    Enemy.Prop("Draw", function()
    {
        var that = this;
        if (that.draw) pipin.Draw(that.DrawTexture, that.Rectangle, that.DrawParams);
    });

    Enemy.Prop("Update", function()
    {
        var that = this;
        that.Rectangle.y += that.MOVE_SPEED * pipin.deltaTime;
    });

    window["Enemy"] = Enemy;

})();
