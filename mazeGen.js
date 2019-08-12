/**
 * Hexidecimal Maze Generator: implements disjoint-set forests using Union-Find structure
 * mazeGen.js
 * Purpose: Implement Union-Find operations
 * 
 * @author Neil Gorham 
 * @version 1.0.1 09/17/2014
 *
 * 1.0.1: Added id parameter to outputGrid fn, Bootstrap compatible
 *
 */
 
function output(){
	var n = parseInt(document.getElementById("mazeSize").value);
	var maze = new MazeGen(n);
	document.getElementById("output").innerHTML = maze.displayGrid();
	
}

function outputGrid(n, id){
var m = new MazeGen(n);
document.getElementById(id).innerHTML = m.displayGrid();
}

//Maze Generator Class Constructor
function MazeGen(n){
	//Initialize member variables
	this.RIGHT = 1;
	this.BOTTOM = 2;
	this.LEFT = 4;
	this.TOP = 8;
	this.START = 11;
	this.END = 14;
	this.INIT = 15;
	//Initialize maze variables
	this.size = n * n;
	this.row = n;
	this.maze = new Array(this.size);
	this.indices = new Array(this.size);
	this.uf = new UnionFind(this.size);
	this.maze[this.size - this.size] = this.START;
	this.maze[this.size - 1] = this.END;
	for(var i = 1; i < this.size - 1; i++){
		this.maze[i] = this.INIT;
	}
	for(var i = 0; i < this.size; i++){
		this.uf.makeSet(i);
		this.indices[i] = i;
	}
	for(var i = 0; i < this.size; i++){
		var rand = Math.floor(Math.random() * this.size);
		this.indices.swap(i, rand);
	}
	this.genMaze();
}

//Generator single path random maze
MazeGen.prototype.genMaze = function(){
	var set1 = 0;
	var set2 = 0;
	while(this.uf.getNumSets() != 1){
		var rand = Math.floor(Math.random() * this.size);
		set1 = this.indices[rand];
		set2 = this.pickAdjacent(set1, this.setRandWall(set1));
		if(!this.uf.sameSet(set1, set2)){
			this.uf.union(set1, set2);
			this.breakWalls(set1, set2);
		}
	}
}

//Print maze contents
MazeGen.prototype.print = function(){
	var text = "";
	for(var i = 0; i < this.size; i++){
		if((i + 1) % this.row == 0) text += this.intToChar(this.maze[i]) + "<br >";
		else text += this.intToChar(this.maze[i]);
	}
	return text;
}

//Print maze contents as graphic directories
MazeGen.prototype.displayGrid = function(){
	var text ="";
	for(var i = 0; i < this.maze.length; i++){
		if((i + 1) % this.row == 0){
			text += "<img src=\"images/grid" + this.maze[i] + ".svg\" alt=\"" + this.maze[i] + "\" class=\"img-responsive inline-block\" ><br >";
			//document.write("<img src=\"images/grid" + this.maze[i] + ".svg\" class=\"scale-with-grid\" ><br >\n" );
		} else {
			text += "<img src=\"images/grid" + this.maze[i] + ".svg\" alt=\"" + this.maze[i] + "\" class=\"img-responsive inline-block\" >";
			//document.write("<img src=\"images/grid" + this.maze[i] + ".svg\" class=\"scale-with-grid\" >\n" );
		}
	}
	return text;
}

//Convert int to ascii for print
MazeGen.prototype.intToChar = function(x){
	var alpha = 87;
	var digit = 48;
	if(((x == 10 || x == 11) ||(x == 12 || x == 13))
		|| (x == 14 || x == 15)){
		return String.fromCharCode(x + alpha);
	}
	return String.fromCharCode(x + digit);
}

//Swap values i and j in array a
Array.prototype.swap = function(i, j){
	var temp = this[i];
	this[i] = this[j];
	this[j] = temp;
}

//Check right wall return true if breakable
MazeGen.prototype.checkRight = function(x){ 
	return ((x + 1) % this.row > 0); 
}

