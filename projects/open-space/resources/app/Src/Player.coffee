exports = this
class exports.Player extends Torch.Sprite
    velocity: 0.4
    bulletFireDelay: 100
    bulletFiredAt: 0
    hp: 100
    PLAYER: true

    _recoverTime: 2000
    _recovering: false
    blinkEffect: null
    constructor: (game) ->
        super( game, 0, 0 )
        @Bind.Texture("player")
        @Effects.Trail()
        @Center()

        @position.y = @game.Camera.Viewport.height - @rectangle.height * 2
        @drawIndex = 5

        @SetUpCollisions()
        @shield = new Shield(@)
        @bulletVector = new Torch.Vector(0,-1)

        @shootPoint = new Torch.Shapes.Circle(@game, 0, 0, 5, "green", "green")
        @shootPoint.drawIndex = 1000

        @On "Damaged", (event) =>
            @hp -= event.damage

            @game.hud.playerHealth.Deplete( event.damage )

        @game.On "Lose", =>
            @Trash() # maybe add an effetc here?

    @Load: (game) ->
        game.Load.Texture("Assets/Art/PNG/playerShip1_blue.png", "player")
        game.Load.Texture("Assets/Art/PNG/Effects/shield3.png", "shield")

    Update: ->
        super()

        if @hp <= 0
            @game.State.Switch("lose")

        v = @position.Clone()
        v.x += @rectangle.width / 2
        v.y += @rectangle.height /2

        m = new Torch.Vector( @game.Mouse.x, @game.Mouse.y )

        v.SubtractVector( m )
        v.Normalize()
        @rotation = -v.angle

        v.MultiplyScalar(-1)
        @bulletVector = v

        if @game.Mouse.down and ( @game.time - @bulletFiredAt ) >= @bulletFireDelay
            @bulletFiredAt = @game.time
            @FireBullet()

        keys = @game.Keys

        if keys.P.down
            @shield.Activate()
        else
            @shield.Activate(false)

        @Body.velocity.Set(0,0)
        if keys.A.down
            @Body.velocity.Set(-@velocity,0)
        if keys.D.down
            @Body.velocity.Set(@velocity,0)
        if keys.S.down
            @Body.velocity.Set(0,@velocity)
        if keys.W.down
            @Body.velocity.Set(0,-@velocity)

    FireBullet: ->
        return if @game.hud.battery.charge <= 0
        rot = @rotation - Math.PI/2
        cordX = Math.cos( rot )
        cordY = Math.sin( rot )

        @game.hud.battery.Deplete(1)

        x = @position.x + ( (@rectangle.width / 2) * cordX ) + @rectangle.width/2
        y = @position.y + ( (@rectangle.height / 2) * cordY ) + @rectangle.height/2

        @shootPoint.position.Set( x - 2.5, y - 2.5 )

        p1 = new Projectile @,
            direction: @bulletVector
            x: x
            y: y

        p1.position.x -= p1.rectangle.width/2
        p1.position.y -= p1.rectangle.height/2

    SetUpCollisions: ->
        @Collisions.Monitor()
        @On "Collision", (event) =>
            @HandleCollision(event)

    HandleCollision: (event) ->
        obj = event.collisionData.collider

        if obj.ENEMY and not @_recovering
            @HandleEnemyCollision(obj)

        if obj.POWERUP
            @HandlePowerupCollision(obj)

    HandleEnemyCollision: (enemy) ->
        @Emit( "Damaged", damage:enemy.damage )
        enemy.Kill()
        @blinkEffect = @Effects.Blink(100)
        @_recovering = true

        @game.Timer.SetFutureEvent @_recoverTime, =>
            @blinkEffect.Trash()
            @_recovering = false
            @opacity = 1

    HandlePowerupCollision: (powerup) ->
        powerup.ApplyEffect(@)

class Shield extends Torch.Sprite
    SHIELD: true
    active: false
    constructor: (@player) ->
        super( @player.game, @player.position.x, @player.position.y )
        @Bind.Texture("shield")
        @Size.Scale(1,1)
        @draw = false

        # make it blink a little
        @game.Tweens.Tween( @, 1000, Torch.Easing.Smooth ).To( opacity: 0.4 ).Cycle()

    Update: ->
        super()
        @position.x = @player.position.x - @rectangle.width / 5.5
        @position.y = @player.position.y - @rectangle.height / 5

    Activate: (turnOn = true) ->
        @active = turnOn

        @draw = turnOn
