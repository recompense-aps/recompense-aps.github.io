function Circle(x, y, radius, vx, vy){
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.radius = radius;
	this.color = "yellow";
	this.Update = Update;
	function Update(){
		Move(this);
	}
	function Move(o){
		o.x += o.vx;
		o.y += o.vy;
		if (o.x <= 0 || o.x >= 1200){
			o.vx *= -1;
		}
		if (o.y <= 0 || o.y >= 700){
			o.vy *= -1;
		}
	}
}

function GenerateCircles(amount){
	for (var i = 0; i < amount; i++){
		randX = 5 * Math.random();
		randY = 5 * Math.random();
		randRad = 50 * Math.random();
		ci = new Circle(0, 0, randRad, randX, randY);
		Circles[circleCounter++] = ci;
	}
}
function Player(rectangle, image, textures){
this.rectangle = rectangle;
this.textures = textures;
this.image = image;
this.Update = Update;
this.movingUp = false;
this.gravityPeriod = 0.5;
this.isDead = false;
this.playedSound = false;
function Update(){
	Move(this);
	Gravity(this);
}
function Move(o){
	moveRate = 25;
	if (KeyBoard.isDDown && KeyBoard.isSDown == false){
		o.rectangle.x += moveRate / 5;
	}
	if (KeyBoard.isADown && KeyBoard.isSDown == false){
		o.rectangle.x -= moveRate / 5;
	}
	
		o.rectangle.y -= moveRate;
		o.movingUp = true;
		
	
	
	if (o.rectangle.y > 700){
		o.rectangle.y -= moveRate;
		
	}
	if (o.rectangle.x > 1200){
		o.rectangle.x -= moveRate / 5;
	}
}
function Gravity(o){
	if (o.rectangle.y < 600){
		o.rectangle.y += (o.gravityPeriod);
		o.gravityPeriod += 0.5;
		
	}
	else{
		o.gravityPeriod = 0.5;
		if (/*KeyBoard.isSDown == false*/true){PlaySound("sounds/squeak.mp3")};
	}
}
}
function Point(rectangle, image, points, text, harmful){
	this.rectangle = rectangle;
	this.image = image;
	this.points = points;
	this.text = text;
	this.Update = Update;
	this.harmful = harmful;
	this.draw = true;
	function Update(){
		Move(this);
	}
	function Move(o){
		o.rectangle.x -= PointMove;
	}
}
function PointAlert(text, x, y, stay, color){
	this.x = x;
	this.y = y;
	this.text = text;
	this.show = true;
	this.period = 1;
	this.gravityPeriod = 1;
	this.stay = stay;
	this.Update = Update;
	this.color = color;
	
	function Update(){
		Animate(this);
	}
	function Animate(o){
		if (o.show && o.stay == false){
			switch(o.period){
				case 1:
					o.y += o.gravityPeriod;
					o.gravityPeriod += 1;
					if (o.y > 520){
						o.gravityPeriod = 10;
						o.period = 2;
					}
				break;
				case 2:
					o.y -= o.gravityPeriod;
					o.gravityPeriod -= 0.7;
					if (o.y < 420){
						o.gravityPeriod = 6;
						o.period = 3
					}
				break;
				case 3:
					o.y += o.gravityPeriod;
				break;
			}
		}
		else{
			switch(o.period){
				case 1:
					o.y += o.gravityPeriod;
					o.gravityPeriod += 1;
					if (o.y > 520){
						o.gravityPeriod = 10;
						o.period = 2;
					}
				break;
				case 2:
					o.y -= o.gravityPeriod;
					o.gravityPeriod -= 0.7;
					if (o.y < 420){
						o.gravityPeriod = 6;
						o.period = 3
					}
				break;
				case 3:
					o.y -= o.gravityPeriod;
				break;
			}
		}
	}
}
function Header(text, x, y, color, limit){
	this.x = x;
	this.y = y;
	this.limit;
	this.text = text;
	this.show = true;
	this.period = 1;
	this.gravityPeriod = 1;
	this.color = color;
	this.Update = Update;
	
	function Update(){
		AnimateD(this);
	}
	function AnimateD(o){
		if (o.show){
			switch(o.period){
				case 1:
					o.y += o.gravityPeriod;
					o.gravityPeriod += 1;
					if (o.y > 520){
						o.gravityPeriod = 10;
						o.period = 2;
					}
				break;
				case 2:
					o.y -= o.gravityPeriod;
					if (o.y < limit){
						o.gravityPeriod = 6;
						o.period = 3;
					}
				break;
				case 3:
					o.y = o.y;
				break;
			}
		}
	
}
}
function Giver(rectangle, image, act){
	this.rectangle = rectangle;
	this.image = image;
	this.activated = act;
	this.Update = Update;
	this.hits = 0;
	this.MaxHits = 10000;
	this.vx = 3;
	this.vy = 3;
	function Update(){
		Move(this);
	}
	function Move(o){
		o.rectangle.x += o.vx;
		o.rectangle.y += o.vy;
		
		if (o.rectangle.x <= 0 || o.rectangle.x >= 1150){
			o.vx *= -1;
			o.hits++;
		}
		if (o.rectangle.y <= 0 || o.rectangle.y >= 650){
			o.vy *= -1;
			o.hits++;
		}
		if (o.hits >= 3){
			o.activated = false;
			o.hits = 0;
		}
	}
}
function GenerateGiver(o){
	rand = (100000 * Math.random());
	if (rand >= 99950){
		o.activated = true;
	}
}

