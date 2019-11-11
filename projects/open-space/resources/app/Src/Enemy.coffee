exports = this

class exports.Enemy extends Torch.Sprite
    ENEMY: true
    textureName: "enemy-default"
    powerupGenerator: null
    positionTarget: null
    velocity: 0.2
    startVelocity: 0.5
    attackDistance: 500
    hp: 1
    points: 10
    damage: 10
    constructor: (game, x, y) ->
        super( game, x, y )

        @Bind.Texture(@textureName)
        @Size.Scale(1,1)

        dir = @GetMothershipVector()
        dir.MultiplyScalar( @startVelocity )
        @rotation = -dir.angle

        @Body.velocity.Set( dir.x, dir.y )

        @powerupGenerator = new PowerupGenerator(@)
        @mode = @States.CreateStateMachine("Mode")
        @mode.AddState("enter", new EnterState() )
        @mode.AddState("attack", new AttackState() )
        @mode.Switch("enter")

        @On "Damaged", (event) =>
            @hp -= event.damage

    @Load: (game) ->
        game.Load.Texture("Assets/Art/PNG/Enemies/enemyBlack4.png", "enemy-default")
        game.Load.Texture("Assets/Art/PNG/Enemies/enemyBlack1.png", "enemy-shooter")

    Kill: ->
        @game.effectGenerator.CreateSimpleExplosion( @position.x, @position.y )
        @emitter = @game.Particles.ParticleEmitter 500, 0, 0, true, @textureName,
            spread: 20
            gravity: 0.0001
            minAngle: 0
            maxAngle: Math.PI * 2
            minScale: 0.01
            maxScale: 0.05
            minVelocity: 0.01
            maxVelocity: 0.01
            minAlphaDecay: 400
            maxAlphaDecay: 450
            minOmega: 0.001
            maxOmega: 0.001
        @emitter.auto = false
        @emitter.position = @position.Clone()
        #@emitter.EmitParticles(true)

        @Trash()

        if Math.random() < 0.2
            @powerupGenerator.Generate()

    Update: ->
        super()
        if @hp <= 0
            @Kill()

            @game.score += 10

    StageAttack: ->
        @Effects.Trail()

    GetMothershipVector: ->
        dir = @position.Clone()
        dir.SubtractVector( @game.motherShip.position )
        dir.MultiplyScalar(-1)
        dir.Normalize()

        return dir

    GetDistanceToMotherShipCenter: ->
        dis = @position.Clone()
        ms = @game.motherShip.position.Clone()

        ms.x += @game.motherShip.rectangle.width / 2
        ms.y += @game.motherShip.rectangle.height / 2

        dis.SubtractVector(ms)

        return dis.magnitude

class exports.DiverEnemy extends exports.Enemy
    startVelocity: 0.2
    attackVelocity: 0.4
    attackDistance: 300
    constructor: (game, x, y) ->
        super( game, x, y )

        @Collisions.Monitor()

        @On "Collision", (event) =>
            obj = event.collisionData.collider

            if obj.MOTHERSHIP
                obj.Emit( "Damaged", damage:@damage )
                @Kill()

    StageAttack: ->
        super()
        @Body.velocity.Normalize()
        @Body.velocity.MultiplyScalar( @attackVelocity )

class exports.ShooterEnemy extends exports.Enemy
    points: 20
    hp: 2
    textureName: "enemy-shooter"

    constructor: (game, x, y) ->
        super( game, x, y )

    Update: ->
        super()

        # roatate at the motherShip
        p = @position.Clone()
        p.SubtractVector( @game.motherShip.position )

        angle = p.angle - Math.PI
        @rotation = -angle

    StageAttack: ->
        @orbit = true
        @Effects.Trail()
        @Body.velocity.Set(0,0)
        @Body.Orbit( @game.motherShip, 0.001, 400 )

        scheduledEvent = @game.Timer.SetScheduledEvent 300, =>
            p = @position.Clone()
            p.SubtractVector( @game.motherShip.position )
            p.Normalize()
            p.MultiplyScalar(-1.5)

            rot = @rotation - Math.PI/2
            cordX = Math.cos( rot )
            cordY = Math.sin( rot )

            x = @position.x + ( (@rectangle.width / 2) * cordX ) + @rectangle.width/2
            y = @position.y + ( (@rectangle.height / 2) * cordY ) + @rectangle.height/2

            x -= cordX * @rectangle.width
            y -= cordY * @rectangle.height

            p1 = new ShooterEnemyProjectile @,
                direction: p
                x: x
                y: y

            p1.position.x -= p1.rectangle.width/2
            p1.position.y -= p1.rectangle.height/2

            p1.drawIndex = -1

        @On "Trash", ->
            scheduledEvent.Trash()

class EnterState
    Execute: (enemy) ->
        if enemy.GetDistanceToMotherShipCenter() <= enemy.attackDistance
            @stateMachine.Switch("attack")

    Start: (enemy) ->

    End: (enemy) ->

class AttackState
    Execute: (enemy) ->

    Start: (enemy) ->
        enemy.StageAttack()

    End: (enemy) ->
