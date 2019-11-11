//main file for bounce
//objects-------

function Ball(rectangle, textures){
	this.rectangle = rectangle;
	this.textures = textures;
	this.texture = textures[0];
	this.Update = Update;
	this.velocityX = 0;
	this.velocityY = 0;
	this.mult = 13;
	this.normalX;
	this.normalY;
	this.justHit = false;
	this.rot = 0;
	function Update(){
		Start(this);
		Move(this);
	}
	function Start(o){
		if (mouse.down){
		diffX = mouse.x - o.rectangle.x;
		diffY = mouse.y - o.rectangle.y;
		length = Math.sqrt(diffX * diffX + diffY * diffY);
		o.normalY = diffY / length;
		o.normalX = diffX / length;
		o.velocityX = o.normalX * o.mult;
		o.velocityY = o.normalY * o.mult;
		}
	}
	function Move(o){
		if (mouse.down == false){
			o.rectangle.x += o.velocityX;
			o.rectangle.y += o.velocityY;
			if (o.rectangle.x <= 0 || o.rectangle.x >= (1280 - o.rectangle.width)){o.velocityX *= -1;}
			if (o.rectangle.y <= 0 || o.rectangle.y >= (720 - o.rectangle.height)){o.velocityY *= -1;}
			
		}
	}
}
function Enemy(rectangle, textures, coreTextures, hits){
	this.rectangle = rectangle;
	this.textures = textures;
	this.texture = textures[0];
	this.texIndex = 0;
	this.hits = hits;
	this.coreTextures = coreTextures;
	this.coreCounter = 0;
	this.coreIndex = 0;
	this.draw = true;
	this.rotation = 0;
	this.Update = Update;
	this.velocityX = 3;
	this.velocityY = 0;
	this.mult = 13;
	this.stop = 30 + Math.random() * 300;
	this.normalX;
	this.normalY;
	this.shootDelayCounter = 0;
	function Update(){
		Move(this);
		Rotate(this);
		Shoot(this);
		AssertIndex(this);

	}
	function Move(o){
		if(o.rectangle.y > o.stop){
			o.rectangle.x += o.velocityX;
			o.rectangle.y += o.velocityY;
			if (o.rectangle.x <= 0 || o.rectangle.x >= (1280 - o.rectangle.width)){o.velocityX *= -1; o.rectangle.y += 5;}
			}
			else{
				o.rectangle.y += 2;
				if (o.rectangle.y > -20){
					
				}
			}
			
		
	}
	function Shoot(o){
		o.shootDelayCounter++;
		if (o.shootDelayCounter >= 100 && o.draw){
			o.shootDelayCounter = 0;
			modX = 10 * Math.random();
			modY = 10 * Math.random();
			
			changeX = 1;
			changeY = 1;
			if (modX >= 5){changeX = -1;}
			if (modY >= 5){changeY = -1;}
			
			randX = changeX * (5 * Math.random() + 5);
			randY = changeY * (5 * Math.random() + 5);
			b = new Bolt(new Rectangle(o.rectangle.x, o.rectangle.y, 50, 50), BoltTexture, randX, randY);
			bolts[boltCounter++] = b;
		}
	}
	function Rotate(o){
		o.rotation++;
		if (o.rotation == 360){o.rotation = 0;}
	}
}
function AssertIndex(o){
	if (o.texIndex < 0 || o.texIndex > o.hits){
		o.draw = false;
	}
}
function Destroyer(rectangle, textures, coreTextures, hits){
	this.rectangle = rectangle;
	this.textures = textures;
	this.texture = textures[0];
	this.texIndex = 0;
	this.hits = hits;
	this.coreTextures = coreTextures;
	this.coreCounter = 0;
	this.coreIndex = 0;
	this.draw = true;
	this.rotation = 0;
	this.Update = Update;
	this.velocityX = 3;
	this.velocityY = 0;
	this.mult = 13;
	this.stop = 30 + Math.random() * 300;
	this.normalX;
	this.normalY;
	this.shootDelayCounter = 0;
	this.damage = 20;
	this.tween = 0;
	this.LaserSize = 100;
	this.LaserWidth = 75;
	this.LaserY = rectangle.y;
	this.laser;
	this.shooting = false;
	this.hasHitEarth = false;
	function Update(){
		Move(this);
		Rotate(this);
		Shoot(this);
	}
	function Move(o){
		if(o.rectangle.y > o.stop){
			o.rectangle.x += o.velocityX;
			o.rectangle.y += o.velocityY;
			if (o.rectangle.x <= 0 || o.rectangle.x >= (1280 - o.rectangle.width)){o.velocityX *= -1; o.rectangle.y += 5;}
			}
			else{
				o.rectangle.y += 2;
				if (o.rectangle.y > -20){
					
				}
			}
			
		
	}
	function Shoot(o){
		if (o.rectangle.y > 20){o.shootDelayCounter++;}
		if (o.shootDelayCounter >= 150 && o.draw){
		if (o.shooting == false){o.LaserY = o.rectangle.y;}
			o.shooting = true;
			o.LaserSize += 25;
			if (o.LaserWidth > 1){o.LaserWidth-=3;}
			o.LaserY += 7;
			o.laser = new Laser(new Rectangle(o.rectangle.x + 25, o.LaserY, o.LaserWidth, o.LaserSize), LaserTexture);
		}
		if (o.shootDelayCounter > 300){
			o.shootDelayCounter = 0;
			o.shooting = false;
			o.LaserSize = 100;
			o.LaserWidth = 75;
			o.laserY = o.rectangle.y;
		}
		if (o.draw == false && o.rectangle.y > 30){
			o.LaserWidth -= 50;
		}
	}
	
	function Rotate(o){
		o.rotation++;
		if (o.rotation == 360){o.rotation = 0;}
	}
}
function Bolt(rectangle, texture, vX, vY){
	this.rectangle = rectangle;
	this.texture = texture;
	this.rotation = 0;
	this.Update = Update;
	this.velocityX = vX;
	this.velocityY = vY;
	this.draw = true;
	function Update(){
		Move(this);
		Rotate(this);
	}
	function Move(o){
		o.rectangle.x += o.velocityX;
		o.rectangle.y += o.velocityY;
	}
	function Rotate(o){
		o.rotation++;
		if (o.rotation >= 360){
			o.rotation = 0;
		}
	}
}
function Laser(rectangle, texture){
	this.texture = texture;
	this.rectangle = rectangle;
	this.hasHitEarth = false;
}
function ScoreAnimation(rectangle, textures){
	this.rectangle = rectangle;
	this.texture = textures[0];
	this.textures = textures;
	this.index = 0;
	this.draw = true;
}
	