//
points = [];

function GenerateParts(){
	for (var i = 0; i < 100; i++){
		//randomize here
		var y = 0;
		rand = 100 * Math.random();
		if (rand < 30){
			y = 100;
		}
		else if (rand >= 30 && rand < 60){
			y = 300;
		}
		else{
			y = 500;
		}
		choiceRand = 100 * Math.random();
		if (choiceRand >= 1 && choiceRand >= 90){
			KissPoint = new Point(new Rectangle(i * 500, y, 100, 100), nail_image, "-1000", "You Dead!", true);
			points[i] = KissPoint;
		}
	    else if (choiceRand <= 25){
			KissPoint = new Point(new Rectangle(i * 500, y, 100, 70), kiss_point_image, "+10", "You sly dog, you!", false);
			points[i] = KissPoint;
		}
		else if (choiceRand > 25 && choiceRand <= 50){
			DewPoint = new Point(new Rectangle(i * 500, y, 100, 100), dew_point_image, "+10", "This looks weird...", false);
			points[i] = DewPoint;
		}
		else if (choiceRand > 50 && choiceRand <= 75){
			MileyBadPoint = new Point(new Rectangle(i * 500, y, 125, 100), miley_losepoint_image, "-10", "Wo bro, take it easy!", true);
			points[i] = MileyBadPoint;
		}
		else if(choiceRand > 75){
			IrsBadPoint = new Point(new Rectangle(i * 500, y, 100, 100), irs_losepoint_image, "-10", "It's not robery!", true);
			points[i] = IrsBadPoint;
		}
		
	}
}

SLOW  = false;
FAST = false;
MENU  = true;
PAUSED = false;
Timer = 0;
Minutes = 0;
Circles = [];
circleCounter = 0;
start = new Rectangle(0, 0, 100, 100);
startVelX = 3;
startVelY = 1;
StartHeaders = [];
GiverAnimating = false;
GiverAlerts = [];
GiverAlertCounter = 0;
GiverIntersected = false;
GiverCounter = 0;
OldSpeed = 5;
SCORE = 0;
STUDSCORE = 300;
TIME = 0;
TIMELIMIT = 1000;
ALLPARTSHAVEPAST = false;
backgroundMusic = false;
PointMove = 5;
dusk = LoadImage("dusk.png");
im = LoadImage("player_main.png");
stud1 = LoadImage("player_stud_1.png");
stud2 = LoadImage("player_stud_2.png");
stud3 = LoadImage("player_stud_3.png");
stud4 = LoadImage("player_stud_4.png");
stud5 = LoadImage("player_stud_5.png");
stud6 = LoadImage("player_stud_6.png");
stud7 = LoadImage("player_stud_7.png");
stud8 = LoadImage("player_stud_8.png");
stud9 = LoadImage("player_stud_9.png");
stud10 = LoadImage("player_stud_10.png");
face = LoadImage("player_face.png");
giver_image = LoadImage("giver.png");
cursor = LoadImage("cursor.png");
blood = [];
blood[0] = LoadImage("blood/blood_d_0001.png");
blood[1] = LoadImage("blood/blood_d_0002.png");
blood[2] = LoadImage("blood/blood_d_0003.png");
blood[3] = LoadImage("blood/blood_d_0004.png");
blood[4] = LoadImage("blood/blood_d_0005.png");
blood[5] = LoadImage("blood/blood_d_0006.png");
var deathCounter = 0;
deadImage = LoadImage("dead.png");
player = new Player(new Rectangle(100, 0, 100, 100), im, null);
Giver = new Giver(new Rectangle(500, 500, 100, 100), giver_image, false);

