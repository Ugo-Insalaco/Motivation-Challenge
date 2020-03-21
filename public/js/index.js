var width 
var height 
var home
var clicking
var mouse
var cnv
var game
var pressing
var g 
var fr
var yt
var T
var score


function setup(){
	width = 683
    height = 288 
    cnv = createCanvas(width, height)
    cnv.parent("Jeu")
    cnv.textSize(32)
    fill(255)
 	//centerCanvas()
 	fr = 24
 	frameRate(fr)
 	home = true
 	pressing = false
 	main = new MainScreen()
 	game = new MainGame()
 	mouse = new createVector(0,0)
 	imgccl = createImg('images/Logo_ccl.jpg')
 	imgccl.hide()
 	imgcoro = createImg('images/corona.webp')
 	imgcoro.hide()
 	yt = height/1.5
 	T = 1/2
 	g = 2*yt/(T*T)
 	score = 0
}

function draw(){
	background('#ADC9FA')
	//centerCanvas()
	if(clicking) {
    mouse.x = mouseX
    mouse.y = mouseY
    }
    else {
    mouse.x = -10;
    mouse.y = -10;
    }
	if(home){
		main.show()
		if(inter(mouse.x, mouse.y, main.play.x, main.play.y, main.play.w, main.play.h)) main.play.pressed = true
	}
	else{
		game.update()
		game.draw()
		fill(0,50,160)
		cnv.text('score : '+score,0,40)

	}
}
function MainGame(){
	this.player = new Player()
	this.enemies = []
	this.enemies.push(new Enemy(5))
	this.counter = 0
	this.diff = 0
	this.respawn = 1

	this.draw = function(){
		this.player.draw()
		for (var i = this.enemies.length - 1; i >= 0; i--) {
	        this.enemies[i].draw()
		}
	}

	this.update = function(){
		this.player.update()
		this.counter++
		console.log(this.diff)
		if(score>1000*(this.diff+1)){
			this.diff+=1
			this.respawn-=.05
			yt = height/1.5
 			T -= 0.020
 			g = 2*yt/(T*T)
			if(this.respawn <= 0){
				setup()
	        	fill(0,50,160)
	        	main.text = 'tu es si fort, bravo tu as sauvé le challenge'
	        	main.play.setText('Rejouer')
			}
		}
		if(this.counter >= fr*this.respawn){
			this.counter = 0
			this.updown = random()
			if(this.updown > 0.7){
				this.level = random([8,9,10,11])
				enemy = new Enemy(this.level)
				enemy.vx += this.diff*20
				this.enemies.push(enemy)
			}
			else if(this.updown >0.2){
				this.level = random([0,1,2,3,4,5,6,7])
				this.fill = random()
				if(this.fill > 0.25 && this.level > 0){
					for (var i = this.level; i>= 0; i--){
						enemy = new Enemy(i)
						enemy.vx += this.diff*20
						console.log(enemy.vx)
						this.enemies.push(enemy)

					}
				}
			}
		}
		for (var i = this.enemies.length - 1; i >= 0; i--) {
	        this.enemies[i].update()
	        if(collideRectRect(this.player.x, this.player.y-this.player.h, this.player.w, this.player.h,
	        	this.enemies[i].x, this.enemies[i].y-this.enemies[i].h, this.enemies[i].w, this.enemies[i].h)){
	        	this.s = score
	        	setup()
	        	fill(0,50,160)
	        	main.text = 'Oh non t\'es mort ! mais ton score est : '+this.s
	        	main.play.setText('Rejouer')
	        }
	        if(this.enemies[i].x + this.enemies[i].w < 0){
  	        	 this.enemies.splice(i, 1)	 
  	        	 score += 100
	        }
		}
	}
}

function Enemy(y){
	this.w = height/10
	this.h = height/10
	this.x = width
	this.y = height - y*10
	this.vx = 200

	this.draw = function(){
		image(imgcoro, this.x,this.y-this.h,this.h,this.w)
	}
	this.update = function(){
		this.x -= this.vx*1/fr
	}
}

function Player(){
	this.w = height/7
	this.h = height/3.5
	this.x = width/7+this.w/2
	this.y = height
	this.vy = 0
	this.crouching = false
	this.jumping = false
	this.timeCrouch = 0

	this.draw = function(){
		image(imgccl, this.x,this.y-this.h,this.w,this.h)
	}

	this.update = function(){
		if(!this.jumping && pressing && keyCode == 32){
			this.jumping = true
			this.vy = 2*yt/T
		}
		if(this.jumping){
			this.vy = this.vy - g*1/fr
			this.y = this.y - this.vy*1/fr
			if(this.y > height){
				this.y = height
				this.jumping = false
			}
		}
		if(pressing && keyCode == 17 && !this.crouching){
			this.h = height/7
			this.crouching = true
			this.timeCrouch = 0
		}
		else if(this.crouching && pressing && keyCode == 17){
			if(this.timeCrouch < fr*1.5){
				this.timeCrouch++
			}
			else{
				this.crouching = false
				keyCode = 0
				this.h = height/3.5
			}
		}
		else{
			this.h = height/3.5
			this.crouching = false
		}
	}
}
function MainScreen(){
	this.text = 'Oh non le Corona tente d\'annuler le Challenge, Vite évite le !!!'
	this.play = new Button(width/3,height/3,width/3,height/3)
	this.show = function(){
		this.play.show()
		if(inter(mouse.x, mouse.y, this.play.x, this.play.y, this.play.w, this.play.h)) this.play.pressed = true
		if(this.play.pressed) home = false
		this.play.setText('jouer')
		cnv.textSize(20)
		this.tw = textWidth(this.text)
		fill(0,50,160)
		cnv.text(this.text,0+(width-this.tw)/2, 0 +height-50)
	}
}

function Button(x, y, w, h) {
  this.x = x
  this.y = y
  this.pressed = false
  this.w = w
  this.h = h
  this.show = function() {
    noStroke()
    if(this.pressed) fill(100, 100)
    else fill(255,131,0)
    rect(this.x, this.y , this.w, this.h)
  }

  this.setText = function(text){
  	this.tw = textWidth(text)
  	this.th = textDescent()
  	fill(0,50,160)
  	if((this.w-this.tw)/2 > 0 && (this.h-this.th)/2>0){
  		cnv.text(text, this.x+(this.w-this.tw)/2, this.y+this.h/2)
  	}
  	else{
  		cnv.text(text, this.x, this.y)
  	}
  }
}

function mousePressed() {
  clicking = true
}

function mouseReleased() {
  main.play.pressed = false
  clicking = false
}

function centerCanvas() {
  var x = (windowWidth - width) / 2
  cnv.position(x, cnv.position().y)
}

function inter(x, y, u, v, w, h) {

  if(x > u && x < u + w && y > v && y < v + h)
    return true
  else return false
}

function keyPressed(){
	if(keyCode == 32 || keyCode == 17) pressing = true
}

function keyReleased(){
	pressing = false
}

collideRectRect = function (x, y, w, h, x2, y2, w2, h2) {
  //2d
  //add in a thing to detect rectMode CENTER
  if (x + w >= x2 &&    // r1 right edge past r2 left
      x <= x2 + w2 &&    // r1 left edge past r2 right
      y + h >= y2 &&    // r1 top edge past r2 bottom
      y <= y2 + h2) {    // r1 bottom edge past r2 top
        return true;
  }
  return false;
};