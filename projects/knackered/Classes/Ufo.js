(function()
{
    var Ufo = new Class(function(rectangle)
    {
        ;"Ufo";
        this.Rectangle = rectangle;
        this.DrawTexture = Enemy.Assets.dark_draw_texture;
        this.DrawParams = {rotation:0};
    });

    Ufo.Inherits(Enemy);

    Ufo.Override("Update", function()
    {
        var that = this;
        that.DrawParams.rotation += 0.0009 * pipin.deltaTime;
        that.Rectangle.y += that.MOVE_SPEED * pipin.deltaTime;
    });

    window["Ufo"] = Ufo;
})();
