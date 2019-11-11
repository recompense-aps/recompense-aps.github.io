$(document).ready(function()
{
    var pipin = new Pipin("gameCanvas");
    window["pipin"] = pipin;
    var player;
    var env;

    var Load = function()
    {
        Loader.Load();
        env = new Environment();
        player = new Player(env);

        var background = pipin.LoadSound("../Game/Sound/background.mp3");
        //background.play();
        background.loop = true;

    };

    var Draw = function()
    {
        env.Draw();
        player.Draw();
    };

    var Update = function()
    {
        env.Update();
        player.Update();
    };

    var game = new Pipin.Game(pipin, Load, Draw, Update);
    pipin.LoadGame(game);

    pipin.Run();



    window["player"] = player;
});