//Check bottom wall return true if breakable
MazeGen.prototype.checkBottom = function(x){ 
	return ((x + this.row) < (this.row * this.row)); 
}

//Check left wall return true if breakable
MazeGen.prototype.checkLeft = function(x){
	return (x % this.row > 0);
}

//Check top wall return true if breakable
MazeGen.prototype.checkTop = function(x){
	return (x - this.row >= 0);
}

//Randomly pick an available wall from set1
MazeGen.prototype.setRandWall = function(set1){
	var wCount = 0;
	var w = 0;
	//Walls in set1
    var sr = false;
	var sb = false;
	var sl = false; 
	var st = false;
    if(this.checkRight(set1)){
        wCount++;
        sr = true;
    }
    if(this.checkBottom(set1)){
        wCount++;
        sb = true;
    }
    if(this.checkLeft(set1)){
        wCount++;
        sl = true;
    }
    if(this.checkTop(set1)){
        wCount++;
        st = true;
    }
    //evaluate available walls
    if((sr && sb) && (sl && st)) //4 walls - r,b,l,t
        w = Math.floor(Math.random() * wCount); //0 - 3
    if((!sr && sb) && (sl && st)) //3 walls - b,l,t
        w = Math.floor((Math.random() * wCount) + 1); //1 - 3
    if((sr && !sb) && (sl && st)){ //3 walls - r,l,t
        w = Math.floor((Math.random() * wCount) + 1); //0 2 3
        if(w == 1) w--;
    }
    if((sr && sb) && (!sl && st)){ //3 walls - r,b,t
        w = Math.floor(Math.random() * wCount); //0 1 3
        if(w == 2) w++;
    }
    if((sr && sb) && (sl && !st)) //3 walls - r,b,l
        w = Math.floor(Math.random() * wCount); //0 - 2
    if(!(sr || sb) && (sl && st)) //2 walls - l,t
        w = Math.floor((Math.random() * wCount) + 2);
    if(!(sb || sl) && (sr && st)) //2 walls - r,t
        w = Math.floor(Math.random() * wCount) * 3;
    if(!(sl || st) && (sr && sb)) //2 walls - r,b
        w = Math.floor(Math.random() * wCount);
    if(!(sr || st) && (sb && sl)) //2 walls - b,l
        w = Math.floor((Math.random() * wCount) + 1);
    if(!((sb || sl) || st) && sr) //1 wall - r
        w = 0;
    if(!((sr || sl) || st) && sb) //1 wall - b
        w = 1;
    if(!((sr || sb) || st) && sl) //1 wall - l
        w = 2;
    if(!((sr || sb) || sl) && st) //1 wall - t
        w = 3;
    return w;
}

//Return adjacent set to set1
MazeGen.prototype.pickAdjacent = function(set1, w){
    if(Math.pow(2, w) == this.RIGHT) return set1 + 1;
    else if(Math.pow(2, w) == this.BOTTOM) return set1 + this.row;
    else if(Math.pow(2, w) == this.LEFT) return set1 - 1;
    else if(Math.pow(2, w) == this.TOP) return set1 - this.row;
    return set1;
}

//Break walls of set1 and set2
MazeGen.prototype.breakWalls = function(set1, set2){
    if(set2 - set1 == 1){ //break x.right y.left
        this.maze[set1] -= this.RIGHT;
        this.maze[set2] -= this.LEFT;
    } else if(set2 - set1 == this.row){ //break x.bottom y.top
        this.maze[set1] -= this.BOTTOM;
        this.maze[set2] -= this.TOP;
    } else if(set1 - set2 == 1){ //break x.left y.right
        this.maze[set1] -= this.LEFT;
        this.maze[set2] -= this.RIGHT;
    } else if(set1 - set2 == this.row){ //break x.top y.bottom
        this.maze[set1] -= this.TOP;
        this.maze[set2] -= this.BOTTOM;
    }
    if(this.maze[set1] < 0) this.maze[set1] = 0; //negation check
    if(this.maze[set2] < 0) this.maze[set2] = 0; //negation check
}