//general functions
function GetRotation(x1, y1, x2, y2){
	rads = Math.atan2((x2 - x1), (y2 - y1));
	return rads * (180 / Math.PI);
}
function screen(){
		if (mouse.click){
			CreateScreenShot("test");
		}
	}
function GenerateEnemies(amount){
	enemies = [];
	startY = -100;
	for (var i = 0; i < amount; i++){
		randX = Math.random() * 950;
		randY = Math.random() * 600;
		choice = Math.random() * 100;
		if (choice > 0 && choice <= 50){
			e = new Enemy(new Rectangle(randX, (5 * i) * startY, 100, 100), EnemeyTextures_Body, EnemeyTextures_Core, 5);
		}
		if (choice > 50 && choice <= 90){
			e = new Enemy(new Rectangle(randX, (5 * i) * startY, 100, 100), EnemyTexturesTough_Body, EnemyTexturesTough_Core, 9);
		}
		if(choice > 90){
			e = new Destroyer(new Rectangle(randX, (5 * i) * startY, 100, 100), EnemyTexturesDestroyer_Body, EnemyTexturesDestroyer_Core, 3);
		}
		enemies[i] = e;
	}
}
function CheckEnemy(enemy){
	if (enemy.rectangle.y > 740){enemy.draw = false;}
	if (Intersects(ball.rectangle, enemy.rectangle) && enemy.draw){
		if (ball.justHit == false && enemy.texIndex < enemy.hits && mouse.down == false){
			PlaySound("sounds/bounce.wav");
			if (ENERGY >= enemy.textures.length - enemy.texIndex){
				enemy.texIndex += (enemy.textures.length - enemy.texIndex);
			}
			else{
				enemy.texIndex += ENERGY;
			}
			if (enemy.texIndex > enemy.hits){enemy.texIndex = enemy.hits;}
			ball.velocityY *= -1;
			ball.velocityX *= -1;
			ball.justHit = true;
			if (ball.rectangle.y > enemy.rectangle.y){
				enemy.rectangle.y -= 5;
			}
			if (ball.rectangle.y < enemy.rectangle.y){
				enemy.rectangle.y += 5;
			}
			if (ball.rectangle.x > enemy.rectangle.x){
				enemy.rectangle.x -= 5;
			}
			if (ball.rectangle.x < enemy.rectangle.x){
				enemy.rectangle.x += 5;
			}
			
		}
		if (enemy.texIndex == enemy.hits && enemy.draw && ball.justHit == false){
			PlaySound("sounds/score.wav");
			SCORE += 10;
			enemy.draw = false;
			ScoreAnimations[ScoreIndex++] = new ScoreAnimation(enemy.rectangle, ScoreTextures);
		}
	}
	else{
		ball.justHit = false;
	}
}
function DrawEnemy(enemy){
	if (enemy.rectangle.y > -20){
	Draw4(enemy.textures[enemy.texIndex], enemy.rectangle.x + 50, enemy.rectangle.y + 50, enemy.rotation);
	e = enemy.rectangle;
	coreRec = new Rectangle(e.x + 23, e.y + 23, 50, 50);
	if (enemy.draw){Draw3(enemy.coreTextures[enemy.coreIndex], coreRec);}
	enemy.coreCounter++;
	if (enemy.coreCounter % 1 == 0){
		enemy.coreIndex++;
	}
	if (enemy.coreIndex == 8){enemy.coreIndex = 0;}	
	}
}
function DrawBolts(){
	for (var i = 0; i < bolts.length; i++){
		if (bolts[i].draw){Draw4(bolts[i].texture, bolts[i].rectangle.x + 25, bolts[i].rectangle.y + 25, bolts[i].rotation);}
	}
}
function DrawLaser(){
	for (var i = 0; i < enemies.length; i++){
		if (enemies[i].LaserSize && enemies[i].shooting){
			Draw3(enemies[i].laser.texture, enemies[i].laser.rectangle);
		}
	}
}
function DrawMenu(){
	
	Draw2(menuBackground, new Rectangle(0,0,1280,720));
	playAlpha = 0.5;
	canvas.globalAlpha = 0.7;
	Draw2(menuTitle, new Rectangle(100,300,400,600));
	if (Intersects(cursorRec, new Rectangle(750,275,250,250))){
		playAlpha = 1.0;
		if (mouse.click){
			DIRS = true;
		}
	}
	Draw7(menuDirections, 750, 275,playAlpha)
	canvas.globalAlpha = 1.0;
	DrawText("Choose a ball to start!", 200, 440, "white", "20px Impact");
	b1Alpha = b2Alpha = b3Alpha = b4Alpha = 0.5;
	if(Intersects(cursorRec, ball1_rec) && DIRS == false){
		ball1_rot_inc += 10;
		b1Alpha = 1.0;
		if (mouse.click){
			BallTextures[0] = ball1;
			ball = new Ball(new Rectangle (50, 50, 50, 50), BallTextures);
			MENU = false;
		}
	}
	if(Intersects(cursorRec, ball2_rec) && DIRS == false){
		ball2_rot_inc += 10;
		b2Alpha = 1.0;
		if (mouse.click){
			BallTextures[0] = ball2;
			ball = new Ball(new Rectangle (50, 50, 50, 50), BallTextures);
			MENU = false;
		}
	}
	if(Intersects(cursorRec, ball3_rec) && DIRS == false){
		ball3_rot_inc += 10;
		b3Alpha = 1.0;
		if (mouse.click){
			BallTextures[0] = ball3;
			ball = new Ball(new Rectangle (50, 50, 50, 50), BallTextures);
			MENU = false;
		}
	}
	if(Intersects(cursorRec, ball4_rec) && DIRS == false){
		ball4_rot_inc += 10;
		b4Alpha = 1.0;
		if (mouse.click){
			BallTextures[0] = ball4;
			ball = new Ball(new Rectangle (50, 50, 50, 50), BallTextures);
			MENU = false;
		}
	}
	Draw5(ball1, ball1_rec.x + 25, ball1_rec.y + 25, ball1_rot + ball1_rot_inc++, b1Alpha);
	Draw5(ball2, ball2_rec.x + 25, ball2_rec.y + 25, ball2_rot + ball2_rot_inc++, b2Alpha);
	Draw5(ball3, ball3_rec.x + 25, ball3_rec.y + 25, ball3_rot + ball3_rot_inc++, b3Alpha);
	Draw5(ball4, ball4_rec.x + 25, ball4_rec.y + 25, ball4_rot + ball4_rot_inc++, b4Alpha);
	if (delayCount > 10 && delayCount < 20){Draw6(sizzle[sizzleCounter], new Rectangle(100, 500, 2000, 300), 0)};
	if (sizzleCounter >= 9){sizzleCounter = 0;}
	if (sCount >= 3){sizzleCounter++;sCount = 0;}
	sCount++;
	delayCount++;
	ra = Math.random();
	if (delayCount > (100 * ra) + 100){delayCount = 0;}

	if (DIRS){
		Draw2(buffer, new Rectangle(0,0,1280,720))
		Draw2(dirs[dirsCounter], new Rectangle(0,0,1280,720));
		if (mouse.click){
			if (dirsCounter + 1 >= 6){dirsCounter = 0; DIRS = false;}
			dirsCounter++;
		}

	}

}
function UpdateBolts(){
	for (var i = 0; i < bolts.length; i++){
		bolts[i].Update();
		if (Intersects(bolts[i].rectangle, earthRec) && bolts[i].draw){
			EARTH_ENERGY--;
			bolts[i].draw = false;
		}
		if (Intersects(bolts[i].rectangle, ball.rectangle) && bolts[i].draw){
			ENERGY--;
			bolts[i].draw = false;
		}
	}
}
function AllEnemiesAreDead(){
	for (var i = 0; i < enemies.length; i++){
		if (enemies[i].draw){return false;}
	}
	return true;
}
function CheckLasers(){
	//something wrong here
	e = enemies;
	for (var i = 0; i < e.length; i++){
		if (e[i].laser && Intersects(e[i].laser.rectangle, earthRec) && e[i].hasHitEarth == false){
			EARTH_ENERGY -= 50;
			e[i].hasHitEarth = true;
		}
	}
}
function CheckPlayerHasLost(){
	if (EARTH_ENERGY <= 0){
		DrawText("You Lose!", 300, 300, "red", "30px Impact");
		deathCount++;
		if (deathCount >= 300){
			EARTH_ENERGY = 360;
			SCORE = 0;
			enemies = [];
			MENU = true;
		}
	}
}
function DrawEarthVitality(){
	canvas.globalAlpha = 0.5;
	canvas.beginPath();
	canvas.arc(60, 500, 50, 0, EARTH_ENERGY * TO_RADIANS);
	canvas.fillStyle = "green";
	canvas.fill();
	canvas.beginPath();
	canvas.arc(60, 500, 50, 0, Math.PI * 2);
	canvas.stroke();
	canvas.globalAlpha = 0.7;
	DrawText("Earth Vitality", 20, 505, "red", "15px Impact");
	canvas.globalAlpha = 1.0;
}
//GAME-----
MENU = true;
DIRS = false;
SCORE = 0;
ENERGY = 0;
EARTH_ENERGY = 360;
energyRec = new Rectangle(10, 575, 100, 100);
earthRec = new Rectangle(700, 1400, 1838, 1845);
earthRotation = 0;
earth = LoadImage("earth.png");
enemies = [];
bolts = [];
boltCounter = 0;
charge = [];

