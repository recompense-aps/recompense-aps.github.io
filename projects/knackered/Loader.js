var Loader = new Pipin.Loader([
    ["logo", function(){}],
    ["Player", Player.Static.Load],
    ["Bullet", Bullet.Static.Load],
    ["Environment", Environment.Static.Load],
    ["Asteroid", Asteroid.Static.Load],
    ["Enemy", Enemy.Static.Load]
],"0.0.1", "logo.png");