kiss_point_image = LoadImage("points_kiss.png");
dew_point_image = LoadImage("points_dew.png");

miley_losepoint_image = LoadImage("badpoints_miley.png");
irs_losepoint_image = LoadImage("badpoints_irs.png");

nail_image = LoadImage("nail.png");

ice = LoadImage("ice.png");
fire = LoadImage("fire.png");

background = LoadImage("background_main.png");
bg2 = LoadImage("background_2.png");
bg3 = LoadImage("background_3.png");
bg4 = LoadImage("background_4.png");
bg5 = LoadImage("background_5.png");
bg6 = LoadImage("background_6.png");
bg7 = LoadImage("background_7.png");
clouds = LoadImage("background_clouds.png");
bgRec = new Rectangle(0,0,1000,1000);
inc = 1280;
cloudsRec = new Rectangle(0,-100,1000,1000);

TopGround = LoadImage("block_top.png");

TestNote = new PointAlert("testing...");
TestNote.show = true;
alerts = [];
alertCounter = 0;

scoreAlerts = [];
scoreAlertCounter = 0;
Headers = [];
hasPlayedDeathSound = false;
GenerateParts();
GenerateCircles(100);

for (var x = 0; x < 5; x++){
				if (x == 4){
				StartHeaders[x] = new Header("Click Smiles to start!", 400 - x, -200, "red", 420);
				}
				else
				{
					StartHeaders[x] = new Header("Click Smiles to start!", 400 - x, -200, "black", 420);
				}
}
			
for (var y = 5; y < 10; y++){
	if (y == 9){
				StartHeaders[y] = new Header("Bouncy Face", 400 - y, -100, "green", 350);
				}
				else
				{
					StartHeaders[y] = new Header("Bouncy Face", 400 - y, -100, "black", 350);
				}
}

