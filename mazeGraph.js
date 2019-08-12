/**
 * Breath-first search implementation
 * mazeGraph.js
 * Purpose: Implement breadth-first search operations
 * 
 * @author Neil Gorham 
 * @version 1.1 09/17/2014
 *
 * 1.1: Added id parameter to solveMaze fn
 *
 */

//Instantiates a graph of current maze output
//Shows a path from start to end
function solveMaze(id){
	//Graphic maze representation
	var output = document.getElementById(id);
	//img tags
	var imgs = output.getElementsByTagName("img");
	//Maze indices
	var indices = new Array(imgs.length);
	for(var i= 0; i < imgs.length; i++){
		var str = imgs[i].alt;
		indices[i] = parseInt(str);
	}
	var mg = new MazeGraph(indices, Math.sqrt(indices.length));
	mg.BFS(0);
	mg.setPath();
	var path = mg.getPath();
	for(var i = 0; i < path.length; i++){
		for(var j = 0; j < imgs.length; j++){
			if(j == path[i]){
			imgs[j].style.backgroundColor = "#F00";
			j = imgs.length;
			}
		}
	}
	
}

//Maze Graph Constructor
function MazeGraph(maze, newRow){
	//Member variables
	var R = [1, 3, 5, 7, 9, 11, 13, 15];
	var B = [2, 3, 6, 7, 10, 11, 14, 15];
	var L = [4, 5, 6, 7, 12, 13, 14, 15];
	var T = [8, 9, 10, 11, 12, 13, 14, 15];
	var row = newRow;
	var adj = new Array(maze.length); //Adjacency List (multi-dimensional array)
	var vertices = new Array(maze.length); //graph vertices
	var records = new Array(maze.length); //Array of vertex objects
	var bounds = [false, false, false, false]; //check directions around a vertex
	var path = new Array(); //Array of vertices of path from start to end
	//Private methods
	//Initialize adjacency list
	initialize = function(){
		for(var i = 0; i < maze.length; i++){
			adj[i] = new Array();
			vertices[i] = maze[i];
		}
	}
	
	//Populate the adjacency list
	populate = function(){
		for(var i = 0; i < vertices.length; i++){
			bounds[0] = ((i + 1) % row > 0) ? true : false; //Check right
			bounds[1] = ((i + row) < (row * row)) ? true : false; //Check bottom
			bounds[2] = (i % row > 0) ? true : false; //Check left
			bounds[3] = (i - row >= 0) ? true : false; //Check top
			for(var k = 0; k < bounds.length; k++){
				if(bounds[k]){
					var j = pickAdjacent(i, k);
					//evaluate vertices for connecting edges
					if(checkWalls(i, j)) adj[i].push(j);
				}
			}
		}
	}
	
	//Pick adjacent vertex
	pickAdjacent = function(x, y){
		if(Math.pow(2, y) == R[0]) return x + 1;
		else if(Math.pow(2, y) == B[0]) return x + row;
		else if(Math.pow(2, y) == L[0]) return x - 1;
		else if(Math.pow(2, y) == T[0]) return x - row;
		return x;
	}
	
	//check if opposing walls w1 and w2 are open
	checkWalls = function(w1, w2){
		var sr = false;
		var sb = false;
		var sl = false;
		var st = false;
		if(w2 - w1 == 1){ //check right
			for(var i = 0; i < R.length; i++){
				if(vertices[w1] != R[i]){
					sr = true;
				} else {
					sr = false;
					i = R.length; //break loop
				}
			}
			for(var i = 0; i < L.length; i++){
				if(vertices[w2] != L[i]){
					sl = true;
				} else {
					sl = false;
					i = L.length; //break loop
				}
			}
			return (sr && sl);
		}
		if(w2 - w1 == row){ //check bottom
			for(var i = 0; i < B.length; i++){
				if(vertices[w1] != B[i]){
					sb = true;
				} else {
					sb = false;
					i = B.length; //break loop
				}
			}
			for(var i = 0; i < T.length; i++){
				if(vertices[w2] != T[i]){
					st = true;
				} else {
					st = false;
					i = T.length; //break loop
				}
			}
			return (sb && st);
		}
		if(w1 - w2 == 1){ //check left
			for(var i = 0; i < L.length; i++){
				if(vertices[w1] != L[i]){
					sl = true;
				} else {
					sl = false;
					i = L.length; //break loop
				}
			}
			for(var i = 0; i < R.length; i++){
				if(vertices[w2] != R[i]){
					sr = true;
				} else {
					sr = false;
					i = R.length; //break loop
				}
			}
			return (sl && sr);
		}
		if(w1 - w2 == row){ //check top
			for(var i = 0; i < T.length; i++){
				if(vertices[w1] != T[i]){
					st = true;
				} else {
					st = false;
					i = T.length; //break loop
				}
			}
			for(var i = 0; i < B.length; i++){
				if(vertices[w2] != B[i]){
					sb = true;
				} else {
					sb = false;
					i = B.length; //break loop
				}
			}
			return (st && sb);
		}
		//otherwise
		return false;
	}
	initialize();
	populate();
	return {
		//Public methods
		//Print contents of the adjacency list
		print: function(){
			for(var i = 0; i < adj.length; i++){
				for(var j = 0; j < adj[i].length; j++){
					console.log("adj " + i + ": " + adj[i][j]);
				}
			}
		},
		
		//Print contents of records, Vertex information
		printRec: function(){
			for(var i = 0; i < records.length; i++){
				console.log("\nrec: " + i + "\ncolor: " + records[i].getColor() 
					+ "\ndistance: " + records[i].getDistance() 
					+ "\nparent: " + records[i].getParent());
			}
		},
		
		//Print path from s to v
		printPath: function myself(s, v){
			if(v == s){
				console.log("(" + s + ", " + v + ")");
			} else if(records[v].getParent() == null){
				console.log("no path from " + s + "to " + v + "exists");
			} else {
				myself(s, records[v].getParent());
				console.log("(" + records[v].getParent() + ", " + v + ")");
			}
		},
		
		//breadth-first search	
		BFS: function(s){
			for(var i = 0; i < vertices.length; i++){ records[i] = new Vertex(); } //Initialize vertices of the graph
			records[s].setColor("g"); //set color to gray
			records[s].setDistance(0); //set distance to 0
			records[s].setParent(null);//set parent to null
			var pq = new Queue(); //instantiate priority queue
			pq.enqueue(s); //add s to pq
			while(!pq.isEmpty()){
				var u = pq.dequeue(); //get first vertex
				for(var v = 0; v < adj[u].length; v++){
					if(records[adj[u][v]].getColor() == "w"){
						records[adj[u][v]].setColor("g"); //set color to gray
						records[adj[u][v]].setDistance(records[u].getDistance() + 1); //set distance to u.distance + 1
						records[adj[u][v]].setParent(u); //set parent to u
						pq.enqueue(adj[u][v]); //add vertex to pq
					}
				}
				records[u].setColor("b"); //set color to black
			}
		},
		
		//Set the indices of the path from start to end into path array
		setPath: function(){
			var i = records.length - 1;
			path.push(i);
			i = records[i].getParent();
			while(i != null){
				path.unshift(i);
				i = records[i].getParent();
			}
		},
		
		//Get the path array
		getPath: function(){ return path; }
	};
}