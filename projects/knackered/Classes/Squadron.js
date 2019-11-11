(function()
{

    var Squadron = new Class(function(environment)
    {
        ;"Squadron";
        this.environment = environment;
        this.enemies = this.GenerateEnemies();
    });

    Squadron.Prop("Stage", "start");
    Squadron.Prop("AttackingRaider", null);

    Squadron.Prop("StageStart", function()
    {
        var that = this;
        var allReady = that.enemies.length - 1;
        var allReadyCount = 0;
        that.enemies.forEach(function(enemy){

            if (enemy.Rectangle.y < 100)
            {
                enemy.Rectangle.y += 0.3 * pipin.deltaTime;
            }
            else
            {
                allReadyCount++;
            }
        });
        if (allReadyCount == allReady)
        {
            that.Stage = "attackStart";
        }
    });

    Squadron.Prop("StageAttackStart", function()
    {
        var that = this;

        var eligibleEnemies = (function(){
            var _enemies = [];
            that.enemies.forEach(function(enemy)
            {
                if (enemy.draw)
                {
                    _enemies.push(enemy);
                }
            });
            return _enemies;
        })();

        var randIndex = Math.round( Math.random() * ( eligibleEnemies.length) );
        if (randIndex >= eligibleEnemies.length)
        {
            randIndex = eligibleEnemies.length - 1;
        }


        if (that.enemies[randIndex])
        {
            that.AttackingRaider = that.enemies[randIndex];
            that.AttackingRaider.shoot = true;
            that.AttackingRaider.immuneToAsteroids = true;
            that.AttackingRaider.DrawTexture = Enemy.Assets.raider_ignore_asteroids;
        }


        that.Stage = "attackReady";
    });

    Squadron.Prop("SetStage", function()
    {
        var that = this;
        switch (that.Stage)
        {
            case "start":
                that.StageStart();
            break;

            case "attackStart":
                that.StageAttackStart();
            break;

            case "attackReady":
                that.AttackingRaider.ChasePlayer();
                if (!that.AttackingRaider.draw)
                {
                    that.Stage = "attackStart";
                }
            break;
        }

    });

    Squadron.Prop("GenerateEnemies", function()
    {
        var that = this;
        var ens = [];
        var dx = 1280 / 150;
        dx = Math.floor(dx);
        for (var i = 0; i < dx; i++)
        {
            var rec = new Pipin.Rectangle(150 * i, -50 * i, 98, 55);
            var en = new Raider(rec, that.environment);
            en.Health += 0.5;
            ens.push(en);
        }
        return ens;
    });

    Squadron.Prop("AllEnemiesAreDead", function()
    {
        var that = this;
        for (var i = 0; i < that.enemies.length; i++)
        {
            if (that.enemies[i].draw)
            {
                return false;
            }
        }
        return true;
    });

    Squadron.Prop("Update", function()
    {
        var that = this;
        that.SetStage();
    });

    window["Squadron"] = Squadron;

})();