function Update(){
if (SCORE >= STUDSCORE){
	rand = 100 * Math.random();
	if (rand < 10){player.image = stud9;}
	if (rand >= 10 && rand < 20){player.image = stud1;}
	if (rand >= 20 && rand < 30){player.image = stud2;}
	if (rand >= 30 && rand < 40){player.image = stud3;}
	if (rand >= 40 && rand < 50){player.image = stud4;}
	if (rand >= 50 && rand < 60){player.image = stud5;}
	if (rand >= 60 && rand < 70){player.image = stud6;}
	if (rand >= 70 && rand < 80){player.image = stud7;}
	if (rand >= 80 && rand < 90){player.image = stud8;}
	if (rand >= 90){player.image = stud10;}
	STUDSCORE += 300;
	PointMove = 5;
	
}
if (mouse.click){
	//PAUSED = !PAUSED;
}
if (MENU == false && PAUSED == false){
	TIME++;
	if (SLOW == false && FAST == false){GenerateGiver(Giver);}
	if (Giver.activated){Giver.Update();}
	if (SLOW || FAST){
		GiverCounter++;
		if (GiverCounter > 1500){
			GiverCounter = 0;
			SLOW = FAST = false;
			PointMove = OldSpeed;
			GiverIntersected = false;
		}
	}
	if (Intersects(player.rectangle, Giver.rectangle) && Giver.activated && GiverIntersected == false){
		rand = 100 * Math.random();
		PlaySound("sounds/giver.wav");
		if (rand <= 50){
			SLOW = true;
			OldSpeed = PointMove;
			PointMove /= 2;
			GiverAlerts[GiverAlertCounter++] = new PointAlert("SLOW IT DOWN!!", 300, 0, false, "blue");
			GiverAnimating = true;
		}
		else{
			FAST = true;
			OldSpeed = PointMove;
			PointMove *= 2;
			GiverAlerts[GiverAlertCounter++] = new PointAlert("SPEED IT UP!!", 300, 0, false, "orange");
			GiverAnimating = true;
		}
		GiverIntersected = true;
		Giver.activated = false;
	}
	for (var w = 0; w < GiverAlerts.length; w++){
		GiverAlerts[w].Update();
		if (GiverAlerts[w].y < 700){
			break;
		}
		GiverAnimating = false;
	}
	if (backgroundMusic){}
	//else{PlaySound("sounds/background.mp3");backgroundMusic = true;}
	if (ALLPARTSHAVEPAST){
		points = []
		GenerateParts();
		ALLPARTSHAVEPAST = false;
	}
	goodParts = 0;
	for (var d = 0; d < points.length; d++){
		
		if (points[d].rectangle.x > -10){
			goodParts++;
		}
		
	}
	if (goodParts < 1){ALLPARTSHAVEPAST = true;}
	if (TIME > TIMELIMIT){
		PointMove += 2;
		TIMELIMIT += 1000;
		alerts[alertCounter++] = new PointAlert("Faster!!", 300, -100, false, "blue");
	}
	fasterHasPassed = true;
	for (var p = 0; p < alerts.length; p++){
		if (alerts[p].y < 700 && alerts[p].text == "Faster!!"){
			fasterHasPassed = false;
		}
	}
	
	if (player.isDead == false && fasterHasPassed && GiverAnimating == false) {player.Update()};
	if (fasterHasPassed && GiverAnimating == false){
	for (var i = 0; i < points.length; i++){
		points[i].Update();
		if (Intersects(player.rectangle, points[i].rectangle) && points[i].draw && player.isDead == false){
			if (points[i].text == "You Dead!"){
				player.isDead = true;
				if (hasPlayedDeathSound == false){
					PlaySound("sounds/pop.mp3");
					hasPlayedDeathSound = true;
				}
				break;
				}
				
			
			
			points[i].draw = false;
			color = "";
			if (points[i].harmful){
				color = "red";
				PlaySound("sounds/bad.wav");
			}
			else{
				color = "green";
				PlaySound("sounds/good.wav");
			}
			alerts[alertCounter] = new PointAlert(points[i].text, 300, -100, false, color);
			alertCounter++;
			
			scoreAlerts[scoreAlertCounter] = new PointAlert(points[i].points, points[i].rectangle.x, points[i].rectangle.y, false, color);
			scoreAlertCounter++;
			var score = "";
			for (var j = 0; j < points[i].points.length; j++){
				if (j != 0){
					score += points[i].points[j];
				}
			}
			if (points[i].harmful == false){SCORE += parseInt(score)}
			else if (SCORE != 0){
				SCORE -= parseInt(score);
			}
		}
	}
	
	}
	for (var j = 0; j < alerts.length; j++){
		alerts[j].Update();
	}
	for (var z = 0; z < scoreAlerts.length; z++){
		scoreAlerts[z].Update();
	}
	for (var s = 0; s < Headers.length; s++){
		Headers[s].Update();
	}
}
	else{
		for (var t = 0; t < Circles.length; t++){
			Circles[t].Update();
		}
		mouseRec = new Rectangle(mouse.x, mouse.y, 5, 5);
		if (Intersects(start, mouseRec) == false){
		start.x += startVelX;
		start.y += startVelY;
		
		
		
		if (start.x <= 0 || start.x >= 1000){
			startVelX *= -1;
		}
		if (start.y <= 0 || start.y >= 700){
			startVelY *= -1;
		}
		}
		for (var q = 0; q < StartHeaders.length; q++){
			StartHeaders[q].Update();
		}
		
	}
}

