// Definice promennych
var
COLS = 26,
ROWS = 26,
EMPTY = 0,
SNAKE = 1,
FRUIT = 2,
LEFT  = 0,
UP    = 1,
RIGHT = 2,
DOWN  = 3,
KEY_LEFT  = 37,
KEY_UP    = 38,
KEY_RIGHT = 39,
KEY_DOWN  = 40,
canvas,	  
ctx,	  
keystate, 
frames,   
score;	  

//Objekt grid
grid = {
 
	width: null,  
	height: null, 
	_grid: null,  //how does it work?
 
	
	init: function(d, c, r) {
		this.width = c;
		this.height = r;
 
		this._grid = [];
		for (var x=0; x < c; x++) {
		this._grid.push([]);
		for (var y=0; y < r; y++) {
		this._grid[x].push(d); //why d?
		}
		}
	},
 
	
	set: function(val, x, y) {
		this._grid[x][y] = val;
	},
 
	
	get: function(x, y) {
		return this._grid[x][y];
	}
}
 
//objekt had
snake = {
 
	direction: null, 
	last: null,	 
	_queue: null,	
 
	
	init: function(d, x, y) {
		this.direction = d;
 
		this._queue = [];
		this.insert(x, y);
	},
 
	//Funkce vloží první část(hlavu) hada. 
	insert: function(x, y) {
		
		this._queue.unshift({x:x, y:y});
		this.last = this._queue[0];
	},
 
	//Funkce ostraní poslední část hada(ocas).
	remove: function() {
		
		return this._queue.pop();
	}
};
 
//Funkce pro umístění ovoce na náhodném místě v herním poli.
function setFood() {
	var empty = [];
	
	for (var x=0; x < grid.width; x++) {
		for (var y=0; y < grid.height; y++) {
		if (grid.get(x, y) === EMPTY) {
		empty.push({x:x, y:y});
		}
		}
	}
	
	var randpos = empty[Math.round(Math.random()*(empty.length - 1))]; //why like this?
	grid.set(FRUIT, randpos.x, randpos.y);
}
 
//Funkce main slouží ke spuštění hry. Vytvoří canvas, které slouží jako herní pole.

function main() {
	
	canvas = document.createElement("canvas");
	canvas.width = COLS*20;
	canvas.height = ROWS*20;
	ctx = canvas.getContext("2d");
	
	document.body.appendChild(canvas);
 
	//font skore
	ctx.font = "12px Helvetica";
 
	frames = 0;
	keystate = {};
//Týká se to, zda je tlačítko stisknuté nebo ne, ale nevím, jak to správně okomentovat	
	document.addEventListener("keydown", function(evt) {
		keystate[evt.keyCode] = true;
	});
	document.addEventListener("keyup", function(evt) {
		delete keystate[evt.keyCode];
	});
 
//Následně se spouští funkce init a loop.	
	init();
	loop();
}
 
//Funkce init() inicializuje hru. Nastaví skóre na nulu. Vytvoří řádky, sloupce a prázdná políčka v gridu.
function init() {
	score = 0;
 
	grid.init(EMPTY, COLS, ROWS);
 //Had "vylézá" na poslední řádek a prostední sloupek gridu a s to směrem nahoru. Do gridu se ukládá pozice hada.
	var sp = {x:Math.floor(COLS/2), y:ROWS-1};
	snake.init(UP, sp.x, sp.y);
	grid.set(SNAKE, sp.x, sp.y);
//Následně se spouští náhodné umístění ovoce do herního pole(gridu). 
	setFood();
}
 
//Jak to popsat?? t
function loop() {
	update();
	draw();
	//??
	window.requestAnimationFrame(loop, canvas);
}
 
//Funkce update slouží k ovládání hada v herním poli. 
function update() {
	frames++; //??
 
//Podmínky pro pohyb hada po herním poli.	
	if (keystate[KEY_LEFT] && snake.direction !== RIGHT) {
	snake.direction = LEFT;
	}
	if (keystate[KEY_UP] && snake.direction !== DOWN) {
	snake.direction = UP;
	}
	if (keystate[KEY_RIGHT] && snake.direction !== LEFT) {
	snake.direction = RIGHT;
	}
	if (keystate[KEY_DOWN] && snake.direction !== UP) {
	snake.direction = DOWN;
	}
 
//??	
	if (frames%7 === 0) {

//Proměné pro "hlavu hada"		
	var nx = snake.last.x;
	var ny = snake.last.y;
 
//not sure how it works, ale je to něco s tím směrem 		
	switch (snake.direction) {
		case LEFT:
			nx--;
			break;
		case UP:
			ny--;
			break;
		case RIGHT:
			nx++;
			break;
		case DOWN:
			ny++;
			break;
	}
 
//Pokud hlava hada narazí do stěny nebo do svého "těla", hra se znovu spustí.		
	if (0 > nx || nx > grid.width-1  ||
	0 > ny || ny > grid.height-1 ||
	grid.get(nx, ny) === SNAKE
	) {
	return init();
	}
 //Pokud se "hlava" hada nachází na políčku ovoce, přidá se bod do skore a umístí se nové ovoce do herního pole. 
	if (grid.get(nx, ny) === FRUIT) {
		
	score++;
	setFood();
	} else {
//Odstraní se ocas (konec) hada a nastaví se na EMPTY(prázdné).		
	var tail = snake.remove();
	grid.set(EMPTY, tail.x, tail.y);
	}
 //Prázdné pole se nastaví jako had. Toto pole znázorňuje hlavu (začátek) hada.
	grid.set(SNAKE, nx, ny);
	snake.insert(nx, ny);
	}
}
 
//Funkce slouží k vykreslování a vybarvování vnitřku gridu - to co uživatel vidí.
function draw() {
	
	var tw = canvas.width/grid.width;
	var th = canvas.height/grid.height;
//Cyklus prochází grid a na základě hodnoty(EMPTY, SNAKE, FRUIT) se vybarví políčko příslušnou barvou.
	for (var x=0; x < grid.width; x++) {
		for (var y=0; y < grid.height; y++) {
		
			switch (grid.get(x, y)) {
				case EMPTY:
					ctx.fillStyle = "#fff"; //bílá
					break;
				case SNAKE:
					ctx.fillStyle = "#1C7D49"; //zelená
					break;
				case FRUIT:
					ctx.fillStyle = "#ED0000"; //červená
					break;
			}
			//Umístění textu pro skore 
			ctx.fillRect(x*tw, y*th, tw, th);
		}
	}
	//Text a barva pro skóre.
	ctx.fillStyle = "#000";
	ctx.fillText("SCORE: " + score, 10, canvas.height-10);
}
 
//Spouští se funkce main.
main();