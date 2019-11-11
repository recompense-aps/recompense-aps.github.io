//library
//NAME CONTEXT VARIABLE "canvas" !!!!!!!!!
//---------------------------------->
//basic stuff
c = document.getElementById("canvas");
canvas = c.getContext("2d");
function getMousePos(c, evt) {
        var rect = c.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
      c.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(c, evt);
        mouse.x = mousePos.x;
		mouse.y = mousePos.y;
		
      }, false);
	  c.addEventListener('click', function(evt) {
        var mousePos = getMousePos(c, evt);
        mouse.click = true;
		
      }, false);
WIDTH = c.width;
HEIGHT = c.height;
GAME_SEQUENCE = 0;
function Mouse(x, y){
	this.x = x;
	this.y = y;
	this.click = false
}
mouse = new Mouse(0, 0);

function GameObject(draw, update){ //basic game class
	this.draw = draw;
	this.update = update;
	this.loopId = 0;
	this.Run = Run;
	function Run(o){
		o.loopId = setInterval(function(){canvas.clearRect(0,0,WIDTH,HEIGHT);o.update();o.draw();ResetKeys();}, 1000/60);
	}
}
function LoadImage(src){
	image = new Image();
	image.src = src;
	return image;
}

function Keys(){
	this.isADown = false;
	this.isBDown = false;
	this.isCDown = false;
	this.isDDown = false;
	this.isEDown = false;
	this.isFDown = false;
	this.isGDown = false;
	this.isHDown = false;
	this.isIDown = false;
	this.isJDown = false;
	this.isKDown = false;
	this.isLDown = false;
	this.isMDown = false;
	this.isNDown = false;
	this.isODown = false;
	this.isPDown = false;
	this.isQDown = false;
	this.isRDown = false;
	this.isSDown = false;
	this.isTDown = false;
	this.isUDown = false;
	this.isVDown = false;
	this.isWDown = false;
	this.isXDown = false;
	this.isYDown = false;
	this.isZDown = false;
	this.isSpaceDown = false;
	this.isEnterDown = false;
	this.isAUp = true;
	this.isBUp = true;
	this.isCUp = true;
	this.isDUp = true;
	this.isEUp = true;
	this.isFUp = true;
	this.isGUp = true;
	this.isHUp = true;
	this.isIUp = true;
	this.isJUp = true;
	this.isKUp = true;
	this.isLUp = true;
	this.isMUp = true;
	this.isNUp = true;
	this.isOUp = true;
	this.isPUp = true;
	this.isQUp = true;
	this.isRUp = true;
	this.isSUp = true;
	this.isTUp = true;
	this.isUUp = true;
	this.isVUp = true;
	this.isWUp = true;
	this.isXUp = true;
	this.isYUp = true;
	this.isZUp = true;
	this.isSpaceUp = true;
	this.isEnterUp = true;
}
KeyBoard = new Keys();
//97-122 lowercase
//65-90 uppercase
 document.onkeypress = function (e) { 
	
			var e = window.event || e
			e = e || window.event;
			var keycode;
			if (window.event){
       //this check fails in mozilla/
       //so the variable keycode is undefined
			keycode = event.which ? window.event.which : window.event.keyCode;
   }
   if(!keycode){keycode = e.which}
		if (keycode == 83 || keycode == 115) {
            KeyBoard.isSDown = true;
        }
        if (e.keyCode == 87 || keycode == 119) {
            KeyBoard.isWDown= true;
        }
        if (e.keyCode == 68 || keycode == 100) {
            KeyBoard.isDDown = true;
        }
        if (e.keyCode == 65 || keycode == 97) {
            KeyBoard.isADown = true;
        }

   switch(keycode){
		/* case 65:
			KeyBoard.isADown = true;
			KeyBoard.isAUp = false;
			break;
		case 66:
			KeyBoard.isBDown = true;
			KeyBoard.isBUp = false;
			break;
		case 67:
			KeyBoard.isCDown = true;
			KeyBoard.isCUp = false;
			break;
		case 68:
			KeyBoard.isDDown = true;
			KeyBoard.isDUp = false;
			break;
		case 69:
			KeyBoard.isEDown = true;
			KeyBoard.isEUp = false;
			break;
		case 70:
			KeyBoard.isFDown = true;
			KeyBoard.isFUp = false;
			break;
		case 71:
			KeyBoard.isGDown = true;
			KeyBoard.isGUp = false;
			break;
		case 72:
			KeyBoard.isHDown = true;
			KeyBoard.isHUp = false;
			break;
		case 73:
			KeyBoard.isIDown = true;
			KeyBoard.isIUp = false;
			break;
		case 74:
			KeyBoard.isJDown = true;
			KeyBoard.isJUp = false;
			break;
		case 75:
			KeyBoard.isKDown = true;
			KeyBoard.isKUp = false;
			break;
		case 76:
			KeyBoard.isLDown = true;
			KeyBoard.isLUp = false;
			break;
		case 77:
			KeyBoard.isMDown = true;
			KeyBoard.isMUp = false;
			break;
		case 78:
			KeyBoard.isNDown = true;
			KeyBoard.isNUp = false;
			break;
		case 79:
			KeyBoard.isODown = true;
			KeyBoard.isOUp = false;
			break;
		case 80:
			KeyBoard.isPDown = true;
			KeyBoard.isPUp = false;
			break;
		case 81:
			KeyBoard.isQDown = true;
			KeyBoard.isQUp = false;
			break;
		case 82:
			KeyBoard.isRDown = true;
			KeyBoard.isRUp = false;
			break;
		case 83:
			KeyBoard.isSDown = true;
			KeyBoard.isSUp = false;
			break;
		case 84:
			KeyBoard.isTDown = true;
			KeyBoard.isTUp = false;
			break;
		case 85:
			KeyBoard.isUDown = true;
			KeyBoard.isUUp = false;
			break;
		case 86:
			KeyBoard.isVDown = true;
			KeyBoard.isVUp = false;
			break;
		case 87:
			KeyBoard.isWDown = true;
			KeyBoard.isWUp = false;
			break;
		case 88:
			KeyBoard.isXDown = true;
			KeyBoard.isXUp = false;
			break;
		case 89:
			KeyBoard.isYDown = true;
			KeyBoard.isYUp = false;
			break;
		case 90:
			KeyBoard.isZDown = true;
			KeyBoard.isZUp = false;
			break;
   
		case 97:
			KeyBoard.isADown = true;
			KeyBoard.isAUp = false;
			break;
		case 98:
			KeyBoard.isBDown = true;
			KeyBoard.isBUp = false;
			break;
		case 99:
			KeyBoard.isCDown = true;
			KeyBoard.isCUp = false;
			break;
		case 100:
			KeyBoard.isDDown = true;
			KeyBoard.isDUp = false;
			break;
		case 101:
			KeyBoard.isEDown = true;
			KeyBoard.isEUp = false;
			break;
		case 102:
			KeyBoard.isFDown = true;
			KeyBoard.isFUp = false;
			break;
		case 103:
			KeyBoard.isGDown = true;
			KeyBoard.isGUp = false;
			break;
		case 104:
			KeyBoard.isHDown = true;
			KeyBoard.isHUp = false;
			break;
		case 105:
			KeyBoard.isIDown = true;
			KeyBoard.isIUp = false;
			break;
		case 106:
			KeyBoard.isJDown = true;
			KeyBoard.isJUp = false;
			break;
		case 107:
			KeyBoard.isKDown = true;
			KeyBoard.isKUp = false;
			break;
		case 108:
			KeyBoard.isLDown = true;
			KeyBoard.isLUp = false;
			break;
		case 109:
			KeyBoard.isMDown = true;
			KeyBoard.isMUp = false;
			break;
		case 110:
			KeyBoard.isNDown = true;
			KeyBoard.isNUp = false;
			break;
		case 111:
			KeyBoard.isODown = true;
			KeyBoard.isOUp = false;
			break;
		case 112:
			KeyBoard.isPDown = true;
			KeyBoard.isPUp = false;
			break;
		case 113:
			KeyBoard.isQDown = true;
			KeyBoard.isQUp = false;
			break;
		case 114:
			KeyBoard.isRDown = true;
			KeyBoard.isRUp = false;
			break;
		case 115:
			KeyBoard.isSDown = true;
			KeyBoard.isSUp = false;
			break;
		case 116:
			KeyBoard.isTDown = true;
			KeyBoard.isTUp = false;
			break;
		case 117:
			KeyBoard.isUDown = true;
			KeyBoard.isUUp = false;
			break;
		case 118:
			KeyBoard.isVDown = true;
			KeyBoard.isVUp = false;
			break;
		case 119:
			KeyBoard.isWDown = true;
			KeyBoard.isWUp = false;
			break;
		case 120:
			KeyBoard.isXDown = true;
			KeyBoard.isXUp = false;
			break;
		case 121:
			KeyBoard.isYDown = true;
			KeyBoard.isYUp = false;
			break;
		case 122:
			KeyBoard.isZDown = true;
			KeyBoard.isZUp = false;
			break; */
   }


}
function ResetKeys(){
	document.onkeyup = function (e) {//prevent defaults ?
        var e = window.event || e
			e = e || window.event;
			var keycode;
			if (window.event){
       //this check fails in mozilla/
       //so the variable keycode is undefined
			keycode = event.which ? window.event.which : window.event.keyCode;
   }
   if(!keycode){keycode = e.which}
        if (keycode == 83 || keycode == 115) {
            KeyBoard.isSDown = false;
        }
        if (keycode == 87 || keycode == 119) {
            KeyBoard.isWDown = false;
        }
        if (keycode == 68 || keycode == 100) {
            KeyBoard.isDDown = false;
        }
        if (keycode == 65 || keycode == 97) {
            KeyBoard.isADown = false;
        }
}
}
			
	
function Rectangle(x , y, width, height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}
function Draw(o){ //draw an object with an image and a rectangle
		canvas.drawImage(o.image, o.rectangle.x, o.rectangle.y, o.rectangle.width, o.rectangle.height);
	}
function Draw2(o, rectangle ){ //draw an object with an image and rectangle as args
		canvas.drawImage(o, rectangle.x, rectangle.y);
	}
function Draw3(o, rectangle ){ //draw an object with an image and rectangle as args
		canvas.drawImage(o, rectangle.x, rectangle.y, rectangle.width, rectangle.height);
	}
function Translate(x,y){
	canvas.translate(x, y);
}
function DrawText(text, x, y, color, font){
	canvas.fillStyle = color;
	canvas.font = font;
	canvas.fillText(text, x, y);
}
function Intersects(a, b) { //check for intersection between two rectangles
        if (a.x < (b.x + b.width) && (a.x + a.width) > b.x && a.y < (b.y + b.height) && (a.y + a.height) > b.y){
			return true;
		}
		else return false;
    }
function PlaySound(path ){ //play a sound with an image object as an argument
	var snd = new Audio(path); 
	snd.play();
}
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}
//----------------------------------
//*sample*

/* function GameOneUpdate(){
	
}
function GameOneDraw(){
	DrawText("hello world", 10, 30, "red", "30px arial");
}
game1 = new GameObject(GameOneUpdate, GameOneDraw);
Master = new GameObject(null, null);
Master.Run(game1); */


//----------------------------------