function Draw(){
if (MENU == false){
	
	bgRec.x--;
	
	Draw2(background, bgRec);
	
	b2 = new Rectangle(bgRec.x + inc, 0, 1000, 1000);
	b3 = new Rectangle(bgRec.x + inc * 2, 0, 1000, 1000);
	b4 = new Rectangle(bgRec.x + inc * 3, 0, 1000, 1000);
	b5 = new Rectangle(bgRec.x + inc * 4, 0, 1000, 1000);
	b6 = new Rectangle(bgRec.x + inc * 5, 0, 1000, 1000);
	b7 = new Rectangle(bgRec.x + inc * 6, 0, 1000, 1000);
	
	Draw2(bg2 , b2);
	Draw2(bg3 , b3);
	Draw2(bg4 , b4);
	Draw2(bg5 , b5);
	Draw2(bg6 , b6);
	Draw2(bg7 , b7);
	if (bgRec.x < -(inc * 7)){
		bgRec.x = 1280;
	}
	
	DrawText(SCORE, 30, 40, "red" , "30px Impact");
	seconds = "";
	if (Timer < 10){
		seconds = "0" + Timer;
	}
	else{
		seconds = Timer;
	}
	DrawText(Minutes + ":" + seconds, 100, 40, "green", "30px Impact");
	//DrawText(readCookie("HighScore") + "u", 100, 100, "red", "30px Impact");
	for (var j = 0; j < alerts.length; j++){
		DrawText(alerts[j].text, alerts[j].x, alerts[j].y, alerts[j].color, "30px Impact");
	}
	for (var z = 0; z < scoreAlerts.length; z++){
		DrawText(scoreAlerts[z].text, scoreAlerts[z].x, scoreAlerts[z].y, scoreAlerts[z].color, "20px Impact");
	}
	for (var s = 0; s < Headers.length; s++){
		DrawText(Headers[s].text, Headers[s].x, Headers[s].y, "red", "50px Impact");
	}
	for (var w = 0; w < GiverAlerts.length; w++){
		DrawText(GiverAlerts[w].text, GiverAlerts[w].x, GiverAlerts[w].y, "blue", "50px Impact");
	}
	/* cloudsRec.x -= 0.3;
	if (cloudsRec.x < -1000){
		cloudsRec.x = 0;
	}
	Draw2(clouds, cloudsRec);
	Draw2(clouds, new Rectangle(cloudsRec.x + 700, -100));*/
	if (player.isDead == false){
		Draw2(player.image, player.rectangle); 
	}
	else{
		if (deathCounter < 5){
			Draw2(blood[deathCounter], new Rectangle(player.rectangle.x, player.rectangle.y - 100, 100, 100));
			DeadAlert = new Header("You Dead!", 300, -100, "red", 420);
			
			Headers[deathCounter] = DeadAlert;
			deathCounter++;
		}
		else{
			Draw2(blood[5], new Rectangle(player.rectangle.x, player.rectangle.y - 100, 100, 100));
		}
		
	}
	
	var faceRec;
	if (player.movingUp){
		faceRec = new Rectangle(player.rectangle.x, player.rectangle.y, 100, 100);
	}
	else{
		faceRec = new Rectangle(player.rectangle.x, player.rectangle.y, 100, 100);
	}
	if (player.isDead == false){Draw2(face, faceRec)};
	
	//points
	for (var i = 0; i < points.length; i++){
		if (points[i].draw){
		Draw2(points[i].image, points[i].rectangle);
		if (points[i].text != "You Dead!" && SLOW){Draw3(ice, new Rectangle(points[i].rectangle.x - 20, points[i].rectangle.y - 10, points[i].rectangle.width, points[i].rectangle.height));}
		if (points[i].text != "You Dead!" && FAST){Draw3(fire, new Rectangle(points[i].rectangle.x - 20, points[i].rectangle.y - 10, points[i].rectangle.width, points[i].rectangle.height));}
		
		}
		
	}
	canvas.globalAlpha = 0.7;
	//Draw2(dusk, new Rectangle(0, 0, 100, 100));
	canvas.globalAlpha = 1.0;
	//giver
	if (Giver.activated){
		Draw2(Giver.image, Giver.rectangle);
	}
	}
	
	else{
		for (var t = 0; t < Circles.length; t++){
			canvas.fillStyle = "yellow";
			canvas.strokeStyle = "black";
			canvas.beginPath();
			canvas.lineWidth = 2;
			canvas.arc(Circles[t].x, Circles[t].y, Circles[t].radius, 0, 2 * Math.PI);
			canvas.fill();
			canvas.stroke();
			Draw2(im, start);
			Draw2(face, start);
			MouseRec = new Rectangle(mouse.x, mouse.y, 5, 5);
			for (var q = 0; q < StartHeaders.length; q++){
				DrawText(StartHeaders[q].text, StartHeaders[q].x, StartHeaders[q].y, StartHeaders[q].color, "50px Impact");
				//DrawText(GiverAlerts[w].text, GiverAlerts[w].x, GiverAlerts[w].y, "blue", "50px Impact");
			}
			Draw2(cursor, MouseRec);
			
			if (Intersects(MouseRec, start) && mouse.click){MENU = false;}
		}
	}
	
}

Game = new GameObject(Update, Draw);
Master = new GameObject(null, null);
Master.Run(Game);
setInterval(function(){
if (MENU == false){
Timer++;
if (Timer >= 60){
	Minutes++;
	Timer = 0;
}
}
}, 1000);

//music