heldCharge = 0;
electric = new Audio("sounds/electric.wav");
electric.loop = true;
electric.muted = true;

//electric.play();

BoltTexture = LoadImage("basic_bolt.png");
LaserTexture = LoadImage("laser_beam.png");
pointer = LoadImage("pointer.png");
menuBackground = LoadImage("menu_background.png");
menuTitle = LoadImage("menu_title.png");
menuDirections = LoadImage("menu_directions.png");

cursorRec = new Rectangle(0, 0, 10, 10);
cursorIndex = 0;
cursor = [];
cursor[0] = LoadImage("cursor1.png");
cursor[1] = LoadImage("cursor2.png");
cursor[2] = LoadImage("cursor3.png");
cursor[3] = LoadImage("cursor4.png");
cursor[4] = LoadImage("cursor5.png");
cursor[5] = LoadImage("cursor6.png");
cursor[6] = LoadImage("cursor7.png");
cursor[7] = LoadImage("cursor8.png");
cursor[8] = LoadImage("cursor9.png");


charge[0] = LoadImage("lightning1.png");
charge[1] = LoadImage("lightning2.png");
charge[2] = LoadImage("lightning3.png");
charge[3] = LoadImage("lightning4.png");
charge[4] = LoadImage("lightning5.png");
charge[5] = LoadImage("lightning6.png");
charge[6] = LoadImage("lightning7.png");
charge[7] = LoadImage("lightning8.png");
charge[8] = LoadImage("lightning9.png");
chargeCounter = 0;

dirs = [];
buffer = LoadImage("dirs/buffer.png")
dirs[0] = LoadImage("dirs/buffer.png");
dirs[1] = LoadImage("dirs/dir1.png");
dirs[2] = LoadImage("dirs/dir2.png");
dirs[3] = LoadImage("dirs/dir3.png");
dirs[4] = LoadImage("dirs/dir4.png");
dirs[5] = LoadImage("dirs/dir5.png");
dirsCounter = 0;

EnemeyTextures_Body = [];
EnemeyTextures_Body[0] = LoadImage("basic_main_health_full.png");
EnemeyTextures_Body[1] = LoadImage("basic_main_health_1.png");
EnemeyTextures_Body[2] = LoadImage("basic_main_health_2.png");
EnemeyTextures_Body[3] = LoadImage("basic_main_health_3.png");
EnemeyTextures_Body[4] = LoadImage("basic_main_health_4.png");
EnemeyTextures_Body[5] = LoadImage("basic_main_health_5.png");

EnemyTexturesTough_Body = [];
EnemyTexturesTough_Body[0] = LoadImage("tough_main_health_full.png");
EnemyTexturesTough_Body[1] = LoadImage("tough_main_health_1.png");
EnemyTexturesTough_Body[2] = LoadImage("tough_main_health_2.png");
EnemyTexturesTough_Body[3] = LoadImage("tough_main_health_3.png");
EnemyTexturesTough_Body[4] = LoadImage("tough_main_health_4.png");
EnemyTexturesTough_Body[5] = LoadImage("tough_main_health_5.png");
EnemyTexturesTough_Body[6] = LoadImage("tough_main_health_6.png");
EnemyTexturesTough_Body[7] = LoadImage("tough_main_health_7.png");
EnemyTexturesTough_Body[8] = LoadImage("tough_main_health_8.png");
EnemyTexturesTough_Body[9] = LoadImage("basic_main_health_5.png");

EnemyTexturesDestroyer_Body = [];
EnemyTexturesDestroyer_Body[0] = LoadImage("destroyer_main_health_full.png");
EnemyTexturesDestroyer_Body[1] = LoadImage("destroyer_main_health_1.png");
EnemyTexturesDestroyer_Body[2] = LoadImage("destroyer_main_health_2.png");
EnemyTexturesDestroyer_Body[3] = LoadImage("basic_main_health_5.png");

EnemeyTextures_Core = [];
EnemeyTextures_Core[0] = LoadImage("basic_core_bad1.png");
EnemeyTextures_Core[1] = LoadImage("basic_core_bad2.png");
EnemeyTextures_Core[2] = LoadImage("basic_core_bad3.png");
EnemeyTextures_Core[3] = LoadImage("basic_core_bad4.png");
EnemeyTextures_Core[4] = LoadImage("basic_core_bad5.png");
EnemeyTextures_Core[5] = LoadImage("basic_core_bad6.png");
EnemeyTextures_Core[6] = LoadImage("basic_core_bad7.png");
EnemeyTextures_Core[7] = LoadImage("basic_core_bad8.png");
EnemeyTextures_Core[8] = LoadImage("basic_core_bad9.png");

EnemyTexturesTough_Core = [];
EnemyTexturesTough_Core[0] = LoadImage("tough_core_bad1.png");
EnemyTexturesTough_Core[1] = LoadImage("tough_core_bad2.png");
EnemyTexturesTough_Core[2] = LoadImage("tough_core_bad3.png");
EnemyTexturesTough_Core[3] = LoadImage("tough_core_bad4.png");
EnemyTexturesTough_Core[4] = LoadImage("tough_core_bad5.png");
EnemyTexturesTough_Core[5] = LoadImage("tough_core_bad6.png");
EnemyTexturesTough_Core[6] = LoadImage("tough_core_bad7.png");
EnemyTexturesTough_Core[7] = LoadImage("tough_core_bad8.png");
EnemyTexturesTough_Core[8] = LoadImage("tough_core_bad9.png");

EnemyTexturesDestroyer_Core = [];
EnemyTexturesDestroyer_Core[0] = LoadImage("destroyer_core_bad1.png");
EnemyTexturesDestroyer_Core[1] = LoadImage("destroyer_core_bad2.png");
EnemyTexturesDestroyer_Core[2] = LoadImage("destroyer_core_bad3.png");
EnemyTexturesDestroyer_Core[3] = LoadImage("destroyer_core_bad4.png");
EnemyTexturesDestroyer_Core[4] = LoadImage("destroyer_core_bad5.png");
EnemyTexturesDestroyer_Core[5] = LoadImage("destroyer_core_bad6.png");
EnemyTexturesDestroyer_Core[6] = LoadImage("destroyer_core_bad7.png");
EnemyTexturesDestroyer_Core[7] = LoadImage("destroyer_core_bad8.png");
EnemyTexturesDestroyer_Core[8] = LoadImage("destroyer_core_bad9.png");


EnergyTextures = [];
EnergyTextures[0] = LoadImage("battery_base.png");
EnergyTextures[1] = LoadImage("battery_20.png");
EnergyTextures[2] = LoadImage("battery_40.png");
EnergyTextures[3] = LoadImage("battery_60.png");
EnergyTextures[4] = LoadImage("battery_80.png");
EnergyTextures[5] = LoadImage("battery_100.png");

sizzle = [];
sizzleCounter = 0;
sCount = 0;
delayCount = 0;
sizzle[0] = LoadImage("bolt_tesla/bolt_tesla_0001.png");
sizzle[1] = LoadImage("bolt_tesla/bolt_tesla_0002.png");
sizzle[2] = LoadImage("bolt_tesla/bolt_tesla_0003.png");
sizzle[3] = LoadImage("bolt_tesla/bolt_tesla_0004.png");
sizzle[4] = LoadImage("bolt_tesla/bolt_tesla_0005.png");
sizzle[5] = LoadImage("bolt_tesla/bolt_tesla_0006.png");
sizzle[6] = LoadImage("bolt_tesla/bolt_tesla_0007.png");
sizzle[7] = LoadImage("bolt_tesla/bolt_tesla_0008.png");
sizzle[8] = LoadImage("bolt_tesla/bolt_tesla_0009.png");
sizzle[9] = LoadImage("bolt_tesla/bolt_tesla_0010.png");

ScoreTextures = [];
ScoreAnimations = [];
ScoreIndex = 0;
ScoreTextures[0] = LoadImage("score1.png");
ScoreTextures[1] = LoadImage("score2.png");
ScoreTextures[2] = LoadImage("score3.png");
ScoreTextures[3] = LoadImage("score4.png");
ScoreTextures[4] = LoadImage("score5.png");
ScoreTextures[5] = LoadImage("score6.png");
ScoreTextures[6] = LoadImage("score7.png");
ScoreTextures[7] = LoadImage("score8.png");
ScoreTextures[8] = LoadImage("score9.png");
//members
heldChargeCounter = 0;


backgroundImage = LoadImage("background.png");
ball1 = LoadImage("ball1.png");
ball2 = LoadImage("ball2.png");
ball3 = LoadImage("ball3.png");
ball4 = LoadImage("ball4.png");

ball1_rec = new Rectangle(200, 450, 50 , 50);
ball1_rot_inc = 1;
ball1_rot = 0;

ball2_rec = new Rectangle(250, 450, 50 , 50);
ball2_rot_inc = 1;
ball2_rot = 0;

ball3_rec = new Rectangle(300, 450, 50 , 50);
ball3_rot_inc = 1;
ball3_rot = 0;

ball4_rec = new Rectangle(350, 450, 50 , 50);
ball4_rot_inc = 1;
ball4_rot = 0;


BallTextures = [];
BallTextures[0] = LoadImage("ball1.png");
deathCount = 0;

enemy = new Enemy(new Rectangle(100, 100, 100, 100), EnemeyTextures_Body, EnemeyTextures_Core);

//
GenerateEnemies(10);
highScore = 0;
if (localStorage.getItem("highscore")){
	highScore = localStorage.getItem("highscore");
}
else{
	localStorage.setItem("highscore", highScore);
}
function Update(){
if (localStorage.getItem("highscore")){
	highScore = localStorage.getItem("highscore");
	if (SCORE > highScore){
		localStorage.setItem("highscore", SCORE);
	}
}

if (MENU == false){
	CheckPlayerHasLost();
	ball.Update();
	UpdateBolts();
	if (AllEnemiesAreDead()){
		GenerateEnemies(10);
	}
	for (var i = 0; i < enemies.length; i++){
		CheckEnemy(enemies[i]);
		enemies[i].Update();
	}
	CheckLasers();
	if (mouse.down){
		//heldChargeCounter++;
	}
	else{
		
		if (ball.mult >= 14){
			ball.mult-=0.1;
			ball.velocityX = ball.normalX * ball.mult;
			ball.velocityY = ball.normalY * ball.mult;
		}
	}
	if (mouse.down){
		//electric.muted = false;
		ball.rot += 25;
		if (heldCharge < 150){heldCharge++;}
		
		if (heldCharge > 20){
			ENERGY = 1;
		}
		if (heldCharge > 40){
			ENERGY = 2;
		}
		if (heldCharge > 60){
			ENERGY = 3;
		}
		if (heldCharge > 80){
			ENERGY = 4;
		}
		if (heldCharge > 100){
			ENERGY = 5;
		}
	}
	else{
		if (heldCharge > 5){heldCharge -= 5;}
		electric.muted = true;
	}
}
else{
	
}

}
function Draw(){
if (MENU == false){
	r = ball.rectangle;
	incX = 1.5 * ball.velocityX;
	incY = 1.5 * ball.velocityY;
	Draw2(backgroundImage, new Rectangle(0, 0, 1280, 720));
	DrawText("High Score: " + localStorage.getItem("highscore"), 500, 50, "red", "20px Impact");
	Draw4(earth, earthRec.x, earthRec.y, earthRotation+= 0.01);
	Draw4(ball.texture, ball.rectangle.x + 25, ball.rectangle.y + 25, ball.rot);
	DrawBolts();
	DrawLaser();
	for (var q = 0; q < ScoreAnimations.length; q++){
		a = ScoreAnimations[q];
		if (a.draw){Draw2(a.textures[a.index], a.rectangle)};
		if (a.index < 8){a.index++;}
		if (a.index == 8){a.draw = false;}
	}
	for (var i = 0; i < enemies.length; i++){
		if(enemies[i].draw){DrawEnemy(enemies[i]);}
	}
	if (mouse.down){
		Draw3(charge[chargeCounter], new Rectangle(r.x - 50, r.y - 50, 150, 150));
		chargeCounter++;
		if (chargeCounter >= 8){chargeCounter = 0;}
		//Draw4(pointer, r.x, r.y, GetRotation(mouse.x, mouse.y, ball.rectangle.x, ball.rectangle.y));
	}
	canvas.globalAlpha = 0.4;
	if (mouse.down == false && enemy.draw){
		for (var i = 0; i < 5; i++){
			Draw2(ball.texture, new Rectangle(r.x - (i * incX), r.y - (i * incY), 50, 50));
			canvas.globalAlpha -= 0.1;
		}
	}
	canvas.globalAlpha = 1.0;
	DrawText("Score: " + SCORE, 10, 40, "red", "25px Arial");
	canvas.globalAlpha = 0.5;
	Draw2(EnergyTextures[0], energyRec);
	en = energyRec;
	for (var j = ENERGY; j > 0; j--){
		Draw2(EnergyTextures[j], new Rectangle(en.x + 15, en.y - (j * 20) + 115, 10, 10));
	}
	canvas.globalAlpha = 1.0;
	DrawEarthVitality();
}
else{
	DrawMenu();
}
Draw2(cursor[cursorIndex], cursorRec);
	if (cursorIndex == 8){cursorIndex = 0;}
	cursorRec = new Rectangle(mouse.x, mouse.y, 10, 10);
	cursorIndex++;
}
Game = new GameObject(Update, Draw);
Master = new GameObject(null, null);
Master.Run(Game);